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
var index_1 = require('./index');
var index_2 = require('./services/index');
var concrete_subject_1 = require('./components/observer/concrete-subject');
var observer_1 = require('./components/observer/observer');
var base_component_1 = require('./components/base.component');
var $ = require('jquery');
var ng2_translate_1 = require('ng2-translate');
var CrudComponent = (function (_super) {
    __extends(CrudComponent, _super);
    function CrudComponent(service, translate) {
        _super.call(this, 'CRUD-COMPONENT');
        this.service = service;
        this.translate = translate;
        this.onOk = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.concreteSubject = concrete_subject_1.ConcreteSubject.getInstance();
        this.concreteSubject.register(this);
    }
    CrudComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.components = index_1.CrudComponentObj.getComponents(this.clazz);
        index_1.setObject(this.clazz, this.model);
        setTimeout(function () {
            if (!index_1.Configuration.tableLess.get(_this.clazz)) {
                base_component_1.BaseComponent.showOrHideComponets(_this.clazz, 'none');
            }
            else {
                base_component_1.BaseComponent.showOrHideComponets(_this.clazz, 'block');
            }
        }, 200);
        if (this.buttons != undefined) {
            var buttons = this.buttons.split(',');
            buttons.forEach(function (button) {
                if (button.toUpperCase() == "OK") {
                    _this.showOkButton = true;
                }
                else if (button.toUpperCase() == "SAVE") {
                    _this.showSaveButton = true;
                }
                else if (button.toUpperCase() == "REMOVE") {
                    _this.showRemoveButton = true;
                }
                else if (button.toUpperCase() == "CANCEL") {
                    _this.showCancelButton = true;
                }
            });
        }
    };
    CrudComponent.prototype.hideMsgError = function () {
        this.components.forEach(function (componet) {
            if (componet.required) {
                $("#label_error_" + componet.clazzName + "_" + componet.property).css('display', 'none');
            }
        });
    };
    CrudComponent.prototype.validate = function () {
        var _this = this;
        var ret = true;
        this.components.forEach(function (component) {
            if (component.required) {
                if (component.value == null || component.value.trim() == '') {
                    var message = null;
                    if (component.requiredMessageKey) {
                        message = _this.translate.instant(component.requiredMessageKey);
                    }
                    else {
                        message = component.requiredMessage;
                    }
                    var name_1 = null;
                    if (component.translateKey != undefined) {
                        name_1 = _this.translate.instant(component.translateKey);
                    }
                    else {
                        name_1 = component.name;
                    }
                    var msg = name_1 + ': ' + message;
                    $("#label_error_" + component.clazzName + "_" + component.property).text(msg);
                    $("#label_error_" + component.clazzName + "_" + component.property).css('color', 'red');
                    $("#label_error_" + component.clazzName + "_" + component.property).css('display', 'block');
                    ret = false;
                }
                else {
                    $("#label_error_" + component.clazzName + "_" + component.property).css('display', 'none');
                }
            }
            if (component.regexp) {
                var regexp = eval(component.regexp);
                if (regexp.test(component.value)) {
                    $("#label_error_" + component.clazzName + "_" + component.property).css('display', 'none');
                }
                else {
                    var message = null;
                    if (component.regexpMessageKey) {
                        message = _this.translate.instant(component.regexpMessageKey);
                    }
                    else {
                        message = component.regexpMessage;
                    }
                    var name_2 = null;
                    if (component.translateKey != undefined) {
                        name_2 = _this.translate.instant(component.translateKey);
                    }
                    else {
                        name_2 = component.name;
                    }
                    var msg = name_2 + ': ' + message;
                    $("#label_error_" + component.clazzName + "_" + component.property).text(msg);
                    $("#label_error_" + component.clazzName + "_" + component.property).css('color', 'red');
                    $("#label_error_" + component.clazzName + "_" + component.property).css('display', 'block');
                    ret = false;
                }
            }
        });
        return ret;
    };
    CrudComponent.prototype.ok = function () {
        if (this.components.length > 0) {
            if (this.validate()) {
                var obj = index_1.getObject(this.components[0].clazz);
                this.onOk.emit(obj);
            }
        }
    };
    CrudComponent.prototype.save = function () {
        if (this.components.length > 0) {
            if (this.validate()) {
                var obj = index_1.getObject(this.components[0].clazz);
                if (!index_1.Configuration.tableLess.get(this.clazz)) {
                    base_component_1.BaseComponent.showOrHideComponets(this.clazz, 'none');
                }
                else {
                    base_component_1.BaseComponent.showOrHideComponets(this.clazz, 'block');
                }
                this.showTable();
                this.onSave.emit(obj);
            }
        }
    };
    CrudComponent.prototype.remove = function () {
        if (this.components.length > 0) {
            this.hideMsgError();
            var obj = index_1.getObject(this.components[0].clazz);
            if (!index_1.Configuration.tableLess.get(this.clazz)) {
                base_component_1.BaseComponent.showOrHideComponets(this.clazz, 'none');
            }
            else {
                base_component_1.BaseComponent.showOrHideComponets(this.clazz, 'block');
            }
            this.showTable();
            this.onRemove.emit(obj);
        }
    };
    CrudComponent.prototype.showTable = function () {
        if (this.components.length > 0) {
            this.components.forEach(function (comp) {
                if (comp.type == 'Table') {
                    $('#table' + comp.clazzName + comp.index).css("display", "block");
                }
            });
        }
    };
    CrudComponent.prototype.cancel = function () {
        if (this.components.length > 0) {
            this.hideMsgError();
            if (!index_1.Configuration.tableLess.get(this.clazz)) {
                base_component_1.BaseComponent.showOrHideComponets(this.clazz, 'none');
            }
            else {
                base_component_1.BaseComponent.showOrHideComponets(this.clazz, 'block');
            }
            this.showTable();
            this.onCancel.emit();
        }
    };
    CrudComponent.prototype.notify = function () {
        this.showRemove = base_component_1.BaseComponent.showRemove.get(this.clazz) && this.showRemoveButton;
        if (base_component_1.BaseComponent.hideMsgError.get(this.clazz)) {
            this.hideMsgError();
        }
        this.concreteSubject.notify("BASE-COMPONENT");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CrudComponent.prototype, "clazz", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CrudComponent.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CrudComponent.prototype, "broadcast", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CrudComponent.prototype, "buttons", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CrudComponent.prototype, "onOk", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CrudComponent.prototype, "onSave", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CrudComponent.prototype, "onRemove", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CrudComponent.prototype, "onCancel", void 0);
    CrudComponent = __decorate([
        core_1.Component({
            selector: 'crud',
            templateUrl: './crud.html',
            providers: [index_2.Service]
        }), 
        __metadata('design:paramtypes', [index_2.Service, ng2_translate_1.TranslateService])
    ], CrudComponent);
    return CrudComponent;
}(observer_1.Observer));
exports.CrudComponent = CrudComponent;
//# sourceMappingURL=crud.component.js.map