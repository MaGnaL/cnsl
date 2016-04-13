import {Logger} from './logger';

export class GroupedLogger extends Logger<GroupedLogger>
{
  private _groupedLoggerQueue:Function[] = [];

  constructor(groupName:string, collapsed:boolean)
  {
    super();

    if (collapsed)
    {
      this.groupCollapsed(groupName);
    }
    else
    {
      this.group(groupName);
    }
  }

  private group(groupTitle:string):GroupedLogger
  {
    this.addToQueue(():void =>
    {
      console.group(groupTitle);
    });
    return this;
  }

  private groupCollapsed(groupTitle:string):GroupedLogger
  {
    this.addToQueue(():void =>
    {
      console.groupCollapsed(groupTitle);
    });
    return this;
  }

  private groupEnd():GroupedLogger
  {
    this.addToQueue(():void =>
    {
      console.groupEnd();
    });
    return this;
  }

  public close():void
  {
    this.groupEnd();
    super.addToQueue(() =>
    {
      this._groupedLoggerQueue.forEach((func:Function) => func());
    });
  }

  protected addToQueue(func:Function):void
  {
    this._groupedLoggerQueue.push(func);
  }
}
