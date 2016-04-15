export class cnsl
{
  private static _loggerQueue:Function[] = [];

  /*public static grouped(groupName:string, collapsed:boolean = true):cnslgrp
   {
   return new cnslgrp(groupName, collapsed, this.addToQueue);
   }*/

  public static assert(test:boolean, message:string, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.assert.apply(console, [].concat(test, message, optionalParams));
    });
    return <any> this;
  }

  public static clear():void
  {
    this.addToQueue(():void =>
    {
      console.clear.apply(console);
    });
    return <any> this;
  }

  public static count(countTitle:string):void
  {
    this.addToQueue(():void =>
    {
      console.count.apply(console, [].concat(countTitle));
    });
    return <any> this;
  }

  public static debug(message:string, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.debug.apply(console, [].concat(message, optionalParams));
    });
    return <any> this;
  }

  public static dir(value:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.dir.apply(console, [].concat(value, optionalParams));
    });
    return <any> this;
  }

  public static dirxml(value:any):void
  {
    this.addToQueue(():void =>
    {
      console.dirxml.apply(console, [].concat(value));
    });
    return <any> this;
  }

  public static error(message:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.error.apply(console, [].concat(message, optionalParams));
    });
    return <any> this;
  }

  public static info(message:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.info.apply(console, [].concat(message, optionalParams));
    });
    return <any> this;
  }

  public static log(message:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.log.apply(console, [].concat(message, optionalParams));
    });
    return <any> this;
  }

  public static msIsIndependentlyComposed(element:Element):void
  {
    this.addToQueue(():boolean =>
    {
      return console.msIsIndependentlyComposed.apply(console, [].concat(element));
    });
    return <any> this;
  }

  public static profile(reportName:string):void
  {
    this.addToQueue(():void =>
    {
      console.profile.apply(console, [].concat(reportName));
    });
    return <any> this;
  }

  public static profileEnd():void
  {
    this.addToQueue(():void =>
    {
      console.profileEnd.apply(console);
    });
    return <any> this;
  }

  public static select(element:Element):void
  {
    this.addToQueue(():void =>
    {
      console.select.apply(console, [].concat(element));
    });
    return <any> this;
  }

  public static time(timerName:string):void
  {
    this.addToQueue(():void =>
    {
      console.time.apply(console, [].concat(timerName));
    });
    return <any> this;
  }

  public static timeEnd(timerName:string):void
  {
    this.addToQueue(():void =>
    {
      console.timeEnd.apply(console, [].concat(timerName));
    });
    return <any> this;
  }

  public static trace(message:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.trace.apply(console, [].concat(message, optionalParams));
    });
    return <any> this;
  }

  public static warn(message:any, ...optionalParams:any[]):void
  {
    this.addToQueue(():void =>
    {
      console.warn.apply(console, [].concat(message, optionalParams));
    });
    return <any> this;
  }

  protected static addToQueue(func:Function):void
  {
    this._loggerQueue.push(func);
    this.triggerQueue();
  }

  private static triggerQueue():void
  {
    this._loggerQueue.forEach((func:Function) =>
    {
      func();
    });
    this._loggerQueue = [];
  }
}