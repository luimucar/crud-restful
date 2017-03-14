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
var SelectComponent = (function (_super) {
    __extends(SelectComponent, _super);
    function SelectComponent() {
        _super.apply(this, arguments);
    }
    SelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.readCommonsParameters(this.index);
        setTimeout(function () {
            var i = 0;
            _this.values.forEach(function (value) {
                if (value['value'] == _this.value) {
                    $('#' + i).attr('selected', 'selected');
                }
                i++;
            });
        }, 50);
    };
    SelectComponent.prototype.onChangeObj = function (value) {
        index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = value;
    };
    SelectComponent = __decorate([
        core_1.Component({
            selector: 'selectCrudRestful',
            template: "\n        <div class=\"row\" id=\"select{{clazzName}}{{index}}\">\n            <div class=\"col-md-{{colMdLeft}}\">    \n                <label>{{name}}</label>\n            </div>\n            <div class=\"col-md-{{colMdRigth}}\">    \n                <select [style.width]=\"width\" (change)=\"onChangeObj($event.target.value)\">\n                    <option id=\"{{i}}\" [value]=\"item.value\" *ngFor=\"let item of values; let i = index\">{{item.label}}</option>\n                </select>\n            </div>\n            <span id=\"label_error_{{id}}\" style=\"color: red; display: none;\"></span>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], SelectComponent);
    return SelectComponent;
}(base_component_1.BaseComponent));
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map