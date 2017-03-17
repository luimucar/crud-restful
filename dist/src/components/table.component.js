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
var http_1 = require('@angular/http');
var $ = require('jquery');
var TableComponent = (function (_super) {
    __extends(TableComponent, _super);
    function TableComponent(service, http) {
        _super.call(this);
        this.service = service;
        this.http = http;
        this.cols = [];
        this.itens = [];
        this.broadcast = new core_1.EventEmitter();
    }
    TableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.readCommonsParameters(this.index);
        this.loadData();
        if (this.broadcast != undefined) {
            this.broadcast.subscribe(function () {
                _this.readCommonsParameters(_this.index);
                _this.loadData();
            });
        }
    };
    TableComponent.prototype.loadData = function () {
        var _this = this;
        this.cols = [];
        this.itens = [];
        setTimeout(function () {
            var emptyMessage = _this.translate.instant(_this.emptyMessage);
            $('.ui-datatable-emptymessage').html(emptyMessage);
        }, 50);
        index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = [];
        index_1.CrudComponentObj.getComponents(this.clazzName).forEach(function (comp) {
            if (comp.tableColumn != undefined && comp.tableColumn >= 0) {
                setTimeout(function () {
                    var name = comp.name;
                    if (comp.translateKey) {
                        name = _this.translate.instant(comp.translateKey);
                    }
                    _this.cols.push({ field: comp.property, header: name, sortable: comp.sortable, order: comp.tableColumn });
                }, 50);
            }
        });
        this.cols = this.cols.sort(function (o1, o2) {
            if (o1.order > o2.order) {
                return 1;
            }
            if (o1.order < o2.order) {
                return -1;
            }
            return 0;
        });
        var crudComponentObj = index_1.CrudComponentObj.getComponents(this.clazzName)[this.index];
        setTimeout(function () {
            if (crudComponentObj.fileConfig != undefined) {
                _this.http.get(_this.fileConfig).map(function (res) { return res.json(); })
                    .subscribe(function (config) {
                    var keys = _this.fileConfigServerKey.split('.');
                    var server = null;
                    keys.forEach(function (key) {
                        if (server == null) {
                            server = config[key];
                        }
                        else {
                            server = server[key];
                        }
                    });
                    _this.getItens(server + crudComponentObj.url)
                        .subscribe(function (itens) {
                        itens.forEach(function (item) {
                            _this.itens.push(item);
                        });
                    }, function (error) {
                        console.log(error);
                    }, function () {
                        _this.sort(crudComponentObj);
                    });
                });
            }
            else {
                _this.getItens(crudComponentObj.url)
                    .subscribe(function (itens) {
                    itens.forEach(function (item) {
                        _this.itens.push(item);
                    });
                }, function (error) {
                    console.log(error);
                }, function () {
                    _this.sort(crudComponentObj);
                });
            }
        }, 100);
    };
    TableComponent.prototype.sort = function (crudComponentObj) {
        this.itens.sort(function (o1, o2) {
            if (crudComponentObj.sortOrder == 1) {
                if (o1[crudComponentObj.sortField] > o2[crudComponentObj.sortField]) {
                    return 1;
                }
                if (o1[crudComponentObj.sortField] < o2[crudComponentObj.sortField]) {
                    return -1;
                }
            }
            else {
                if (o1[crudComponentObj.sortField] < o2[crudComponentObj.sortField]) {
                    return 1;
                }
                if (o1[crudComponentObj.sortField] > o2[crudComponentObj.sortField]) {
                    return -1;
                }
            }
            return 0;
        });
    };
    TableComponent.prototype.getItens = function (url) {
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
        base_component_1.BaseComponent.showOrHideComponets(this.clazzName, 'block');
        if (this.autoHide) {
            $('#table' + this.clazzName + this.index).css("display", "none");
        }
        base_component_1.BaseComponent.setShowRemove(this.clazzName, true);
        this.concreteSubject.notify('CRUD-COMPONENT');
    };
    TableComponent.prototype.newItem = function (dt) {
        this.dt = dt;
        index_1.CrudComponentObj.getComponents(this.clazzName).forEach(function (comp) {
            comp.value = null;
            $('#' + comp.clazzName + '_' + comp.property).val(null);
        });
        if (this.autoHide) {
            $('#table' + this.clazzName + this.index).css("display", "none");
        }
        base_component_1.BaseComponent.showOrHideComponets(this.clazzName, 'block');
        base_component_1.BaseComponent.setShowRemove(this.clazzName, false);
        base_component_1.BaseComponent.setHideMsgError(this.clazzName, true);
        this.concreteSubject.notify('CRUD-COMPONENT');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableComponent.prototype, "broadcast", void 0);
    TableComponent = __decorate([
        core_1.Component({
            selector: 'tableCrudRestful',
            template: "\n        <div class=\"row\" id=\"table{{clazzName}}{{index}}\" style=\"margin-top : 20px; margin-bottom : 20px;\">\n            <div class=\"col-md-12\">\n                <p-dataTable #dt id=\"table\" [value]=\"itens\" selectionMode=\"single\" [(selection)]=\"selected\" (onRowSelect)=\"onRowSelect($event)\" \n                    [sortField]=\"sortField\" [sortOrder]=\"sortOrder\"\n                    [rows]=\"rows\" [paginator]=\"paginator\" [pageLinks]=\"pageLinks\" [responsive]=\"true\">\n                    <p-column *ngFor=\"let col of cols\" [field]=\"col.field\" [header]=\"col.header\" [sortable]=\"col.sortable\"></p-column>\n                    <p-footer>\n                        <div class=\"ui-helper-clearfix\" style=\"width:100%\">\n                            <button class=\"btn btn-primary btn-margin-vertical pull-left\" type=\"button\" (click)=\"newItem(dt)\" style=\"margin-top: 5px;\">\n                                <strong>\n                                    <i class=\"fa fa-plus\"></i>&nbsp;{{ 'COMMON.BUTTON.ADD' | translate }}\n                                </strong>\n                            </button>\n                        </div>\n                    </p-footer>\n                </p-dataTable>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [index_2.Service, http_1.Http])
    ], TableComponent);
    return TableComponent;
}(base_component_1.BaseComponent));
exports.TableComponent = TableComponent;
//# sourceMappingURL=table.component.js.map