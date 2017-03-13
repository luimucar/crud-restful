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
var base_component_1 = require('./base.component');
var $ = require('jquery');
var InputTextComponent = (function (_super) {
    __extends(InputTextComponent, _super);
    function InputTextComponent() {
        _super.apply(this, arguments);
        this.broadcast = new core_1.EventEmitter();
    }
    InputTextComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.readCommonsParameters(this.index);
        var crudComponentObj = index_1.CrudComponentObj.getComponents(this.clazzName)[this.index];
        this.inputType = crudComponentObj.inputType;
        var name = null;
        if (this.translateKey) {
            name = this.translateKey;
        }
        else {
            name = this.name;
        }
        setTimeout(function () {
            if (_this.translateKey) {
                name = _this.translate.instant(name);
            }
            var width = _this.width;
            $("input[name='" + name + "']").each(function () {
                $(this).width(width);
            });
            var style = _this.style;
            if (style != undefined) {
                $("input[name='" + name + "']").each(function () {
                    var _this = this;
                    style.split(';').forEach(function (value) {
                        var kv = value.split(':');
                        $(_this).css(kv[0], kv[1]);
                    });
                });
            }
        }, 50);
        setTimeout(function () {
            if (_this.value) {
                $('#' + _this.id).attr('checked', 'true');
            }
        }, 50);
        var id = this.id;
        if (this.broadcast != undefined) {
            var clazzName_1 = this.clazzName;
            var property_1 = this.property;
            this.broadcast.subscribe(function (value) {
                if (value != undefined && value[property_1] != undefined) {
                    index_1.setObject(clazzName_1, value);
                    $("#" + id).val(value[property_1]);
                }
            });
        }
    };
    InputTextComponent.prototype.setValue = function (value) {
        if (this.inputType == 'checkbox') {
            index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = $('#' + this.id).is(':checked');
        }
        else {
            index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = value;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InputTextComponent.prototype, "broadcast", void 0);
    InputTextComponent = __decorate([
        core_1.Component({
            selector: 'inputTextCrudRestful',
            template: "\n        <div class=\"row\" id=\"input{{clazzName}}{{index}}\">\n            <div class=\"col-md-{{colMdLeft}}\">\n                <label id=\"label_{{id}}\">{{name}}</label>\n            </div>\n            <div class=\"col-md-{{colMdRigth}}\">    \n                <p-inputMask *ngIf=\"mask\" name=\"{{name}}\" id=\"{{id}}\" [style.width]=\"width\" [value]=\"value\" (click)=\"setValue(myInput.value)\" (keypress)=\"setValue(myInput.value)\" (blur)=\"setValue(myInput.value)\" [readonly]=\"readonly\" [disabled]=\"disabled\" #myInput [mask]=\"mask\" [placeholder]=\"mask\"></p-inputMask>\n                <input *ngIf=\"!mask\" [style.width]=\"width\" pInputText id=\"{{id}}\" type=\"{{inputType}}\" name=\"{{name}}\" [value]=\"value\" (click)=\"setValue(myInput.value)\" (keypress)=\"setValue(myInput.value)\" (blur)=\"setValue(myInput.value)\" [readonly]=\"readonly\" [disabled]=\"disabled\" #myInput>\n            </div>\n            <span id=\"label_error_{{id}}\" style=\"color: red; display: none;\"></span>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], InputTextComponent);
    return InputTextComponent;
}(base_component_1.BaseComponent));
exports.InputTextComponent = InputTextComponent;
//# sourceMappingURL=input.component.js.map