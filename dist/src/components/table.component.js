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
var index_2 = require('../services/index');
var $ = require('jquery');
var TableComponent = (function (_super) {
    __extends(TableComponent, _super);
    function TableComponent(service) {
        _super.call(this);
        this.service = service;
        this.cols = [];
        this.itens = [];
    }
    TableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.readCommonsParameters(this.index);
        index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = [];
        index_1.CrudComponentObj.getComponents(this.clazzName).forEach(function (comp) {
            if (comp.tableColumn >= 0) {
                _this.cols.push({ field: comp.property, header: comp.name, sortable: comp.sortable });
            }
        });
        var crudComponentObj = index_1.CrudComponentObj.getComponents(this.clazzName)[this.index];
        this.getItens(crudComponentObj.url)
            .subscribe(function (itens) {
            itens.forEach(function (item) {
                _this.itens.push(item);
            });
        }, function (error) {
            console.log(error);
        });
    };
    TableComponent.prototype.getItens = function (url) {
        this.service.setHeader(null, false);
        return this.service.get(url);
    };
    TableComponent.prototype.onRowSelect = function (event) {
        var _this = this;
        this.selected = event.data;
        index_1.CrudComponentObj.getComponents(this.clazzName).forEach(function (comp) {
            if (_this.selected[comp.property]) {
                comp.value = _this.selected[comp.property];
                $('#' + comp.clazzName + '_' + comp.property).val(_this.selected[comp.property]);
            }
        });
    };
    TableComponent.prototype.newItem = function () {
        index_1.CrudComponentObj.getComponents(this.clazzName).forEach(function (comp) {
            comp.value = null;
            $('#' + comp.clazzName + '_' + comp.property).val(null);
        });
    };
    TableComponent = __decorate([
        core_1.Component({
            selector: 'tableCrudRestful',
            template: "\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <p-dataTable id=\"table\" [value]=\"itens\" selectionMode=\"single\" [(selection)]=\"selected\" (onRowSelect)=\"onRowSelect($event)\" [paginator]=\"true\" rows=\"15\" [responsive]=\"true\">\n                    <p-column *ngFor=\"let col of cols\" [field]=\"col.field\" [header]=\"col.header\" [sortable]=\"col.sortable\"></p-column>\n                    <p-footer>\n                        <div class=\"ui-helper-clearfix\" style=\"width:100%\">\n                            <button class=\"btn btn-primary btn-margin-vertical pull-left\" type=\"button\" (click)=\"newItem()\" style=\"margin-top: 5px;\">\n                                <strong>\n                                    <i class=\"fa fa-plus\"></i>&nbsp;New\n                                </strong>\n                            </button>\n                        </div>\n                    </p-footer>\n                </p-dataTable>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [index_2.Service])
    ], TableComponent);
    return TableComponent;
}(base_component_1.BaseComponent));
exports.TableComponent = TableComponent;
//# sourceMappingURL=table.component.js.map