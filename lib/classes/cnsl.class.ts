import {Cnsl} from '../interfaces';
import {GroupConfig} from '../types';
import {CnslConfig} from './cnsl-config.class';

export class CnslClass implements Cnsl {
  private _queue: Function[] = [];

  private _groups: {[grpIdent: string]: Cnsl} = {};

  private isGroupClosed: boolean;

  private readonly parentAddToQueue: Function;
  private readonly groupEndCallback: Function;

  constructor(private scope?: string, groupConfig?: GroupConfig) {
    // check if CnslClass instance is a group
    if (groupConfig) {
      const collapsed = groupConfig.collapsed;
      const groupTitle = groupConfig.title;
      this.parentAddToQueue = groupConfig.parentAddToQueue;
      this.groupEndCallback = groupConfig.groupEndCallback;

      this.addToQueue((): void => {
        if (collapsed) {
          console.groupCollapsed.call(console, groupTitle);
        } else {
          console.group.call(console, groupTitle);
        }
      });
    }
  }
  public scoped(scope: string, skipParentSeparator?: boolean): Cnsl {
    const separator = !skipParentSeparator ? CnslConfig.scopeSeparator : '';
    const parentScope = this.scope ? this.scope + separator : '';

    return new CnslClass(parentScope + scope);
  }

  public grouped(groupTitle: string, groupFunc: (cnsl: Cnsl) => void, groupScope?: string, collapsed?: boolean): void {
    let newGroup: Cnsl = this.createGroup(
      this.scopedMessage(groupTitle),
      collapsed,
      (this.scope ? this.scope : '') + (groupScope ? CnslConfig.scopeSeparator + groupScope : '')
    );

    groupFunc(newGroup);
    newGroup.groupEnd();
  }

  public group(groupTitle: string, groupScope?: string, collapsed?: boolean): Cnsl {
    return this.createGroup(
      this.scopedMessage(groupTitle),
      collapsed,
      (this.scope ? this.scope : '') + (groupScope ? CnslConfig.scopeSeparator + groupScope : '')
    );
  }

  public groupEnd(): void {
    if (!this.isGroupClosed) {
      this.addToQueue((): void => {
        console.groupEnd.apply(console);
      });

      if (this.parentAddToQueue !== undefined) {
        this.parentAddToQueue(() => {
          this._queue.forEach((func: Function) => func());
        });
      }

      if (this.groupEndCallback !== undefined) {
        this.groupEndCallback();
      }

      this.isGroupClosed = true;
    }
  }

  public assert(test: boolean, message: string, ...optionalParams: any[]): this {
    this.addToQueue((): void => {
      console.assert.apply(console, [].concat(test, this.scopedMessage(message), optionalParams));
    });
    return this;
  }

  public clear(): this {
    this.addToQueue((): void => {
      console.clear.apply(console);
    });
    return this;
  }

  public count(countTitle: string): this {
    this.addToQueue((): void => {
      console.count.apply(console, [].concat(countTitle));
    });
    return this;
  }

  public debug(message: string, ...optionalParams: any[]): this {
    this.addToQueue((): void => {
      console.debug.apply(console, [].concat(this.scopedMessage(message), optionalParams));
    });
    return this;
  }

  public dir(value: any, ...optionalParams: any[]): this {
    this.addToQueue((): void => {
      console.dir.apply(console, [].concat(value, optionalParams));
    });
    return this;
  }

  public dirxml(value: any): this {
    this.addToQueue((): void => {
      console.dirxml.apply(console, [].concat(value));
    });
    return this;
  }

  public error(message: any, ...optionalParams: any[]): this {
    this.addToQueue((): void => {
      console.error.apply(console, [].concat(this.scopedMessage(message), optionalParams));
    });
    return this;
  }

  public info(message: any, ...optionalParams: any[]): this {
    this.addToQueue((): void => {
      console.info.apply(console, [].concat(this.scopedMessage(message), optionalParams));
    });
    return this;
  }

  public log(message: any, ...optionalParams: any[]): this {
    this.addToQueue((): void => {
      console.log.apply(console, [].concat(this.scopedMessage(message), optionalParams));
    });
    return this;
  }

  public time(timerName: string): this {
    this.addToQueue((): void => {
      console.time.apply(console, [].concat(timerName));
    });
    return this;
  }

  public timeEnd(timerName: string): this {
    this.addToQueue((): void => {
      console.timeEnd.apply(console, [].concat(timerName));
    });
    return this;
  }

  public trace(message: any, ...optionalParams: any[]): this {
    this.addToQueue((): void => {
      console.trace.apply(console, [].concat(this.scopedMessage(message), optionalParams));
    });
    return this;
  }

  public warn(message: any, ...optionalParams: any[]): this {
    this.addToQueue((): void => {
      console.warn.apply(console, [].concat(this.scopedMessage(message), optionalParams));
    });
    return this;
  }

  private createGroup(groupTitle: string, collapsed: boolean, scope?: string): Cnsl {
    let returnedGroup: Cnsl;

    if (groupTitle in this._groups) {
      returnedGroup = this._groups[groupTitle];
    } else {
      returnedGroup = new CnslClass(scope, {
        title: groupTitle,
        collapsed,
        parentAddToQueue: (func: Function) => {
          this.addToQueue(func);
        },
        groupEndCallback: () => {
          delete this._groups[groupTitle];
        },
      });
      this._groups[groupTitle] = returnedGroup;
    }

    return returnedGroup;
  }

  protected addToQueue(func: Function): void {
    if (!this.isGroupClosed) {
      this._queue.push(func);

      if (this.parentAddToQueue === undefined) {
        this.triggerQueue();
      }
    }
  }

  private triggerQueue(): void {
    this._queue.forEach((func: Function) => {
      func();
    });
    this._queue = [];
  }

  private scopedMessage(message: string): string {
    return this.scope ? this.scope + CnslConfig.scopeSeparator + message : message;
  }
}
