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
var index_1 = require("../index");
var Report = (function () {
    function Report(id) {
        this.id = id;
    }
    return Report;
}());
exports.Report = Report;
var CarPark = (function () {
    function CarPark() {
    }
    return CarPark;
}());
exports.CarPark = CarPark;
var Scheduling = (function () {
    function Scheduling() {
    }
    return Scheduling;
}());
__decorate([
    index_1.Id(),
    __metadata("design:type", Number)
], Scheduling.prototype, "id", void 0);
__decorate([
    index_1.InputType({
        name: 'User:',
        type: 'text',
        defaultValue: 'Cláudio Margulhano',
        readOnly: true
    }),
    __metadata("design:type", String)
], Scheduling.prototype, "name", void 0);
__decorate([
    index_1.InputType({
        name: 'Password:',
        type: 'password',
        defaultValue: '123'
    }),
    __metadata("design:type", String)
], Scheduling.prototype, "password", void 0);
__decorate([
    index_1.InputType({
        name: 'Admin:',
        type: 'checkbox',
        defaultValue: true
    }),
    __metadata("design:type", Boolean)
], Scheduling.prototype, "admin", void 0);
__decorate([
    index_1.MultiSelect({
        url: 'http://www.mocky.io/v2/58822b002800002d05cbd40d',
        modelSelect: 'reportList',
        modelSelectClazz: Report,
        modelSelectValue: 'id',
        modelSelectLabel: 'name',
        disabled: true
    }),
    __metadata("design:type", Array)
], Scheduling.prototype, "reports", void 0);
__decorate([
    index_1.Chips({
        disabled: false
    }),
    __metadata("design:type", Array)
], Scheduling.prototype, "mails", void 0);
__decorate([
    index_1.MultiSelect({
        url: 'http://www.mocky.io/v2/583ecaf7240000f20383b35d',
        modelSelectClazz: CarPark,
        modelSelectValue: 'id',
        modelSelectLabel: 'name'
    }),
    __metadata("design:type", Array)
], Scheduling.prototype, "carParks", void 0);
__decorate([
    index_1.Select({
        values: [{ "value": 1, "label": "Value 1" }, { "value": 2, "label": "Value 2" }, { "value": 3, "label": "Value 3" }],
        defaultValue: 2
    }),
    __metadata("design:type", String)
], Scheduling.prototype, "period", void 0);
Scheduling = __decorate([
    core_1.Injectable(),
    index_1.EndPoint({
        Create: 'http://requestb.in/10h1r4i1',
        Read: '',
        Update: '',
        Delete: ''
    }),
    __metadata("design:paramtypes", [])
], Scheduling);
exports.Scheduling = Scheduling;
//# sourceMappingURL=scheduling.js.map