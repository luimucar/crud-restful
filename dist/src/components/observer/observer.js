"use strict";
var Observer = (function () {
    function Observer(groupId) {
        this.groupId = groupId;
    }
    Observer.prototype.notify = function () {
        throw new Error("Abstract Method!");
    };
    return Observer;
}());
exports.Observer = Observer;
//# sourceMappingURL=observer.js.map