"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var crud_component_1 = require("./crud.component");
var primeng_module_1 = require("./primeng.module");
var crud_factory_directive_1 = require("./crud-factory.directive");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var input_component_1 = require("./components/input.component");
var multiselect_component_1 = require("./components/multiselect.component");
var chips_component_1 = require("./components/chips.component");
var select_component_1 = require("./components/select.component");
var ng2_translate_1 = require("ng2-translate");
var decorators_1 = require("./decorators");
function createTranslateLoader(http) {
    return new ng2_translate_1.TranslateStaticLoader(http, decorators_1.getI18nPath(), '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var CrudModule = (function () {
    function CrudModule() {
    }
    return CrudModule;
}());
CrudModule = __decorate([
    core_1.NgModule({
        declarations: [crud_component_1.CrudComponent, crud_factory_directive_1.CrudFactoryDirective, input_component_1.InputTextComponent, multiselect_component_1.MultiSelectComponent, chips_component_1.ChipsComponent, select_component_1.SelectComponent],
        imports: [forms_2.ReactiveFormsModule, forms_1.FormsModule, http_1.HttpModule, platform_browser_1.BrowserModule, router_1.RouterModule, primeng_module_1.PrimeNgModule.forRoot(),
            ng2_translate_1.TranslateModule.forRoot({
                provide: ng2_translate_1.TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [http_1.Http]
            }),
        ],
        exports: [crud_component_1.CrudComponent],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        entryComponents: [input_component_1.InputTextComponent, multiselect_component_1.MultiSelectComponent, chips_component_1.ChipsComponent, select_component_1.SelectComponent]
    })
], CrudModule);
exports.CrudModule = CrudModule;
//# sourceMappingURL=crud.module.js.map