"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CrudEndPoint = (function () {
    function CrudEndPoint() {
    }
    CrudEndPoint.getEndPoint = function (clazzName, type) {
        var endPoint = undefined;
        if (CrudEndPoint.endPoints.length > 0) {
            CrudEndPoint.endPoints.forEach(function (endP) {
                if (endP.clazz == clazzName) {
                    if (type == 'create') {
                        endPoint = endP.createEndP;
                    }
                    else if (type == 'read') {
                        endPoint = endP.readEndP;
                    }
                    else if (type == 'update') {
                        endPoint = endP.updateEndP;
                    }
                    else if (type == 'delete') {
                        endPoint = endP.deleteEndP;
                    }
                }
            });
        }
        return endPoint;
    };
    return CrudEndPoint;
}());
CrudEndPoint.endPoints = [];
exports.CrudEndPoint = CrudEndPoint;
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
function EndPoint(parameters) {
    var createEndP = parameters['Create'];
    var readEndP = parameters['Read'];
    var updateEndP = parameters['Update'];
    var deleteEndP = parameters['Delete'];
    function actualDecorator(constructor) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
        var crudEndPoint = new CrudEndPoint();
        crudEndPoint.clazz = constructor;
        crudEndPoint.createEndP = createEndP;
        crudEndPoint.readEndP = readEndP;
        crudEndPoint.updateEndP = updateEndP;
        crudEndPoint.deleteEndP = deleteEndP;
        CrudEndPoint.endPoints.push(crudEndPoint);
    }
    return actualDecorator;
}
exports.EndPoint = EndPoint;
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
function Calendar(parameters) {
    var name = parameters['name'];
    var disabled = parameters['disabled'];
    var order = parameters['order'];
    var autoWidth = parameters['autoWidth'];
    var width = parameters['width'];
    var colMdLeft = parameters['colMdLeft'];
    var colMdRigth = parameters['colMdRigth'];
    var focus = parameters['focus'];
    var format = parameters['format'];
    function actualDecorator(target, property) {
        if (name == undefined) {
            name = property;
        }
        var component = new CrudComponentObj(property, name, 'Calendar', target.constructor);
        component.disabled = disabled;
        component.order = order;
        component.autoWidth = autoWidth;
        component.width = width;
        component.colMdLeft = colMdLeft;
        component.colMdRigth = colMdRigth;
        component.focus = focus;
        component.format = format;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.Calendar = Calendar;
//# sourceMappingURL=decorators.js.map