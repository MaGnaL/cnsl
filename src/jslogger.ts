import {JSLoggerGrouped} from './jslogger-grouped';

export class JSLogger<T extends JSLogger<any>>
{
  private _loggerQueue:Function[] = [];

  public grouped(groupName:string, collapsed:boolean = true):JSLoggerGrouped
  {
    return new JSLoggerGrouped(groupName, collapsed);
  }

  public assert(test:boolean, message:string, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      if (optionalParams.length > 0)
      {
        console.assert(test, message, optionalParams);
      }
      else
      {
        console.assert(test, message);
      }
    });
    return <any> this;
  }

  public clear():T
  {
    this.addToQueue(():void =>
    {
      console.clear();
    });
    return <any> this;
  }

  public count(countTitle:string):T
  {
    this.addToQueue(():void =>
    {
      console.count(countTitle);
    });
    return <any> this;
  }

  public debug(message:string, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      if (optionalParams.length > 0)
      {
        console.debug(message, optionalParams);
      }
      else
      {
        console.debug(message);
      }
    });
    return <any> this;
  }

  public dir(value:any, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      if (optionalParams.length > 0)
      {
        console.dir(value, optionalParams);
      }
      else
      {
        console.dir(value);
      }
    });
    return <any> this;
  }

  public dirxml(value:any):T
  {
    this.addToQueue(():void =>
    {
      console.dirxml(value);
    });
    return <any> this;
  }

  public error(message:any, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      if (optionalParams.length > 0)
      {
        console.error(message, optionalParams);
      }
      else
      {
        console.error(message);
      }
    });
    return <any> this;
  }

  public info(message:any, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      if (optionalParams.length > 0)
      {
        console.info(message, optionalParams);
      }
      else
      {
        console.info(message);
      }
    });
    return <any> this;
  }

  public log(message:any, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      if (optionalParams.length > 0)
      {
        console.log(message, optionalParams);
      }
      else
      {
        console.log(message);
      }
    });
    return <any> this;
  }

  public msIsIndependentlyComposed(element:Element):T
  {
    this.addToQueue(():boolean =>
    {
      return console.msIsIndependentlyComposed(element);
    });
    return <any> this;
  }

  public profile(reportName:string):T
  {
    this.addToQueue(():void =>
    {
      console.profile(reportName);
    });
    return <any> this;
  }

  public profileEnd():T
  {
    this.addToQueue(():void =>
    {
      console.profileEnd();
    });
    return <any> this;
  }

  public select(element:Element):T
  {
    this.addToQueue(():void =>
    {
      console.select(element);
    });
    return <any> this;
  }

  public time(timerName:string):T
  {
    this.addToQueue(():void =>
    {
      console.time(timerName);
    });
    return <any> this;
  }

  public timeEnd(timerName:string):T
  {
    this.addToQueue(():void =>
    {
      console.timeEnd(timerName);
    });
    return <any> this;
  }

  public trace(message:any, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      if (optionalParams.length > 0)
      {
        console.trace(message, optionalParams);
      }
      else
      {
        console.trace(message);
      }
    });
    return <any> this;
  }

  public warn(message:any, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      if (optionalParams.length > 0)
      {
        console.warn(message, optionalParams);
      }
      else
      {
        console.warn(message);
      }
    });
    return <any> this;
  }

  protected addToQueue(func:Function):void
  {
    func();
    /*this._loggerQueue.push(func);
     this.triggerQueue();*/
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