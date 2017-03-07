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
var router_1 = require("@angular/router");
var crud_component_1 = require('./crud.component');
var primeng_module_1 = require('./primeng.module');
var crud_factory_directive_1 = require('./crud-factory.directive');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var forms_2 = require('@angular/forms');
var input_component_1 = require('./components/input.component');
var multiselect_component_1 = require('./components/multiselect.component');
var chips_component_1 = require('./components/chips.component');
var select_component_1 = require('./components/select.component');
var calendar_component_1 = require('./components/calendar.component');
var checkboxes_component_1 = require('./components/checkboxes.component');
var table_component_1 = require('./components/table.component');
var ng2_translate_1 = require('ng2-translate');
var concrete_subject_1 = require('./components/observer/concrete-subject');
var CrudModule = (function () {
    function CrudModule() {
    }
    CrudModule = __decorate([
        core_1.NgModule({
            declarations: [crud_component_1.CrudComponent, crud_factory_directive_1.CrudFactoryDirective, input_component_1.InputTextComponent,
                multiselect_component_1.MultiSelectComponent, chips_component_1.ChipsComponent, select_component_1.SelectComponent,
                calendar_component_1.CalendarComponent, checkboxes_component_1.CheckboxesComponent, table_component_1.TableComponent],
            imports: [forms_2.ReactiveFormsModule, forms_1.FormsModule, http_1.HttpModule, platform_browser_1.BrowserModule, router_1.RouterModule, primeng_module_1.PrimeNgModule.forRoot(), ng2_translate_1.TranslateModule,
            ],
            exports: [crud_component_1.CrudComponent],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            entryComponents: [input_component_1.InputTextComponent, multiselect_component_1.MultiSelectComponent, chips_component_1.ChipsComponent,
                select_component_1.SelectComponent, calendar_component_1.CalendarComponent, checkboxes_component_1.CheckboxesComponent, table_component_1.TableComponent],
            providers: [concrete_subject_1.ConcreteSubject]
        }), 
        __metadata('design:paramtypes', [])
    ], CrudModule);
    return CrudModule;
}());
exports.CrudModule = CrudModule;
//# sourceMappingURL=crud.module.js.map