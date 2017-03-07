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
var index_1 = require('./index');
var index_2 = require('./services/index');
var concrete_subject_1 = require('./components/observer/concrete-subject');
var CrudComponent = (function () {
    function CrudComponent(service) {
        this.service = service;
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.concreteSubject = concrete_subject_1.ConcreteSubject.getInstance();
    }
    CrudComponent.prototype.ngOnInit = function () {
        this.components = index_1.CrudComponentObj.getComponents(this.clazz);
        index_1.setObject(this.clazz, this.model);
        //console.log(this.components);
    };
    CrudComponent.prototype.save = function () {
        if (this.components.length > 0) {
            var obj = index_1.getObject(this.components[0].clazz);
            this.onSave.emit(obj);
        }
    };
    CrudComponent.prototype.cancel = function () {
        this.onCancel.emit();
    };
    CrudComponent.prototype.notify = function () {
        this.concreteSubject.notify("BASE-COMPONENT");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CrudComponent.prototype, "clazz", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CrudComponent.prototype, "model", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CrudComponent.prototype, "onSave", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CrudComponent.prototype, "onCancel", void 0);
    CrudComponent = __decorate([
        core_1.Component({
            selector: 'crud',
            templateUrl: './crud.html',
            providers: [index_2.Service]
        }), 
        __metadata('design:paramtypes', [index_2.Service])
    ], CrudComponent);
    return CrudComponent;
}());
exports.CrudComponent = CrudComponent;
//# sourceMappingURL=crud.component.js.map