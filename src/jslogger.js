"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var logger_1 = require('./logger');
var grouped_logger_1 = require('./grouped-logger');
var JSLogger = (function (_super) {
    __extends(JSLogger, _super);
    function JSLogger() {
        _super.apply(this, arguments);
    }
    JSLogger.prototype.grouped = function (groupName, collapsed) {
        if (collapsed === void 0) { collapsed = true; }
        return new grouped_logger_1.GroupedLogger(groupName, collapsed);
    };
    return JSLogger;
}(logger_1.Logger));
exports.JSLogger = JSLogger;
//# sourceMappingURL=jslogger.js.map