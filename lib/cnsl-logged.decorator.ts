import {Cnsl, cnsl} from './cnsl.class';

export function cnslLogged(cnfg:CnslLoggedDecoratorConfig = {})
{
  return function (target:Object, propertyKey:string, descriptor:TypedPropertyDescriptor<any>)
  {
    cnfg.groupIdent = cnfg.groupIdent || undefined;
    cnfg.parentGroupIdent = cnfg.parentGroupIdent || undefined;

    let originalMethod = descriptor.value; // save a reference to the original method

    // NOTE: Do not use arrow syntax here. Use a function expression in
    // order to use the correct value of `this` in this method (see notes below)
    descriptor.value = function (...args:any[])
    {
      let _cnsl:Cnsl = (cnfg.parentGroupIdent) ? cnsl.group(cnfg.parentGroupIdent) : cnsl;

      if (cnfg.groupIdent)
      {
        _cnsl.groupCollapsed(cnfg.groupIdent, `Call: ${(target.constructor as any).name}.${propertyKey}(${JSON.stringify(args)})`);
      }
      let result = originalMethod.apply(this, args);
      if (cnfg.groupIdent)
      {
        _cnsl.group(cnfg.groupIdent).log(` => ${JSON.stringify(result)}`);
        _cnsl.group(cnfg.groupIdent).groupEnd();
      }
      else
      {
        _cnsl.log(`Call: ${(target.constructor as any).name}.${propertyKey}(${JSON.stringify(args)}) => ${JSON.stringify(result)}`);
      }

      return result;
    };

    return descriptor;
  }
}

export interface CnslLoggedDecoratorConfig
{
  parentGroupIdent?:string;
  groupIdent?:string;
}
