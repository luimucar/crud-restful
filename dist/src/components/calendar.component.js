"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../index");
var base_component_1 = require("./base.component");
var CalendarComponent = (function (_super) {
    __extends(CalendarComponent, _super);
    function CalendarComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.readCommonsParameters(this.index);
    };
    CalendarComponent.prototype.onSelect = function (value) {
        index_1.CrudComponentObj.getComponents(this.clazzName)[this.index].value = value;
    };
    return CalendarComponent;
}(base_component_1.BaseComponent));
CalendarComponent = __decorate([
    core_1.Component({
        selector: 'calendarCrudRestful',
        template: "\n        <div class=\"row\">\n            <div class=\"col-md-2\">    \n                <label>{{name}}</label>\n            </div>\n            <div class=\"col-md-10\">    \n                <p-calendar [(ngModel)]=\"date1\" [showIcon]=\"true\" (onSelect)=\"onSelect($event)\" [disabled]=\"disabled\" [readonlyInput]=\"readonly\"></p-calendar>\n            </div>            \n        </div>\n    "
    })
], CalendarComponent);
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map