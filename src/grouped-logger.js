"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var logger_1 = require('./logger');
var GroupedLogger = (function (_super) {
    __extends(GroupedLogger, _super);
    function GroupedLogger(groupName, collapsed) {
        _super.call(this);
        this._groupedLoggerQueue = [];
        if (collapsed) {
            this.groupCollapsed(groupName);
        }
        else {
            this.group(groupName);
        }
    }
    GroupedLogger.prototype.group = function (groupTitle) {
        this.addToQueue(function () {
            console.group(groupTitle);
        });
        return this;
    };
    GroupedLogger.prototype.groupCollapsed = function (groupTitle) {
        this.addToQueue(function () {
            console.groupCollapsed(groupTitle);
        });
        return this;
    };
    GroupedLogger.prototype.groupEnd = function () {
        this.addToQueue(function () {
            console.groupEnd();
        });
        return this;
    };
    GroupedLogger.prototype.close = function () {
        var _this = this;
        this.groupEnd();
        _super.prototype.addToQueue.call(this, function () {
            _this._groupedLoggerQueue.forEach(function (func) { return func(); });
        });
    };
    GroupedLogger.prototype.addToQueue = function (func) {
        this._groupedLoggerQueue.push(func);
    };
    return GroupedLogger;
}(logger_1.Logger));
exports.GroupedLogger = GroupedLogger;
//# sourceMappingURL=grouped-logger.js.map