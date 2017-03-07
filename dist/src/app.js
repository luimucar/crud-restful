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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var crud_module_1 = require('./crud.module');
var crud_component_1 = require('./crud.component');
var ng2_translate_1 = require('ng2-translate');
var scheduling_1 = require('./examples/scheduling');
var user_1 = require('./examples/user');
var login_1 = require('./examples/login');
var moment = require('moment');
var ng2_translate_2 = require('ng2-translate');
var decorators_1 = require('./decorators');
var primeng_module_1 = require('./primeng.module');
var App = (function () {
    function App(translate) {
        this.translate = translate;
        translate.addLangs(["en-en", "pt-br"]);
        translate.setDefaultLang('en-en');
        translate.use('en-en');
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
    App.prototype.test = function () {
        this.translate.use('pt-br');
        this.crudComponent.notify();
    };
    __decorate([
        core_1.ViewChild(crud_component_1.CrudComponent), 
        __metadata('design:type', crud_component_1.CrudComponent)
    ], App.prototype, "crudComponent", void 0);
    App = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <div style=\"width: 50%;\">\n        <crud [clazz]=\"'Login'\" (onSave)=\"handleOnSave($event)\" (onCancel)=\"handleOnCancel()\"></crud>\n      \n        <div class=\"row\" style=\"padding-top:20px;\">\n            <div class=\"col-md-12\">\n                <button pButton type=\"button\" (click)=\"test()\" label=\"Test\"></button>\n            </div>\n        </div>        \n    </div>\n  ",
        }), 
        __metadata('design:paramtypes', [ng2_translate_1.TranslateService])
    ], App);
    return App;
}());
exports.App = App;
function createTranslateLoader(http) {
    return new ng2_translate_2.TranslateStaticLoader(http, decorators_1.getI18nPath(), '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, crud_module_1.CrudModule, primeng_module_1.PrimeNgModule.forRoot(),
                ng2_translate_2.TranslateModule.forRoot({
                    provide: ng2_translate_2.TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [http_1.Http]
                })
            ],
            declarations: [App],
            bootstrap: [App],
            providers: [scheduling_1.Scheduling, user_1.User, login_1.Login]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.js.map