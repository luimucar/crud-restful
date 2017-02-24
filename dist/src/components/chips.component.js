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
var ChipsComponent = (function () {
    function ChipsComponent() {
    }
    ChipsComponent.prototype.ngOnInit = function () {
        index_1.CrudComponentObj.components[this.index].value = [];
        //this.value = CrudComponentObj.components[this.index].value;
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
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
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ChipsComponent.prototype, "index", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ChipsComponent.prototype, "name", void 0);
ChipsComponent = __decorate([
    core_1.Component({
        selector: 'inputText',
        template: "\n        <div class=\"col-md-4\">    \n            <label>{{name}}</label>\n        </div>\n        <div class=\"col-md-8\">    \n            <p-chips [(ngModel)]=\"values\" (onAdd)=\"add($event.value)\" (onRemove)=\"remove($event.value)\"></p-chips>\n        </div>            \n    "
    })
], ChipsComponent);
exports.ChipsComponent = ChipsComponent;
//# sourceMappingURL=chips.component.js.map