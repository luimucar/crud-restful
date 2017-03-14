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
var CheckboxesComponent = (function (_super) {
    __extends(CheckboxesComponent, _super);
    function CheckboxesComponent() {
        _super.apply(this, arguments);
    }
    CheckboxesComponent.prototype.ngOnInit = function () {
        this.readCommonsParameters(this.index);
        var crudComponentObj = index_1.CrudComponentObj.getComponents(this.clazzName)[this.index];
        crudComponentObj.value = this.values;
    };
    CheckboxesComponent.prototype.updateCheckedOptions = function (item, event) {
        item['checked'] = event.target.checked;
        var crudComponentObj = index_1.CrudComponentObj.getComponents(this.clazzName)[this.index];
        crudComponentObj.value = this.values;
    };
    CheckboxesComponent = __decorate([
        core_1.Component({
            selector: 'selectCrudRestful',
            template: "\n        <div class=\"row\" id=\"checkboxes{{clazzName}}{{index}}\">\n            <div class=\"col-md-{{colMdLeft}}\">    \n                <label>{{name}}</label>\n            </div>\n            <div class=\"col-md-{{colMdRigth}}\">\n                <div *ngFor=\"let item of values\">\n                    <input type='checkbox' [name]=\"item.value\" [value]=\"item.value\" (change)=\"updateCheckedOptions(item, $event)\">\n                    <label>{{item.name}}</label> \n            </div>\n            <span id=\"label_error_{{id}}\" style=\"color: red; display: none;\"></span>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxesComponent);
    return CheckboxesComponent;
}(base_component_1.BaseComponent));
exports.CheckboxesComponent = CheckboxesComponent;
//# sourceMappingURL=checkboxes.component.js.map