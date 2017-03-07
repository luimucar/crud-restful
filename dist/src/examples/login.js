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
var index_1 = require('../index');
var Login = (function () {
    function Login() {
    }
    __decorate([
        index_1.InputType({
            name: 'Id',
            type: 'text',
            readOnly: true,
            disabled: true,
            autoWidth: true,
            order: 1,
            tableColumn: 0,
            sortable: true
        }), 
        __metadata('design:type', Number)
    ], Login.prototype, "id", void 0);
    __decorate([
        index_1.InputType({
            name: 'Email',
            type: 'text',
            autoWidth: true,
            order: 2,
            tableColumn: 1,
            sortable: true
        }), 
        __metadata('design:type', String)
    ], Login.prototype, "name", void 0);
    __decorate([
        index_1.InputType({
            name: 'Full Name',
            type: 'text',
            autoWidth: true,
            order: 3,
            tableColumn: 2,
            sortable: true
        }), 
        __metadata('design:type', String)
    ], Login.prototype, "fullname", void 0);
    Login = __decorate([
        index_1.Table({
            name: 'tableUser',
            url: 'http://www.mocky.io/v2/58bdc0e10f0000c3255c6857',
            order: 0
        }), 
        __metadata('design:paramtypes', [])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map