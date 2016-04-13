import {Logger} from './logger';
import {GroupedLogger} from './grouped-logger';

export class JSLogger extends Logger<JSLogger>
{
  public grouped(groupName:string, collapsed:boolean = true):GroupedLogger
  {
    return new GroupedLogger(groupName, collapsed);
  }
}
