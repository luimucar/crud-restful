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
var base_component_1 = require('./base.component');
var RadioboxesComponent = (function (_super) {
    __extends(RadioboxesComponent, _super);
    function RadioboxesComponent() {
        _super.apply(this, arguments);
    }
    RadioboxesComponent.prototype.ngOnInit = function () {
        this.readCommonsParameters(this.index);
    };
    RadioboxesComponent.prototype.selectValue = function (item) {
        console.log(item);
        /*
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        crudComponentObj.values = this.values;
        crudComponentObj.value = item;
        CrudComponentObj.getComponents(this.clazzName)[this.index]=crudComponentObj;
        console.log(crudComponentObj.value);
        */
    };
    RadioboxesComponent = __decorate([
        core_1.Component({
            selector: 'selectCrudRestful',
            template: "\n        <div class=\"row\" id=\"radioboxes{{clazzName}}{{index}}\">\n            <div class=\"col-md-{{colMdLeft}}\">    \n                <label>{{name}}</label>\n            </div>\n            <div class=\"col-md-{{colMdRigth}}\">\n                <div *ngFor=\"let item of values\">\n                    <input type=\"radio\" name=\"radiobox\" [value]=\"item.value\" (click)=\"selectValue(item)\">\n                    <label>{{item.name}}</label> \n                </div>\n            </div>\n            <span id=\"label_error_{{id}}\" style=\"color: red; display: none;\"></span>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], RadioboxesComponent);
    return RadioboxesComponent;
}(base_component_1.BaseComponent));
exports.RadioboxesComponent = RadioboxesComponent;
//# sourceMappingURL=radioboxes.component.js.map