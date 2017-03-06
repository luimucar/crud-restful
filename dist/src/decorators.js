"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration = (function () {
    function Configuration() {
    }
    return Configuration;
}());
Configuration.i18nPath = './assets/i18n';
exports.Configuration = Configuration;
var CrudComponentObj = (function () {
    function CrudComponentObj(property, name, type, clazz, defaultValue) {
        this.property = property;
        this.name = name;
        this.type = type;
        this.clazz = clazz;
        this.defaultValue = defaultValue;
        this.values = null;
        this.value = null;
        this.clazzName = clazz.name;
    }
    CrudComponentObj.prototype.sort = function () {
        return function (left, right) {
            if (left.order < right.order) {
                return -1;
            }
            else if (left.order > right.order) {
                return 1;
            }
            return 0;
        };
    };
    CrudComponentObj.getComponents = function (clazzName) {
        var objs = [];
        if (CrudComponentObj.components.length > 0) {
            CrudComponentObj.components.forEach(function (obj) {
                if (obj.clazzName == clazzName) {
                    objs.push(obj);
                }
            });
        }
        objs = objs.sort(function (o1, o2) {
            if (o1.order > o2.order) {
                return 1;
            }
            if (o1.order < o2.order) {
                return -1;
            }
            return 0;
        });
        return objs;
    };
    return CrudComponentObj;
}());
CrudComponentObj.components = [];
exports.CrudComponentObj = CrudComponentObj;
function setObject(clazzName, object) {
    if (object != undefined) {
        CrudComponentObj.components.forEach(function (obj) {
            if (obj.clazzName == clazzName) {
                if (object[obj.property]) {
                    obj['value'] = object[obj.property];
                }
                //console.log(obj);
            }
        });
    }
}
exports.setObject = setObject;
function getObject(clazzName) {
    var ret = new clazzName();
    CrudComponentObj.components.forEach(function (obj) {
        if (obj.clazzName == clazzName.name) {
            ret[obj.property] = obj.value;
        }
    });
    return ret;
}
exports.getObject = getObject;
function getI18nPath() {
    return Configuration.i18nPath;
}
exports.getI18nPath = getI18nPath;
function Configure(parameters) {
    var i18nPath = parameters['i18nPath'];
    function actualDecorator(constructor) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
        Configuration.i18nPath = i18nPath;
    }
    return actualDecorator;
}
exports.Configure = Configure;
function Id() {
    function actualDecorator(target, property) {
        var component = new CrudComponentObj(property, property, 'Id', target.constructor);
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.Id = Id;
function getProperty(target, parameterIndex) {
    var parametersConstructor = target.toString();
    var parametersArray = parametersConstructor.substring(parametersConstructor.indexOf('{') + 1, parametersConstructor.indexOf('}')).trim().replace(/\n/g, '').split(';');
    var parametersArrayClean = [];
    parametersArray.forEach(function (parameter) {
        if (parameter != "") {
            parametersArrayClean.push(parameter.trim());
        }
    });
    return parametersArrayClean[parameterIndex].substring(parametersArrayClean[parameterIndex].indexOf('=') + 1).trim();
}
function InputType(parameters) {
    var name = parameters['name'];
    var inputType = parameters['type'];
    var defaultValue = parameters['defaultValue'];
    var readOnly = parameters['readOnly'];
    var disabled = parameters['disabled'];
    var order = parameters['order'];
    var autoWidth = parameters['autoWidth'];
    var width = parameters['width'];
    var colMdLeft = parameters['colMdLeft'];
    var colMdRigth = parameters['colMdRigth'];
    var focus = parameters['focus'];
    function actualDecorator(target, property, parameterIndex) {
        if (name == undefined) {
            name = property;
        }
        var construct = target.constructor;
        if (property == undefined) {
            property = getProperty(target, parameterIndex);
            construct = target;
        }
        var component = new CrudComponentObj(property, name, 'InputType', construct, defaultValue);
        component.inputType = inputType;
        component.readOnly = readOnly;
        component.disabled = disabled;
        component.order = order;
        component.autoWidth = autoWidth;
        component.width = width;
        component.colMdLeft = colMdLeft;
        component.colMdRigth = colMdRigth;
        component.focus = focus;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.InputType = InputType;
function MultiSelect(parameters) {
    var name = parameters['name'];
    var url = parameters['url'];
    var selectItemArray = parameters['modelSelect'];
    var selectItemLabel = parameters['modelSelectLabel'];
    var selectItemValue = parameters['modelSelectValue'];
    var selectClazz = parameters['modelSelectClazz'];
    var disabled = parameters['disabled'];
    var order = parameters['order'];
    var autoWidth = parameters['autoWidth'];
    var width = parameters['width'];
    var colMdLeft = parameters['colMdLeft'];
    var colMdRigth = parameters['colMdRigth'];
    var focus = parameters['focus'];
    function actualDecorator(target, property) {
        if (name == undefined) {
            name = property;
        }
        var component = new CrudComponentObj(property, name, 'MultiSelect', target.constructor);
        component.url = url;
        component.selectItemArray = selectItemArray;
        component.selectItemLabel = selectItemLabel;
        component.selectItemValue = selectItemValue;
        component.selectClazz = selectClazz;
        component.disabled = disabled;
        component.order = order;
        component.autoWidth = autoWidth;
        component.width = width;
        component.colMdLeft = colMdLeft;
        component.colMdRigth = colMdRigth;
        component.focus = focus;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.MultiSelect = MultiSelect;
function Chips(parameters) {
    var name = parameters['name'];
    var disabled = parameters['disabled'];
    var order = parameters['order'];
    var autoWidth = parameters['autoWidth'];
    var width = parameters['width'];
    var colMdLeft = parameters['colMdLeft'];
    var colMdRigth = parameters['colMdRigth'];
    var focus = parameters['focus'];
    function actualDecorator(target, property) {
        if (name == undefined) {
            name = property;
        }
        var component = new CrudComponentObj(property, name, 'Chips', target.constructor);
        component.disabled = disabled;
        component.order = order;
        component.autoWidth = autoWidth;
        component.width = width;
        component.colMdLeft = colMdLeft;
        component.colMdRigth = colMdRigth;
        component.focus = focus;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.Chips = Chips;
function Select(parameters) {
    var name = parameters['name'];
    var values = parameters['values'];
    var disabled = parameters['disabled'];
    var defaultValue = parameters['defaultValue'];
    var order = parameters['order'];
    var autoWidth = parameters['autoWidth'];
    var width = parameters['width'];
    var colMdLeft = parameters['colMdLeft'];
    var colMdRigth = parameters['colMdRigth'];
    var focus = parameters['focus'];
    function actualDecorator(target, property) {
        if (name == undefined) {
            name = property;
        }
        var component = new CrudComponentObj(property, name, 'Select', target.constructor);
        component.values = values;
        component.disabled = disabled;
        component.defaultValue = defaultValue;
        component.order = order;
        component.autoWidth = autoWidth;
        component.width = width;
        component.colMdLeft = colMdLeft;
        component.colMdRigth = colMdRigth;
        component.focus = focus;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.Select = Select;
//# sourceMappingURL=decorators.js.map