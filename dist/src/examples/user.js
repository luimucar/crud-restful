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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var index_1 = require('../index');
var User = (function () {
    function User(username, password, token) {
        this.username = username;
        this.password = password;
        this.token = token;
    }
    __decorate([
        index_1.InputType({
            name: 'Password',
            type: 'password',
            autoWidth: true,
            order: 2
        }), 
        __metadata('design:type', Object)
    ], User.prototype, "passwordConfirmation", void 0);
    User = __decorate([
        core_1.Injectable(),
        index_1.Table({
            name: 'tableUser',
            url: 'http://www.mocky.io/v2/58bdb28e0f000082245c6832',
            order: 0
        }),
        __param(0, index_1.InputType({
            name: 'User',
            type: 'text',
            autoWidth: true,
            order: 1,
            tableColumn: 0,
            sortable: true
        })),
        __param(1, index_1.InputType({
            name: 'Confirmation',
            type: 'password',
            autoWidth: true,
            order: 3
        })), 
        __metadata('design:paramtypes', [String, String, String])
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map