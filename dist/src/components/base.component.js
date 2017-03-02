"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var BaseComponent = (function () {
    function BaseComponent() {
        this.readonly = false;
        this.disabled = false;
    }
    BaseComponent.prototype.readCommonsParameters = function (index) {
        this.id = index_1.CrudComponentObj.components[index].property;
        this.value = index_1.CrudComponentObj.components[index].defaultValue;
        this.values = index_1.CrudComponentObj.components[index].values;
        this.name = index_1.CrudComponentObj.components[index].name;
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        if (index_1.CrudComponentObj.components[index].readOnly != undefined) {
            this.readonly = index_1.CrudComponentObj.components[index].readOnly;
        }
        else {
            this.readonly = false;
        }
        if (index_1.CrudComponentObj.components[index].disabled != undefined) {
            this.disabled = index_1.CrudComponentObj.components[index].disabled;
        }
        else {
            this.disabled = false;
        }
        index_1.CrudComponentObj.components[index].value = this.value;
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map