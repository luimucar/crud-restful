"use strict";
var Item = (function () {
    function Item(value, label, checked) {
        this.value = value;
        this.label = label;
        this.checked = checked;
    }
    return Item;
}());
exports.Item = Item;
var Configuration = (function () {
    function Configuration() {
    }
    Configuration.i18nPath = './assets/i18n';
    Configuration.tableLess = new Map();
    return Configuration;
}());
exports.Configuration = Configuration;
var CrudComponentObj = (function () {
    function CrudComponentObj(property, name, type, clazz, defaultValue) {
        this.property = property;
        this.name = name;
        this.type = type;
        this.clazz = clazz;
        this.defaultValue = defaultValue;
        this.index = 0;
        this.values = null;
        this.value = null;
        this.order = 0;
        this.translateKey = undefined;
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
    CrudComponentObj.components = [];
    return CrudComponentObj;
}());
exports.CrudComponentObj = CrudComponentObj;
function setObject(clazzName, object) {
    if (object != undefined) {
        CrudComponentObj.components.forEach(function (obj) {
            if (obj.clazzName == clazzName) {
                if (object[obj.property]) {
                    obj['value'] = object[obj.property];
                }
            }
        });
    }
}
exports.setObject = setObject;
function getObject(clazzName) {
    var ret = new clazzName();
    CrudComponentObj.components.forEach(function (obj) {
        if (obj.clazzName == clazzName.name) {
            if (obj.targetProperty != undefined) {
                var target = obj.targetProperty;
                ret[target] = obj.targetPropertyValue;
            }
            ret[obj.property] = obj.value;
        }
    });
    return Object.assign(new clazzName(), ret);
}
exports.getObject = getObject;
function getI18nPath() {
    return Configuration.i18nPath;
}
exports.getI18nPath = getI18nPath;
function Configure(parameters) {
    var i18nPath = parameters['i18nPath'];
    var confirmMessageKey = parameters['confirmMessageKey'];
    var confirmTitleMessageKey = parameters['confirmTitleMessageKey'];
    function actualDecorator(constructor) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
        Configuration.i18nPath = i18nPath;
        Configuration.confirmMessageKey = confirmMessageKey;
        Configuration.confirmTitleMessageKey = confirmTitleMessageKey;
        Configuration.tableLess.set(constructor['name'], true);
    }
    return actualDecorator;
}
exports.Configure = Configure;
function Table(parameters) {
    var name = parameters['name'];
    var url = parameters['url'];
    var order = parameters['order'];
    var rows = parameters['rows'];
    var paginator = parameters['paginator'];
    var pageLinks = parameters['pageLinks'];
    var sortField = parameters['sortField'];
    var sortOrder = parameters['sortOrder'];
    var emptyMessage = parameters['emptyMessageKey'];
    var fileConfig = parameters['fileConfig'];
    var fileConfigServerKey = parameters['fileConfigServerKey'];
    var autoHide = parameters['autoHide'];
    var style = parameters['style'];
    function actualDecorator(constructor) {
        Configuration.tableLess.set(constructor['name'], false);
        var component = new CrudComponentObj(name, name, 'Table', constructor);
        component.name = name;
        component.url = url;
        component.order = order;
        component.rows = rows;
        component.paginator = paginator;
        component.pageLinks = pageLinks;
        component.sortField = sortField;
        component.sortOrder = sortOrder;
        component.emptyMessage = emptyMessage;
        component.fileConfig = fileConfig;
        component.fileConfigServerKey = fileConfigServerKey;
        component.autoHide = autoHide;
        component.style = style;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.Table = Table;
function Id(parameters) {
    var order = parameters['order'];
    function actualDecorator(target, property) {
        var component = new CrudComponentObj(property, property, 'Id', target.constructor);
        component.order = order;
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
    var translateKey = parameters['translateKey'];
    var tableColumn = parameters['tableColumn'];
    var sortable = parameters['sortable'];
    var required = parameters['required'];
    var requiredMessage = parameters['requiredMessage'];
    var requiredMessageKey = parameters['requiredMessageKey'];
    var mask = parameters['mask'];
    var regexp = parameters['regexp'];
    var regexpMessage = parameters['regexpMessage'];
    var regexpMessageKey = parameters['regexpMessageKey'];
    var style = parameters['style'];
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
        component.translateKey = translateKey;
        component.tableColumn = tableColumn;
        component.sortable = sortable;
        component.required = required;
        component.requiredMessage = requiredMessage;
        component.requiredMessageKey = requiredMessageKey;
        component.mask = mask;
        component.regexp = regexp;
        component.regexpMessage = regexpMessage;
        component.regexpMessageKey = regexpMessageKey;
        component.style = style;
        var typeOfObject = window['Reflect'].getMetadata("design:type", target, property);
        component.typeOfObject = typeOfObject;
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
    var translateKey = parameters['translateKey'];
    var style = parameters['style'];
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
        component.translateKey = translateKey;
        component.style = style;
        var typeOfObject = window['Reflect'].getMetadata("design:type", target, property);
        component.typeOfObject = typeOfObject;
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
    var translateKey = parameters['translateKey'];
    var required = parameters['required'];
    var requiredMessage = parameters['requiredMessage'];
    var requiredMessageKey = parameters['requiredMessageKey'];
    var regexp = parameters['regexp'];
    var regexpMessage = parameters['regexpMessage'];
    var regexpMessageKey = parameters['regexpMessageKey'];
    var style = parameters['style'];
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
        component.translateKey = translateKey;
        component.required = required;
        component.requiredMessage = requiredMessage;
        component.requiredMessageKey = requiredMessageKey;
        component.regexp = regexp;
        component.regexpMessage = regexpMessage;
        component.regexpMessageKey = regexpMessageKey;
        component.style = style;
        var typeOfObject = window['Reflect'].getMetadata("design:type", target, property);
        component.typeOfObject = typeOfObject;
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
    var translateKey = parameters['translateKey'];
    var tableColumn = parameters['tableColumn'];
    var sortable = parameters['sortable'];
    var style = parameters['style'];
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
        component.translateKey = translateKey;
        component.tableColumn = tableColumn;
        component.sortable = sortable;
        component.style = style;
        var typeOfObject = window['Reflect'].getMetadata("design:type", target, property);
        component.typeOfObject = typeOfObject;
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
    var translateKey = parameters['translateKey'];
    var tableColumn = parameters['tableColumn'];
    var sortable = parameters['sortable'];
    var style = parameters['style'];
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
        component.translateKey = translateKey;
        component.tableColumn = tableColumn;
        component.sortable = sortable;
        component.style = style;
        var typeOfObject = window['Reflect'].getMetadata("design:type", target, property)['name'];
        component.typeOfObject = typeOfObject;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.Calendar = Calendar;
function Checkboxes(parameters) {
    var name = parameters['name'];
    var disabled = parameters['disabled'];
    var order = parameters['order'];
    var autoWidth = parameters['autoWidth'];
    var width = parameters['width'];
    var colMdLeft = parameters['colMdLeft'];
    var colMdRigth = parameters['colMdRigth'];
    var focus = parameters['focus'];
    var values = parameters['values'];
    var translateKey = parameters['translateKey'];
    var style = parameters['style'];
    function actualDecorator(target, property) {
        if (name == undefined) {
            name = property;
        }
        var component = new CrudComponentObj(property, name, 'Checkboxes', target.constructor);
        component.disabled = disabled;
        component.order = order;
        component.autoWidth = autoWidth;
        component.width = width;
        component.colMdLeft = colMdLeft;
        component.colMdRigth = colMdRigth;
        component.focus = focus;
        component.values = values;
        component.translateKey = translateKey;
        component.style = style;
        var typeOfObject = window['Reflect'].getMetadata("design:type", target, property);
        component.typeOfObject = typeOfObject;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.Checkboxes = Checkboxes;
function Radioboxes(parameters) {
    var name = parameters['name'];
    var disabled = parameters['disabled'];
    var order = parameters['order'];
    var autoWidth = parameters['autoWidth'];
    var width = parameters['width'];
    var colMdLeft = parameters['colMdLeft'];
    var colMdRigth = parameters['colMdRigth'];
    var focus = parameters['focus'];
    var values = parameters['values'];
    var translateKey = parameters['translateKey'];
    var style = parameters['style'];
    var targetProperty = parameters['target'];
    function actualDecorator(target, property) {
        if (name == undefined) {
            name = property;
        }
        var component = new CrudComponentObj(property, name, 'Radioboxes', target.constructor);
        component.disabled = disabled;
        component.order = order;
        component.autoWidth = autoWidth;
        component.width = width;
        component.colMdLeft = colMdLeft;
        component.colMdRigth = colMdRigth;
        component.focus = focus;
        component.values = values;
        component.translateKey = translateKey;
        component.style = style;
        var typeOfObject = window['Reflect'].getMetadata("design:type", target, property);
        component.typeOfObject = typeOfObject;
        component.targetProperty = targetProperty;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}
exports.Radioboxes = Radioboxes;
//# sourceMappingURL=decorators.js.map