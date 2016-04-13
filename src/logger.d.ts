export declare class Logger<T extends Logger<any>> {
    private _loggerQueue;
    assert(test: boolean, message: string, ...optionalParams: any[]): T;
    clear(): T;
    count(countTitle: string): T;
    debug(message: string, ...optionalParams: any[]): T;
    dir(value: any, ...optionalParams: any[]): T;
    dirxml(value: any): T;
    error(message: any, ...optionalParams: any[]): T;
    info(message: any, ...optionalParams: any[]): T;
    log(message: any, ...optionalParams: any[]): T;
    msIsIndependentlyComposed(element: Element): T;
    profile(reportName: string): T;
    profileEnd(): T;
    select(element: Element): T;
    time(timerName: string): T;
    timeEnd(timerName: string): T;
    trace(message: any, ...optionalParams: any[]): T;
    warn(message: any, ...optionalParams: any[]): T;
    protected addToQueue(func: Function): void;
    private triggerQueue();
}
