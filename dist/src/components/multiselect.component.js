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
var index_2 = require("../services/index");
var MultiSelectComponent = (function () {
    function MultiSelectComponent(service) {
        this.service = service;
        this.itens = [];
    }
    MultiSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        var crudComponentObj = index_1.CrudComponentObj.components[this.index];
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        this.getMultiSelectValues(crudComponentObj.url)
            .subscribe(function (values) {
            values.forEach(function (val) {
                if (crudComponentObj.selectItemArray == null) {
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
        this.service.setHeader(null, false);
        return this.service.get(url);
    };
    MultiSelectComponent.prototype.setValue = function (value) {
        var _this = this;
        var crudComponentObj = index_1.CrudComponentObj.components[this.index];
        index_1.CrudComponentObj.components[this.index].value = [];
        value.forEach(function (v) {
            var selectClazz = new crudComponentObj.selectClazz();
            selectClazz[crudComponentObj.selectItemValue] = v;
            _this.itens.forEach(function (item) {
                if (item.value == v) {
                    selectClazz[crudComponentObj.selectItemLabel] = item.label;
                }
            });
            index_1.CrudComponentObj.components[_this.index].value.push(selectClazz);
        });
    };
    return MultiSelectComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], MultiSelectComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultiSelectComponent.prototype, "name", void 0);
MultiSelectComponent = __decorate([
    core_1.Component({
        selector: 'inputText',
        providers: [index_2.Service],
        template: "\n        <div class=\"col-md-4\">    \n            <label>{{name}}</label>\n        </div>\n        <div class=\"col-md-8\">    \n            <p-multiSelect [options]=\"itens\" [(ngModel)]=\"selectedItem\" (onChange)=\"setValue($event.value)\"></p-multiSelect>            \n        </div>            \n    "
    }),
    __metadata("design:paramtypes", [index_2.Service])
], MultiSelectComponent);
exports.MultiSelectComponent = MultiSelectComponent;
//# sourceMappingURL=multiselect.component.js.map