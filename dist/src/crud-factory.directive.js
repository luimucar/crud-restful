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
var input_component_1 = require('./components/input.component');
var multiselect_component_1 = require('./components/multiselect.component');
var chips_component_1 = require('./components/chips.component');
var select_component_1 = require('./components/select.component');
var calendar_component_1 = require('./components/calendar.component');
var checkboxes_component_1 = require('./components/checkboxes.component');
var table_component_1 = require('./components/table.component');
var radioboxes_component_1 = require('./components/radioboxes.component');
var ng2_translate_1 = require('ng2-translate');
var CrudFactoryDirective = (function () {
    function CrudFactoryDirective(vcRef, resolver, translate) {
        this.vcRef = vcRef;
        this.resolver = resolver;
        this.translate = translate;
        this.init = false;
    }
    CrudFactoryDirective.prototype.create = function (comp) {
        var factory = this.resolver.resolveComponentFactory(comp);
        var compRef = this.vcRef.createComponent(factory);
        compRef.instance.index = this.index;
        compRef.instance.clazzName = this.clazzName;
        compRef.instance.translate = this.translate;
        compRef.instance.broadcast = this.broadcast;
        if (this.model != undefined) {
            compRef.instance.model = this.model;
        }
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        this.componentRef = compRef;
        this.init = true;
    };
    CrudFactoryDirective.prototype.ngOnChanges = function (changes) {
        if (this.init)
            return;
        var comp;
        if (this.type == 'InputType') {
            comp = input_component_1.InputTextComponent;
        }
        else if (this.type == 'MultiSelect') {
            comp = multiselect_component_1.MultiSelectComponent;
        }
        else if (this.type == 'Chips') {
            comp = chips_component_1.ChipsComponent;
        }
        else if (this.type == 'Select') {
            comp = select_component_1.SelectComponent;
        }
        else if (this.type == 'Calendar') {
            comp = calendar_component_1.CalendarComponent;
        }
        else if (this.type == 'Checkboxes') {
            comp = checkboxes_component_1.CheckboxesComponent;
        }
        else if (this.type == 'Table') {
            comp = table_component_1.TableComponent;
        }
        else if (this.type == 'Radioboxes') {
            comp = radioboxes_component_1.RadioboxesComponent;
        }
        if (comp) {
            this.create(comp);
        }
    };
    CrudFactoryDirective.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CrudFactoryDirective.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CrudFactoryDirective.prototype, "index", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CrudFactoryDirective.prototype, "clazzName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CrudFactoryDirective.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CrudFactoryDirective.prototype, "broadcast", void 0);
    CrudFactoryDirective = __decorate([
        core_1.Directive({
            selector: '[crud-factory]'
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.ComponentFactoryResolver, ng2_translate_1.TranslateService])
    ], CrudFactoryDirective);
    return CrudFactoryDirective;
}());
exports.CrudFactoryDirective = CrudFactoryDirective;
//# sourceMappingURL=crud-factory.directive.js.map