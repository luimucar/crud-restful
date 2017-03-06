"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../index");
var base_component_1 = require("./base.component");
var $ = require("jquery");
var InputTextComponent = (function (_super) {
    __extends(InputTextComponent, _super);
    function InputTextComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputTextComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.readCommonsParameters(this.index);
        var crudComponentObj = index_1.CrudComponentObj.getComponents(this.clazzName)[this.index];
        this.inputType = crudComponentObj.inputType;
        setTimeout(function () {
            if (_this.value) {
                $('#' + _this.id).attr('checked', 'true');
            }
        }, 50);
    };
    InputTextComponent.prototype.setValue = function (value) {
        if (this.inputType == 'checkbox') {
            index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = $('#' + this.id).is(':checked');
        }
        else {
            index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = value;
        }
    };
    return InputTextComponent;
}(base_component_1.BaseComponent));
InputTextComponent = __decorate([
    core_1.Component({
        selector: 'inputText',
        template: "\n        <div class=\"row\">\n            <div class=\"col-md-{{colMdLeft}}\">    \n                <label>{{name}}</label>\n            </div>\n            <div class=\"col-md-{{colMdRigth}}\">    \n                <input [style.width]=\"width\" pInputText id=\"{{id}}\" type=\"{{inputType}}\" name=\"{{name}}\" [value]=\"value\" (click)=\"setValue(myInput.value)\" (keypress)=\"setValue(myInput.value)\" (blur)=\"setValue(myInput.value)\" [readonly]=\"readonly\" [disabled]=\"disabled\" #myInput>\n            </div>            \n        </div>\n    "
    })
], InputTextComponent);
exports.InputTextComponent = InputTextComponent;
//# sourceMappingURL=input.component.js.map