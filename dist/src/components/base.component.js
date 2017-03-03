"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../index");
var BaseComponent = (function () {
    function BaseComponent() {
        this.readonly = false;
        this.disabled = false;
    }
    BaseComponent.prototype.readCommonsParameters = function (index) {
        this.id = index_1.CrudComponentObj.getComponents(this.clazzName)[index].property;
        this.value = index_1.CrudComponentObj.getComponents(this.clazzName)[index].defaultValue;
        this.values = index_1.CrudComponentObj.getComponents(this.clazzName)[index].values;
        this.name = index_1.CrudComponentObj.getComponents(this.clazzName)[index].name;
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        if (index_1.CrudComponentObj.getComponents(this.clazzName)[index].readOnly != undefined) {
            this.readonly = index_1.CrudComponentObj.getComponents(this.clazzName)[index].readOnly;
        }
        else {
            this.readonly = false;
        }
        if (index_1.CrudComponentObj.getComponents(this.clazzName)[index].disabled != undefined) {
            this.disabled = index_1.CrudComponentObj.getComponents(this.clazzName)[index].disabled;
        }
        else {
            this.disabled = false;
        }
        this.order = index_1.CrudComponentObj.getComponents(this.clazzName)[index].order;
        this.autoWidth = index_1.CrudComponentObj.getComponents(this.clazzName)[index].autoWidth;
        if (this.autoWidth) {
            this.width = "100%";
        }
        else {
            this.width = index_1.CrudComponentObj.getComponents(this.clazzName)[index].width;
        }
        index_1.CrudComponentObj.getComponents(this.clazzName)[index].value = this.value;
    };
    return BaseComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], BaseComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BaseComponent.prototype, "clazzName", void 0);
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map