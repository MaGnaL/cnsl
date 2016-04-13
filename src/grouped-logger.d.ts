import { Logger } from './logger';
export declare class GroupedLogger extends Logger<GroupedLogger> {
    private _groupedLoggerQueue;
    constructor(groupName: string, collapsed: boolean);
    private group(groupTitle);
    private groupCollapsed(groupTitle);
    private groupEnd();
    close(): void;
    protected addToQueue(func: Function): void;
}
