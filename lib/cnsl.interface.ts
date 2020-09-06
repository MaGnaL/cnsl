export interface Cnsl {
  scoped(scope: string): this;
  readonly scope: string;
  grouped(groupTitle: string, groupFunc: (cnsl: Cnsl) => void, collapsed?: boolean): void;

  assert(condition?: boolean, message?: string, ...data: any[]): void;

  warn(message?: any, ...optionalParams: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  trace(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  log(message?: any, ...optionalParams: any[]): void;

  group(groupTitle: string, collapsed?: boolean): Cnsl;
  groupEnd(): void;
}
