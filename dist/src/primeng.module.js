"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var primeng_3 = require("primeng/primeng");
var primeng_4 = require("primeng/primeng");
var primeng_5 = require("primeng/primeng");
var primeng_6 = require("primeng/primeng");
var primeng_7 = require("primeng/primeng");
var primeng_8 = require("primeng/primeng");
var primeng_9 = require("primeng/primeng");
var primeng_10 = require("primeng/primeng");
var primeng_11 = require("primeng/primeng");
var primeng_12 = require("primeng/primeng");
var primeng_13 = require("primeng/primeng");
var primeng_14 = require("primeng/primeng");
var primeng_15 = require("primeng/primeng");
var primeng_16 = require("primeng/primeng");
var primeng_17 = require("primeng/primeng");
var primeng_18 = require("primeng/primeng");
var primeng_19 = require("primeng/primeng");
var PrimeNgModule = PrimeNgModule_1 = (function () {
    function PrimeNgModule() {
    }
    PrimeNgModule.forRoot = function () {
        return {
            ngModule: PrimeNgModule_1
        };
    };
    return PrimeNgModule;
}());
PrimeNgModule = PrimeNgModule_1 = __decorate([
    core_1.NgModule({
        imports: [primeng_1.CalendarModule, primeng_2.DropdownModule, primeng_3.CheckboxModule, primeng_4.SliderModule, primeng_5.InplaceModule,
            primeng_6.InputMaskModule, primeng_7.TabViewModule, primeng_8.ConfirmDialogModule, primeng_10.DataTableModule, primeng_10.SharedModule,
            primeng_9.MultiSelectModule, primeng_12.PanelModule, primeng_13.TreeModule, primeng_14.ToggleButtonModule, primeng_15.InputSwitchModule,
            primeng_16.AccordionModule, primeng_17.InputTextModule, primeng_18.ButtonModule, primeng_19.ChipsModule],
        exports: [primeng_1.CalendarModule, primeng_2.DropdownModule, primeng_3.CheckboxModule, primeng_4.SliderModule, primeng_5.InplaceModule,
            primeng_6.InputMaskModule, primeng_7.TabViewModule, primeng_8.ConfirmDialogModule, primeng_10.DataTableModule, primeng_10.SharedModule,
            primeng_9.MultiSelectModule, primeng_12.PanelModule, primeng_13.TreeModule, primeng_14.ToggleButtonModule, primeng_15.InputSwitchModule,
            primeng_16.AccordionModule, primeng_17.InputTextModule, primeng_18.ButtonModule, primeng_19.ChipsModule],
        providers: [primeng_11.ConfirmationService]
    })
], PrimeNgModule);
exports.PrimeNgModule = PrimeNgModule;
var PrimeNgModule_1;
//# sourceMappingURL=primeng.module.js.map