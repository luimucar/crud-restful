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
var platform_browser_1 = require("@angular/platform-browser");
var crud_module_1 = require("./crud.module");
var scheduling_1 = require("./examples/scheduling");
var user_1 = require("./examples/user");
var moment = require("moment");
var App = (function () {
    function App() {
        this.scheduling = new scheduling_1.Scheduling();
        this.scheduling.name = 'Teste';
        this.scheduling.period = '3';
        this.scheduling.date1 = '01/01/2017';
        this.scheduling.date2 = moment("15/05/1979", "DD/MM/YYYY").toDate();
        this.user = new user_1.User('Cláudio');
        this.user.password = '123';
        this.user.passwordConfirmation = '123';
    }
    App.prototype.handleOnSave = function (user) {
        console.log(user);
    };
    App.prototype.handleOnCancel = function () {
        console.log('Cancel');
    };
    return App;
}());
App = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <div style=\"width: 50%;\">\n      <crud [clazz]=\"'Scheduling'\" [model]=\"scheduling\" (onSave)=\"handleOnSave($event)\" (onCancel)=\"handleOnCancel()\"></crud>\n    </div>\n  ",
    }),
    __metadata("design:paramtypes", [])
], App);
exports.App = App;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, crud_module_1.CrudModule],
        declarations: [App],
        bootstrap: [App],
        providers: [scheduling_1.Scheduling, user_1.User]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.js.map