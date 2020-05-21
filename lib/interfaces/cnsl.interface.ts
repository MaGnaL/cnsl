export interface Cnsl {
  scoped(scope: string, skipParentSeparator?: boolean): Cnsl;
  group(groupTitle: string, groupScope?: string, collapsed?: boolean): Cnsl;
  grouped(groupTitle: string, groupFunc: (cnsl: Cnsl) => void, groupScope?: string, collapsed?: boolean): void;
  groupEnd(): void;
  assert(test: boolean, message: string, ...optionalParams: any[]): this;
  clear(): this;
  count(countTitle: string): this;
  debug(message: string, ...optionalParams: any[]): this;
  dir(value: any, ...optionalParams: any[]): this;
  dirxml(value: any): this;
  error(message: any, ...optionalParams: any[]): this;
  info(message: any, ...optionalParams: any[]): this;
  log(message: any, ...optionalParams: any[]): this;
  time(timerName: string): this;
  timeEnd(timerName: string): this;
  trace(message: any, ...optionalParams: any[]): this;
  warn(message: any, ...optionalParams: any[]): this;
}
