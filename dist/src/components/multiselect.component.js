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
var index_2 = require('../services/index');
var base_component_1 = require('./base.component');
var MultiSelectComponent = (function (_super) {
    __extends(MultiSelectComponent, _super);
    function MultiSelectComponent(service) {
        _super.call(this);
        this.service = service;
        this.itens = [];
    }
    MultiSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.readCommonsParameters(this.index);
        var crudComponentObj = index_1.CrudComponentObj.getComponents(this.clazzName)[this.index];
        this.getMultiSelectValues(crudComponentObj.url)
            .subscribe(function (values) {
            values.forEach(function (val) {
                if (crudComponentObj.selectItemArray == undefined) {
                    _this.itens.push({ label: val[crudComponentObj.selectItemLabel], value: val[crudComponentObj.selectItemValue] });
                }
                else {
                    val[crudComponentObj.selectItemArray].forEach(function (val) {
                        _this.itens.push({ label: val[crudComponentObj.selectItemLabel], value: val[crudComponentObj.selectItemValue] });
                    });
                }
            });
        }, function (error) {
            console.log(error);
        });
    };
    MultiSelectComponent.prototype.getMultiSelectValues = function (url) {
        return this.service.get(url);
    };
    MultiSelectComponent.prototype.setValue = function (value) {
        var _this = this;
        var crudComponentObj = index_1.CrudComponentObj.getComponents(this.clazzName)[this.index];
        index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = [];
        value.forEach(function (v) {
            var selectClazz = new crudComponentObj.selectClazz();
            selectClazz[crudComponentObj.selectItemValue] = v;
            _this.itens.forEach(function (item) {
                if (item.value == v) {
                    selectClazz[crudComponentObj.selectItemLabel] = item.label;
                }
            });
            index_1.CrudComponentObj.getComponents(_this.clazzName)[_this.index].value.push(selectClazz);
        });
    };
    MultiSelectComponent = __decorate([
        core_1.Component({
            selector: 'multiSelectCrudRestful',
            providers: [index_2.Service],
            template: "\n        <div class=\"row\" id=\"multiselect{{clazzName}}{{index}}\">\n            <div class=\"col-md-{{colMdLeft}}\">    \n                <label>{{name}}</label>\n            </div>\n            <div class=\"col-md-{{colMdRigth}}\">    \n                <p-multiSelect [options]=\"itens\" [(ngModel)]=\"selectedItem\" (onChange)=\"setValue($event.value)\"></p-multiSelect>            \n            </div>\n            <span id=\"label_error_{{id}}\" style=\"color: red; display: none;\"></span>            \n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [index_2.Service])
    ], MultiSelectComponent);
    return MultiSelectComponent;
}(base_component_1.BaseComponent));
exports.MultiSelectComponent = MultiSelectComponent;
//# sourceMappingURL=multiselect.component.js.map