"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var index_1 = require('../index');
var ng2_translate_1 = require('ng2-translate');
var observer_1 = require('./observer/observer');
var concrete_subject_1 = require('./observer/concrete-subject');
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        _super.call(this, "BASE-COMPONENT");
        this.readonly = false;
        this.disabled = false;
        this.colMdLeft = 4;
        this.colMdRigth = 8;
        this.concreteSubject = concrete_subject_1.ConcreteSubject.getInstance();
        this.concreteSubject.register(this);
    }
    BaseComponent.prototype.readCommonsParameters = function (index) {
        this.id = this.clazzName + "_" + index_1.CrudComponentObj.getComponents(this.clazzName)[index].property;
        this.loadValue(this.index);
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
        if (index_1.CrudComponentObj.getComponents(this.clazzName)[index].colMdLeft != undefined) {
            this.colMdLeft = index_1.CrudComponentObj.getComponents(this.clazzName)[index].colMdLeft;
        }
        if (index_1.CrudComponentObj.getComponents(this.clazzName)[index].colMdRigth != undefined) {
            this.colMdRigth = index_1.CrudComponentObj.getComponents(this.clazzName)[index].colMdRigth;
        }
        if (index_1.CrudComponentObj.getComponents(this.clazzName)[index].focus != undefined) {
            this.focus = index_1.CrudComponentObj.getComponents(this.clazzName)[index].focus;
        }
        if (index_1.CrudComponentObj.getComponents(this.clazzName)[index].format != undefined) {
            this.format = index_1.CrudComponentObj.getComponents(this.clazzName)[index].format;
        }
        this.translateLabel(index);
        index_1.CrudComponentObj.getComponents(this.clazzName)[index].value = this.value;
    };
    BaseComponent.prototype.loadValue = function (index) {
        if (index_1.CrudComponentObj.getComponents(this.clazzName)[index].value != undefined) {
            this.value = index_1.CrudComponentObj.getComponents(this.clazzName)[index].value;
        }
        else {
            this.value = index_1.CrudComponentObj.getComponents(this.clazzName)[index].defaultValue;
        }
        if (this.value == undefined) {
            this.value = null;
        }
    };
    BaseComponent.prototype.notify = function () {
        this.translateLabel(this.index);
    };
    BaseComponent.prototype.translateLabel = function (index) {
        var _this = this;
        if (this.translate != undefined &&
            index_1.CrudComponentObj.getComponents(this.clazzName)[index].translateKey != undefined &&
            index_1.CrudComponentObj.getComponents(this.clazzName)[index].translateKey != null) {
            var translateKey_1 = index_1.CrudComponentObj.getComponents(this.clazzName)[index].translateKey;
            setTimeout(function () {
                _this.name = _this.translate.instant(translateKey_1);
            }, 50);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BaseComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaseComponent.prototype, "clazzName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ng2_translate_1.TranslateService)
    ], BaseComponent.prototype, "translate", void 0);
    return BaseComponent;
}(observer_1.Observer));
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map