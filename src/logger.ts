export class Logger<T extends Logger<any>>
{
  private _loggerQueue:Function[] = [];

  public assert(test:boolean, message:string, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      console.assert(test, message, optionalParams);
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
      console.debug(message, optionalParams);
    });
    return <any> this;
  }

  public dir(value:any, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      console.dir(value, optionalParams);
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
      console.error(message, optionalParams);
    });
    return <any> this;
  }

  public info(message:any, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      console.info(message, optionalParams);
    });
    return <any> this;
  }

  public log(message:any, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      console.log(message, optionalParams);
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
      console.trace(message, optionalParams);
    });
    return <any> this;
  }

  public warn(message:any, ...optionalParams:any[]):T
  {
    this.addToQueue(():void =>
    {
      console.warn(message, optionalParams);
    });
    return <any> this;
  }

  protected addToQueue(func:Function):void
  {
    this._loggerQueue.push(func);
    this.triggerQueue();
  }

  private triggerQueue():void
  {
    this._loggerQueue.forEach((func:Function) =>
    {
      func();
    });
  }
}