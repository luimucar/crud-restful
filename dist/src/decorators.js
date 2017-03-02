"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CrudComponentObj = (function () {
    function CrudComponentObj(name, type, clazz, defaultValue) {
        this.name = name;
        this.type = type;
        this.clazz = clazz;
        this.defaultValue = defaultValue;
        this.values = null;
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
function SaveEndPoint(url) {
    function actualDecorator(constructor) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }
    return actualDecorator;
}
exports.SaveEndPoint = SaveEndPoint;
function InputType(parameters) {
    var name = parameters['name'];
    var inputType = parameters['type'];
    var clazz = parameters['model'];
    var defaultValue = parameters['defaultValue'];
    var readOnly = parameters['readOnly'];
    var disabled = parameters['disabled'];
    function actualDecorator(target, property) {
        if (name == undefined) {
            name = property;
        }
        var component = new CrudComponentObj(name, 'InputType', clazz, defaultValue);
        component.inputType = inputType;
        component.readOnly = readOnly;
        component.disabled = disabled;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.InputType = InputType;
function MultiSelect(parameters) {
    var name = parameters['name'];
    var clazz = parameters['model'];
    var url = parameters['url'];
    var selectItemArray = parameters['modelSelect'];
    var selectItemLabel = parameters['modelSelectLabel'];
    var selectItemValue = parameters['modelSelectValue'];
    var selectClazz = parameters['modelSelectClazz'];
    function actualDecorator(target, property) {
        if (name == undefined) {
            name = property;
        }
        var crudComponentObj = new CrudComponentObj(name, 'MultiSelect', clazz);
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
function Chips(parameters) {
    var name = parameters['name'];
    var clazz = parameters['model'];
    function actualDecorator(target, property) {
        if (name == undefined) {
            name = property;
        }
        CrudComponentObj.components.push(new CrudComponentObj(name, 'Chips', clazz));
    }
    return actualDecorator;
}
exports.Chips = Chips;
function Select(parameters) {
    var name = parameters['name'];
    var clazz = parameters['model'];
    var values = parameters['values'];
    function actualDecorator(target, property) {
        if (name == undefined) {
            name = property;
        }
        var crudComponentObj = new CrudComponentObj(name, 'Select', clazz);
        crudComponentObj.values = values;
        CrudComponentObj.components.push(crudComponentObj);
    }
    return actualDecorator;
}
exports.Select = Select;
//# sourceMappingURL=decorators.js.map