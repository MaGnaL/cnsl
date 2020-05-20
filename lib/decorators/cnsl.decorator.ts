import {CnslClass} from '../classes';

export function cnslDeco(): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    const scope = target.constructor.name;
    Object.defineProperty(target, propertyKey, {value: new CnslClass(scope)});
  };
}
