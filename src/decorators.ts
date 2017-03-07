import * as $ from 'jquery';

export class Configuration {
    public static i18nPath : string = './assets/i18n';
}

export class CrudComponentObj {
    public static components: CrudComponentObj[] = [];
    public values: any[] = null;
    public value: any = null;
    public clazzName: string;
    public url : string;
    public selectItemArray : string;
    public selectItemLabel: string;
    public selectItemValue : string;
    public selectClazz : any;
    public readOnly : boolean;
    public disabled : boolean;
    public inputType : string;
    public order : number = 0;
    public width : string;
    public autoWidth : boolean;
    public colMdLeft : number;
    public colMdRigth : number;
    public focus : boolean;
    public format : string;
    public translateKey: string = undefined;
    public tableColumn : number;
    public sortable : boolean;
    public rows : number;
    public paginator : boolean;
    public pageLinks : number;
    public sortField : string;
    public sortOrder : number;
    public emptyMessage : string;
    
    constructor(public property: string, public name: string, public type: string, public clazz : any, public defaultValue? : any) {
        this.clazzName = clazz.name;
    }
    
    public sort() {
        return (left, right): number => {
            if (left.order < right.order) {
                return -1;
            } else if (left.order > right.order) {
                return 1;
            }
            return 0;
        }
    }    
    public static getComponents(clazzName: string): CrudComponentObj[] {
        let objs: CrudComponentObj[] = [];
        if (CrudComponentObj.components.length > 0) {
            CrudComponentObj.components.forEach(obj => {
                if (obj.clazzName == clazzName) {
                    objs.push(obj);
                }
            });
        }
        objs = objs.sort((o1,o2) => {
            if (o1.order > o2.order) {
                return 1;
            }

            if (o1.order < o2.order) {
                return -1;
            }
            return 0;
        });
        return objs;
    }
}

export function setObject(clazzName: any, object : any) {
    if (object != undefined) {
        CrudComponentObj.components.forEach(obj => {
            if (obj.clazzName == clazzName) {
                if (object[obj.property]) {
                    obj['value'] = object[obj.property];
                }
                //console.log(obj);
            }
        });
    }
}

export function getObject(clazzName: any): any {
    let ret = new clazzName();
    CrudComponentObj.components.forEach(obj => {
        if (obj.clazzName == clazzName.name) {
            ret[obj.property] = obj.value;
        }
    });
    return ret;
}

export function getI18nPath() : string {
    return Configuration.i18nPath;
}

export function Configure(parameters : any) {
    let i18nPath = parameters['i18nPath'];
    function actualDecorator(constructor: Function) {        
        Object.seal(constructor);
        Object.seal(constructor.prototype);
        Configuration.i18nPath = i18nPath;
    }
    return actualDecorator;
}

export function Table(parameters : any) {
    let name = parameters['name'];
    let url = parameters['url'];
    let order = parameters['order'];
    let rows = parameters['rows'];
    let paginator = parameters['paginator'];
    let pageLinks = parameters['pageLinks'];
    let sortField = parameters['sortField'];
    let sortOrder = parameters['sortOrder'];
    let emptyMessage = parameters['emptyMessage'];    
    function actualDecorator(constructor: Function) {
        let component : CrudComponentObj = new CrudComponentObj(name, name, 'Table', constructor);
        component.name = name;
        component.url = url;
        component.order = order;
        component.rows = rows;
        component.paginator = paginator;
        component.pageLinks = pageLinks;
        component.sortField = sortField;
        component.sortOrder = sortOrder;
        component.emptyMessage = emptyMessage;
        CrudComponentObj.components.push(component);        
    }
    return actualDecorator;
}

