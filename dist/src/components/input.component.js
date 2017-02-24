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
var InputTextComponent = (function () {
    function InputTextComponent() {
        this.value = '';
    }
    InputTextComponent.prototype.ngOnInit = function () {
        this.value = index_1.CrudComponentObj.components[this.index].value;
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    };
    InputTextComponent.prototype.setValue = function (value) {
        index_1.CrudComponentObj.components[this.index].value = value;
    };
    return InputTextComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InputTextComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputTextComponent.prototype, "name", void 0);
InputTextComponent = __decorate([
    core_1.Component({
        selector: 'inputText',
        template: "\n        <div class=\"col-md-4\">    \n            <label>{{name}}</label>\n        </div>\n        <div class=\"col-md-8\">    \n            <input pInputText type=\"text\" name=\"{{name}}\" [value]=\"value\" (keypress)=\"setValue(myInput.value)\" (blur)=\"setValue(myInput.value)\" #myInput>\n        </div>            \n    "
    })
], InputTextComponent);
exports.InputTextComponent = InputTextComponent;
//# sourceMappingURL=input.component.js.map