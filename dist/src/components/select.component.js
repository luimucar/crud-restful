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
var SelectComponent = (function () {
    function SelectComponent() {
    }
    SelectComponent.prototype.ngOnInit = function () {
        var crudComponentObj = index_1.CrudComponentObj.components[this.index];
        this.name = index_1.CrudComponentObj.components[this.index].name;
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        this.values = crudComponentObj.values;
    };
    SelectComponent.prototype.onChangeObj = function (value) {
        var crudComponentObj = index_1.CrudComponentObj.components[this.index];
        index_1.CrudComponentObj.components[this.index].value = value;
        this.selectedObj = value;
    };
    return SelectComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SelectComponent.prototype, "index", void 0);
SelectComponent = __decorate([
    core_1.Component({
        selector: 'selectInput',
        template: "\n        <div class=\"row\">\n            <div class=\"col-md-4\">    \n                <label>{{name}}</label>\n            </div>\n            <div class=\"col-md-8\">    \n                <select [ngModel]=\"selectedObj\" (ngModelChange)=\"onChangeObj($event)\">\n                    <option [ngValue]=\"i.value\" *ngFor=\"let i of values\">{{i.label}}</option>\n                </select>\n            </div>\n        </div>\n    "
    })
], SelectComponent);
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map