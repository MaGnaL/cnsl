"use strict";
var Logger = (function () {
    function Logger() {
        this._loggerQueue = [];
    }
    Logger.prototype.assert = function (test, message) {
        var optionalParams = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            optionalParams[_i - 2] = arguments[_i];
        }
        this.addToQueue(function () {
            console.assert(test, message, optionalParams);
        });
        return this;
    };
    Logger.prototype.clear = function () {
        this.addToQueue(function () {
            console.clear();
        });
        return this;
    };
    Logger.prototype.count = function (countTitle) {
        this.addToQueue(function () {
            console.count(countTitle);
        });
        return this;
    };
    Logger.prototype.debug = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.addToQueue(function () {
            console.debug(message, optionalParams);
        });
        return this;
    };
    Logger.prototype.dir = function (value) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.addToQueue(function () {
            console.dir(value, optionalParams);
        });
        return this;
    };
    Logger.prototype.dirxml = function (value) {
        this.addToQueue(function () {
            console.dirxml(value);
        });
        return this;
    };
    Logger.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.addToQueue(function () {
            console.error(message, optionalParams);
        });
        return this;
    };
    Logger.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.addToQueue(function () {
            console.info(message, optionalParams);
        });
        return this;
    };
    Logger.prototype.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.addToQueue(function () {
            console.log(message, optionalParams);
        });
        return this;
    };
    Logger.prototype.msIsIndependentlyComposed = function (element) {
        this.addToQueue(function () {
            return console.msIsIndependentlyComposed(element);
        });
        return this;
    };
    Logger.prototype.profile = function (reportName) {
        this.addToQueue(function () {
            console.profile(reportName);
        });
        return this;
    };
    Logger.prototype.profileEnd = function () {
        this.addToQueue(function () {
            console.profileEnd();
        });
        return this;
    };
    Logger.prototype.select = function (element) {
        this.addToQueue(function () {
            console.select(element);
        });
        return this;
    };
    Logger.prototype.time = function (timerName) {
        this.addToQueue(function () {
            console.time(timerName);
        });
        return this;
    };
    Logger.prototype.timeEnd = function (timerName) {
        this.addToQueue(function () {
            console.timeEnd(timerName);
        });
        return this;
    };
    Logger.prototype.trace = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.addToQueue(function () {
            console.trace(message, optionalParams);
        });
        return this;
    };
    Logger.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        this.addToQueue(function () {
            console.warn(message, optionalParams);
        });
        return this;
    };
    Logger.prototype.addToQueue = function (func) {
        this._loggerQueue.push(func);
        this.triggerQueue();
    };
    Logger.prototype.triggerQueue = function () {
        this._loggerQueue.forEach(function (func) {
            func();
        });
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map