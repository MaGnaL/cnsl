import {Cnsl} from './cnsl.interface';
import * as _ from 'lodash';
import {CnslConfig} from './cnsl-config.class';

export class CnslClass implements Cnsl {
  private static groups: {[grpIdent: string]: Cnsl} = {};

  private functionQueue: Function[] = [];
  private isGroupClosed: boolean;

  /** Holds own scope */
  private _scope: string;
  /**
   * Combines parent scope and own scope
   */
  public get scope(): string {
    return _.join(_.compact([this.parentGroup?.scope, this._scope]), CnslConfig.scopeSeparator);
  }

  constructor(
    groupTitle?: string,
    collapsed?: boolean,
    private parentAddToQueue?: Function,
    private groupEndCallback?: Function,
    private parentGroup?: Cnsl
  ) {
    if (groupTitle !== undefined) {
      this.queue((): void => {
        if (collapsed) {
          console.groupCollapsed(groupTitle);
        } else {
          console.group(groupTitle);
        }
      });
    }
  }

  public scoped(scope: string): this {
    this._scope = scope;

    return this;
  }

  public grouped(groupTitle: string, groupFunc: (cnsl: Cnsl) => void, collapsed?: boolean): void {
    let newGroup: Cnsl = this.createGroup(this.withScope(groupTitle), collapsed);

    groupFunc(newGroup);
    newGroup.groupEnd();
  }

  public groupEnd(): void {
    if (!this.isGroupClosed) {
      this.queue((): void => {
        console.groupEnd();
      });

      if (this.parentAddToQueue !== undefined) {
        this.parentAddToQueue(() => {
          this.triggerQueue();
        });
      }

      if (this.groupEndCallback !== undefined) {
        this.groupEndCallback();
      }

      this.isGroupClosed = true;
    }
  }

  public group(groupTitle: string, collapsed?: boolean): Cnsl {
    return this.createGroup(this.withScope(groupTitle), collapsed);
  }

  public assert(condition?: boolean, message?: string, ...data: any[]): void {
    this.queue(() => console.assert(condition, this.withEmoji('☑') + this.withScope(message), ...data));
  }

  public debug(message?: any, ...optionalParams: any[]): void {
    this.queue(() => console.debug(this.withEmoji('🐛') + this.withScope(message), ...optionalParams));
  }

  public error(message?: any, ...optionalParams: any[]): void {
    this.queue(() => console.error(this.withEmoji('⛔') + this.withScope(message), ...optionalParams));
  }

  public info(message?: any, ...optionalParams: any[]): void {
    this.queue(() => console.info(this.withEmoji('ℹ') + this.withScope(message), ...optionalParams));
  }

  public log(message?: any, ...optionalParams: any[]): void {
    this.queue(() => console.log(this.withEmoji('💬') + this.withScope(message), ...optionalParams));
  }

  public trace(message?: any, ...optionalParams: any[]): void {
    this.queue(() => console.trace(this.withEmoji('💭') + this.withScope(message), ...optionalParams));
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    this.queue(() => console.warn(this.withEmoji('⚠') + this.withScope(message), ...optionalParams));
  }

  private createGroup(groupTitle: string, collapsed: boolean): Cnsl {
    let returnedGroup: Cnsl;

    if (groupTitle in CnslClass.groups) {
      returnedGroup = CnslClass.groups[groupTitle];
    } else {
      returnedGroup = new CnslClass(
        this.withEmoji('📂') + groupTitle,
        collapsed,
        (func: Function) => {
          this.queue(func);
        },
        () => {
          delete CnslClass.groups[groupTitle];
        },
        this
      );
      CnslClass.groups[groupTitle] = returnedGroup;
    }

    return returnedGroup;
  }

  protected queue(func: Function): void {
    if (!this.isGroupClosed) {
      this.functionQueue.push(func);

      if (this.parentAddToQueue === undefined) {
        this.triggerQueue();
      }
    }
  }

  private triggerQueue(): void {
    this.functionQueue.forEach((func: Function) => func());
    this.functionQueue = [];
  }

  /**
   * Combines message and scope
   * @param message
   */
  private withScope(message: string): string {
    return _.join(_.compact([this.scope, message]), CnslConfig.scopeSeparator);
  }

  /**
   * Validates for emoji config
   * @param emoji
   */
  private withEmoji(emoji: string): string {
    return CnslConfig.showEmoji ? emoji + CnslConfig.emojiSeparator : '';
  }
}

export const cnsl: Cnsl = new CnslClass();
