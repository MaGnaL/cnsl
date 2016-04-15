import {cnsl} from './cnsl';

export class cnslgrp extends cnsl
{
  private _groupedLoggerQueue:Function[] = [];

  private _addToCnslQueue:Function;

  constructor(groupName:string, collapsed:boolean, addToCnslQueue:Function)
  {
    super();

    this._addToCnslQueue = addToCnslQueue;
    if (collapsed)
    {
      this.groupCollapsed(groupName);
    }
    else
    {
      this.group(groupName);
    }
  }

  private group(groupTitle:string):cnslgrp
  {
    this.addToQueue(():void =>
    {
      console.group(groupTitle);
    });
    return this;
  }

  private groupCollapsed(groupTitle:string):cnslgrp
  {
    this.addToQueue(():void =>
    {
      console.groupCollapsed(groupTitle);
    });
    return this;
  }

  private groupEnd():cnslgrp
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
    this._addToCnslQueue(() =>
    {
      this._groupedLoggerQueue.forEach((func:Function) => func());
    });
  }

  protected addToQueue(func:Function):void
  {
    this._groupedLoggerQueue.push(func);
  }
}
