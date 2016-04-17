import {Cnsl} from './cnsl.interface';

export class CnslClass implements Cnsl
{
  private _loggerQueue:Function[] = [];

  private _groups:Object = {};

  private _parentAddToQueue:Function;

  constructor(groupTitle:string = undefined, collapsed:boolean = undefined, parentAddToQueue:Function = undefined)
  {
    this._parentAddToQueue = parentAddToQueue;

    if (groupTitle !== undefined)
    {
      this.addToQueue(():void =>
      {
        if (collapsed)
        {
          console.groupCollapsed.apply(console, [].concat(groupTitle));
        }
        else
        {
          console.group.apply(console, [].concat(groupTitle));
        }
      });
    }
  }

  public group(groupTitle:string):Cnsl
  {
    return this.createGroup(groupTitle, false);
  }

  public groupCollapsed(groupTitle:string):Cnsl
  {
    return this.createGroup(groupTitle, true);
  }

  private createGroup(groupTitle:string, collapsed:boolean):Cnsl
  {
    let returnedGroup:Cnsl;

    if (groupTitle in this._groups)
    {
      returnedGroup = this._groups[groupTitle];
    }
    else
    {
      returnedGroup = new CnslClass(groupTitle, collapsed, (func:Function) =>
      {
        this.addToQueue(func);
      });
      this._groups[groupTitle] = returnedGroup;
    }

    return returnedGroup;
  }

  public groupEnd():void
  {
    this.addToQueue(():void =>
    {
      console.groupEnd.apply(console);
    });

    if (this._parentAddToQueue !== undefined)
    {
      this._parentAddToQueue(() =>
      {
        this._loggerQueue.forEach((func:Function) => func());
      });
    }
  }

  public assert(test:boolean, message:string, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.assert.apply(console, [].concat(test, message, optionalParams));
    });
  }

  public clear():void
  {
    this.addToQueue(():void =>
    {
      console.clear.apply(console);
    });
  }

  public count(countTitle:string):void
  {
    this.addToQueue(():void =>
    {
      console.count.apply(console, [].concat(countTitle));
    });
  }

  public debug(message:string, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.debug.apply(console, [].concat(message, optionalParams));
    });
  }

  public dir(value:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.dir.apply(console, [].concat(value, optionalParams));
    });
  }

  public dirxml(value:any):void
  {
    this.addToQueue(():void =>
    {
      console.dirxml.apply(console, [].concat(value));
    });
  }

  public error(message:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.error.apply(console, [].concat(message, optionalParams));
    });
  }

  public info(message:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.info.apply(console, [].concat(message, optionalParams));
    });
  }

  public log(message:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.log.apply(console, [].concat(message, optionalParams));
    });
  }

  public msIsIndependentlyComposed(element:Element):void
  {
    this.addToQueue(():boolean =>
    {
      return console.msIsIndependentlyComposed.apply(console, [].concat(element));
    });
  }

  public profile(reportName:string):void
  {
    this.addToQueue(():void =>
    {
      console.profile.apply(console, [].concat(reportName));
    });
  }

  public profileEnd():void
  {
    this.addToQueue(():void =>
    {
      console.profileEnd.apply(console);
    });
  }

  public select(element:Element):void
  {
    this.addToQueue(():void =>
    {
      console.select.apply(console, [].concat(element));
    });
  }

  public time(timerName:string):void
  {
    this.addToQueue(():void =>
    {
      console.time.apply(console, [].concat(timerName));
    });
  }

  public timeEnd(timerName:string):void
  {
    this.addToQueue(():void =>
    {
      console.timeEnd.apply(console, [].concat(timerName));
    });
  }

  public trace(message:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.trace.apply(console, [].concat(message, optionalParams));
    });
  }

  public warn(message:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.warn.apply(console, [].concat(message, optionalParams));
    });
  }

  protected addToQueue(func:Function):void
  {
    this._loggerQueue.push(func);

    if (this._parentAddToQueue === undefined)
    {
      this.triggerQueue();
    }
  }

  private triggerQueue():void
  {
    this._loggerQueue.forEach((func:Function) =>
    {
      func();
    });
    this._loggerQueue = [];
  }
}