export function Id(parameters : any) {
    let order = parameters['order'];
    function actualDecorator(target: Object, property: string): void {
        let component : CrudComponentObj = new CrudComponentObj(property, property, 'Id', target.constructor);
        component.order = order;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

function getProperty(target: Object, parameterIndex: number) {
    let parametersConstructor = target.toString();
    let parametersArray = parametersConstructor.substring(parametersConstructor.indexOf('{') + 1, parametersConstructor.indexOf('}')).trim().replace(/\n/g, '').split(';');
    let parametersArrayClean : string [] = [];
    parametersArray.forEach(parameter => {
        if (parameter != "") {
            parametersArrayClean.push(parameter.trim());
        }
    });
    return parametersArrayClean[parameterIndex].substring(parametersArrayClean[parameterIndex].indexOf('=') + 1).trim();
}

export function InputType(parameters : any) {
    let name = parameters['name'];
    let inputType = parameters['type'];
    let defaultValue = parameters['defaultValue'];
    let readOnly = parameters['readOnly'];
    let disabled = parameters['disabled'];
    let order = parameters['order'];
    let autoWidth = parameters['autoWidth'];
    let width = parameters['width'];
    let colMdLeft = parameters['colMdLeft'];
    let colMdRigth = parameters['colMdRigth'];
    let focus = parameters['focus'];
    let translateKey = parameters['translateKey'];
    let tableColumn = parameters['tableColumn'];
    let sortable = parameters['sortable'];
    function actualDecorator(target: Object, property: string, parameterIndex?: number): void {
        if (name == undefined) {
            name = property;
        }
        let construct : any = target.constructor
        if (property == undefined) {
            property = getProperty(target, parameterIndex);            
            construct = target;
        }
        let component : CrudComponentObj = new CrudComponentObj(property, name, 'InputType', construct, defaultValue);
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
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function MultiSelect(parameters : any) {
    let name = parameters['name'];
    let url = parameters['url'];
    let selectItemArray = parameters['modelSelect'];
    let selectItemLabel = parameters['modelSelectLabel'];
    let selectItemValue = parameters['modelSelectValue'];
    let selectClazz = parameters['modelSelectClazz'];
    let disabled = parameters['disabled'];    
    let order = parameters['order'];
    let autoWidth = parameters['autoWidth'];
    let width = parameters['width'];  
    let colMdLeft = parameters['colMdLeft'];
    let colMdRigth = parameters['colMdRigth'];
    let focus = parameters['focus'];
    let translateKey = parameters['translateKey'];
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'MultiSelect', target.constructor)
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
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function Chips(parameters : any) {
    let name = parameters['name'];
    let disabled = parameters['disabled'];
    let order = parameters['order'];   
    let autoWidth = parameters['autoWidth'];
    let width = parameters['width'];     
    let colMdLeft = parameters['colMdLeft'];
    let colMdRigth = parameters['colMdRigth'];     
    let focus = parameters['focus'];
    let translateKey = parameters['translateKey'];
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'Chips', target.constructor);
        component.disabled = disabled;
        component.order = order;
        component.autoWidth = autoWidth;
        component.width = width; 
        component.colMdLeft = colMdLeft;
        component.colMdRigth = colMdRigth;  
        component.focus = focus;       
        component.translateKey = translateKey;      
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function Select(parameters : any) {
    let name = parameters['name'];
    let values = parameters['values'];
    let disabled = parameters['disabled'];
    let defaultValue = parameters['defaultValue'];
    let order = parameters['order'];
    let autoWidth = parameters['autoWidth'];
    let width = parameters['width'];
    let colMdLeft = parameters['colMdLeft'];
    let colMdRigth = parameters['colMdRigth'];  
    let focus = parameters['focus'];       
    let translateKey = parameters['translateKey'];
    let tableColumn = parameters['tableColumn'];
    let sortable = parameters['sortable'];
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'Select', target.constructor);
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
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function Calendar(parameters : any) {
    let name = parameters['name'];
    let disabled = parameters['disabled'];
    let order = parameters['order'];   
    let autoWidth = parameters['autoWidth'];
    let width = parameters['width'];     
    let colMdLeft = parameters['colMdLeft'];
    let colMdRigth = parameters['colMdRigth'];     
    let focus = parameters['focus'];
    let format = parameters['format'];
    let translateKey = parameters['translateKey'];
    let tableColumn = parameters['tableColumn'];
    let sortable = parameters['sortable'];
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'Calendar', target.constructor);
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
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function Checkboxes(parameters : any) {
    let name = parameters['name'];
    let disabled = parameters['disabled'];
    let order = parameters['order'];   
    let autoWidth = parameters['autoWidth'];
    let width = parameters['width'];     
    let colMdLeft = parameters['colMdLeft'];
    let colMdRigth = parameters['colMdRigth'];     
    let focus = parameters['focus'];
    let values = parameters['values'];
    let translateKey = parameters['translateKey'];
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'Checkboxes', target.constructor);
        component.disabled = disabled;
        component.order = order;
        component.autoWidth = autoWidth;
        component.width = width; 
        component.colMdLeft = colMdLeft;
        component.colMdRigth = colMdRigth;  
        component.focus = focus;
        component.values = values; 
        component.translateKey = translateKey;            
        CrudComponentObj.components.push(component);
    }

    return actualDecorator;
}