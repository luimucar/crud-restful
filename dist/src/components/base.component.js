"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var BaseComponent = (function () {
    function BaseComponent() {
        this.readonly = false;
        this.disabled = false;
    }
    BaseComponent.prototype.readCommonsParameters = function (index) {
        this.value = index_1.CrudComponentObj.components[index].defaultValue;
        this.name = index_1.CrudComponentObj.components[index].name;
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        if (index_1.CrudComponentObj.components[index].readOnly != undefined) {
            this.readonly = index_1.CrudComponentObj.components[index].readOnly;
        }
        if (index_1.CrudComponentObj.components[index].disabled != undefined) {
            this.disabled = index_1.CrudComponentObj.components[index].disabled;
        }
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map