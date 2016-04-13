import { Logger } from './logger';
import { GroupedLogger } from './grouped-logger';
export declare class JSLogger extends Logger<JSLogger> {
    grouped(groupName: string, collapsed?: boolean): GroupedLogger;
}
