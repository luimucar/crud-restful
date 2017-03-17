"use strict";
var Subject = (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.register = function (observer) {
        this.observers.push(observer);
    };
    Subject.prototype.unregister = function (observer) {
        var n = this.observers.indexOf(observer);
        this.observers.splice(n, 1);
    };
    Subject.prototype.notify = function (groupId) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.groupId == groupId) {
                observer.notify();
            }
        }
    };
    return Subject;
}());
exports.Subject = Subject;
//# sourceMappingURL=subject.js.map