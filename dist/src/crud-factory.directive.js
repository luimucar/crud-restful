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
var input_component_1 = require("./components/input.component");
var multiselect_component_1 = require("./components/multiselect.component");
var chips_component_1 = require("./components/chips.component");
var select_component_1 = require("./components/select.component");
var CrudFactoryDirective = (function () {
    function CrudFactoryDirective(vcRef, resolver) {
        this.vcRef = vcRef;
        this.resolver = resolver;
        this.init = false;
    }
    CrudFactoryDirective.prototype.create = function (comp) {
        var factory = this.resolver.resolveComponentFactory(comp);
        var compRef = this.vcRef.createComponent(factory);
        compRef.instance.index = this.index;
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
    return CrudFactoryDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CrudFactoryDirective.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CrudFactoryDirective.prototype, "index", void 0);
CrudFactoryDirective = __decorate([
    core_1.Directive({
        selector: '[crud-factory]'
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef,
        core_1.ComponentFactoryResolver])
], CrudFactoryDirective);
exports.CrudFactoryDirective = CrudFactoryDirective;
//# sourceMappingURL=crud-factory.directive.js.map