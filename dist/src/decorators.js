"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CrudComponentObj = (function () {
    function CrudComponentObj(name, type, clazz) {
        this.name = name;
        this.type = type;
        this.clazz = clazz;
        this.value = null;
        this.clazzName = clazz.name;
    }
    CrudComponentObj.getComponents = function (clazzName) {
        var objs = [];
        if (CrudComponentObj.components.length > 0) {
            CrudComponentObj.components.forEach(function (obj) {
                if (obj.clazzName == clazzName) {
                    objs.push(obj);
                }
            });
        }
        return objs;
    };
    return CrudComponentObj;
}());
CrudComponentObj.components = [];
exports.CrudComponentObj = CrudComponentObj;
function getObject(clazz) {
    var ret = new clazz();
    CrudComponentObj.components.forEach(function (obj) {
        ret[obj.name] = obj.value;
    });
    return ret;
}
exports.getObject = getObject;
function InputType(clazz, inputType) {
    function actualDecorator(target, property) {
        CrudComponentObj.components.push(new CrudComponentObj(property, inputType, clazz));
    }
    return actualDecorator;
}
exports.InputType = InputType;
function SaveEndPoint(url) {
    function actualDecorator(constructor) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }
    return actualDecorator;
}
exports.SaveEndPoint = SaveEndPoint;
function MultiSelect(clazz, url, selectClazz, selectItemArray, selectItemValue, selectItemLabel) {
    function actualDecorator(target, property) {
        var crudComponentObj = new CrudComponentObj(property, 'MultiSelect', clazz);
        crudComponentObj.url = url;
        crudComponentObj.selectItemArray = selectItemArray;
        crudComponentObj.selectItemLabel = selectItemLabel;
        crudComponentObj.selectItemValue = selectItemValue;
        crudComponentObj.selectClazz = selectClazz;
        CrudComponentObj.components.push(crudComponentObj);
    }
    return actualDecorator;
}
exports.MultiSelect = MultiSelect;
function Chips(clazz) {
    function actualDecorator(target, property) {
        CrudComponentObj.components.push(new CrudComponentObj(property, 'Chips', clazz));
    }
    return actualDecorator;
}
exports.Chips = Chips;
function Select(clazz) {
    function actualDecorator(target, property) {
        CrudComponentObj.components.push(new CrudComponentObj(property, 'Select', clazz));
    }
    return actualDecorator;
}
exports.Select = Select;
//# sourceMappingURL=decorators.js.map