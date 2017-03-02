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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../index");
var base_component_1 = require("./base.component");
var ChipsComponent = (function (_super) {
    __extends(ChipsComponent, _super);
    function ChipsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChipsComponent.prototype.ngOnInit = function () {
        this.readCommonsParameters(this.index);
        index_1.CrudComponentObj.components[this.index].value = [];
    };
    ChipsComponent.prototype.add = function (value) {
        index_1.CrudComponentObj.components[this.index].value.push(value);
    };
    ChipsComponent.prototype.remove = function (value) {
        var myArray = index_1.CrudComponentObj.components[this.index].value;
        for (var i = myArray.length - 1; i >= 0; i--) {
            if (myArray[i] == value) {
                myArray.splice(i, 1);
            }
        }
        index_1.CrudComponentObj.components[this.index].value = myArray;
    };
    return ChipsComponent;
}(base_component_1.BaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ChipsComponent.prototype, "index", void 0);
ChipsComponent = __decorate([
    core_1.Component({
        selector: 'inputText',
        template: "\n        <div class=\"row\">\n            <div class=\"col-md-4\">    \n                <label>{{name}}</label>\n            </div>\n            <div class=\"col-md-8\">    \n                <p-chips [(ngModel)]=\"values\" (onAdd)=\"add($event.value)\" (onRemove)=\"remove($event.value)\" (disabled)=\"true\"></p-chips>\n            </div>            \n        </div>\n    "
    })
], ChipsComponent);
exports.ChipsComponent = ChipsComponent;
//# sourceMappingURL=chips.component.js.map