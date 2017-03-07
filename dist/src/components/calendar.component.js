"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var index_1 = require('../index');
var base_component_1 = require('./base.component');
var moment = require('moment');
var CalendarComponent = (function (_super) {
    __extends(CalendarComponent, _super);
    function CalendarComponent() {
        _super.apply(this, arguments);
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.readCommonsParameters(this.index);
        if (this.format.indexOf('YYYY') >= 0) {
            this.formatComp = this.format.split('YYYY').join('YY').toLowerCase();
        }
        if (typeof index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value == "object") {
            if (index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value == null) {
                this.date = new Date();
            }
            else {
                this.date = index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value;
            }
        }
        else {
            var dateStr = index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value;
            this.date = moment(dateStr, this.format).toDate();
        }
    };
    CalendarComponent.prototype.onSelect = function (newDate) {
        if (typeof index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value == "object") {
            index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = newDate;
        }
        else {
            var dateStr = moment(newDate).format(this.format);
            index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = dateStr;
        }
    };
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'calendarCrudRestful',
            template: "\n        <div class=\"row\">\n            <div class=\"col-md-{{colMdLeft}}\">    \n                <label>{{name}}</label>\n            </div>\n            <div class=\"col-md-{{colMdRigth}}\">    \n                <p-calendar [dateFormat]=\"formatComp\" [(ngModel)]=\"date\" [showIcon]=\"true\" (onSelect)=\"onSelect($event)\" [disabled]=\"disabled\" [readonlyInput]=\"readonly\"></p-calendar>\n            </div>            \n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarComponent);
    return CalendarComponent;
}(base_component_1.BaseComponent));
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map