import * as $ from 'jquery';
import { Map } from 'typescript';

export class Item {
    constructor (public value : number, public label : string, public checked? : boolean) {
    }    
}

export class MapClass {
    constructor(public key : string, public value : boolean) {        
    }
}

export function getValueFromMap(array : MapClass[], key : string) : boolean {
    let ret : boolean = false;
    array.forEach((data : MapClass) => {
        if (data.key == key) {
            ret = data.value;
        }            
    });
    return ret;
}

export class Configuration {
    public static i18nPath : string = './assets/i18n';
    public static confirmMessageKey : string = null;
    public static confirmTitleMessageKey : string = null;
    public static tableLess : MapClass[] = []; 
    public static token : string = null;
}

export class CrudComponentObj {
    public static components: CrudComponentObj[] = [];
    public index : number = 0;
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
    public fileConfig : string;
    public fileConfigServerKey : string;
    public required : boolean; 
    public requiredMessage : string;
    public requiredMessageKey : string;
    public mask : string;
    public regexp : string;
    public regexpMessage : string;
    public regexpMessageKey : string;
    public autoHide : boolean;
    public style : string;
    public typeOfObject : string;
    public targetProperty : string;
    public targetPropertyValue : string;
    public translateKeyByValue : boolean;

    constructor(public property: string, public name: string, public type: string, public clazz : string, public defaultValue? : any) {
        this.clazzName = clazz;
        if (name == undefined) {
            this.name = property;
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
                if (object[obj.property] != undefined) {
                    obj['value'] = object[obj.property];
                }
            }
        });
    }
}

export function getObject(clazzName: any, objectInstance : any): any {
    CrudComponentObj.components.forEach(obj => {
        if (obj.clazzName == clazzName) {
            if (obj.targetProperty != undefined) {
                let target = obj.targetProperty;
                objectInstance[target] = obj.targetPropertyValue;
            }
            objectInstance[obj.property] = obj.value;            
        }
    });
    
    return (<any>Object).assign(objectInstance, objectInstance);
}

export function getI18nPath() : string {
    return Configuration.i18nPath;
}

export function Configure(parameters : any) {
    let clazz = parameters['clazz'];
    let i18nPath = parameters['i18nPath'];
    let confirmMessageKey = parameters['confirmMessageKey'];
    let confirmTitleMessageKey = parameters['confirmTitleMessageKey'];
    function actualDecorator(constructor: Function) {        
        Object.seal(constructor);
        Object.seal(constructor.prototype);
        Configuration.i18nPath = i18nPath;
        Configuration.confirmMessageKey = confirmMessageKey;
        Configuration.confirmTitleMessageKey = confirmTitleMessageKey;
        Configuration.tableLess.push(new MapClass(clazz, true));
    }
    return actualDecorator;
}

export function Table(parameters : any) {
    let clazz = parameters['clazz'];
    let name = parameters['name'];
    let propertyValue = parameters['property'];
    let url = parameters['url'];
    let order = parameters['order'];
    let rows = parameters['rows'];
    let paginator = parameters['paginator'];
    let pageLinks = parameters['pageLinks'];
    let sortField = parameters['sortField'];
    let sortOrder = parameters['sortOrder'];
    let emptyMessage = parameters['emptyMessageKey'];
    let fileConfig = parameters['fileConfig'];
    let fileConfigServerKey = parameters['fileConfigServerKey'];
    let autoHide = parameters['autoHide'];
    let style = parameters['style'];
    function actualDecorator(constructor: Function) {
        Configuration.tableLess.push(new MapClass(clazz, false));
        let component : CrudComponentObj = new CrudComponentObj(name, name, 'Table', clazz);
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

export function Id(parameters : any) {
    let clazz = parameters['clazz'];
    let order = parameters['order'];
    let propertyValue = parameters['property'];
    function actualDecorator(target: Object, property: string, parameterIndex?: number): void {
        if (property == undefined) {
            property = propertyValue;            
        }                
        let component : CrudComponentObj = new CrudComponentObj(property, property, 'Id', clazz);
        component.order = order;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function InputType(parameters : any) {   
    let clazz = parameters['clazz'];
    let name = parameters['name'];
    let propertyValue = parameters['property'];
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
    let required = parameters['required'];
    let requiredMessage = parameters['requiredMessage'];
    let requiredMessageKey = parameters['requiredMessageKey'];
    let mask = parameters['mask'];
    let regexp = parameters['regexp'];
    let regexpMessage = parameters['regexpMessage'];
    let regexpMessageKey = parameters['regexpMessageKey'];
    let style = parameters['style'];
    function actualDecorator(target: Object, property: string, parameterIndex?: number): void {
        if (name == undefined) {
            name = property;
        }
        if (property == undefined) {
            property = propertyValue;
        }
        let component : CrudComponentObj = new CrudComponentObj(property, name, 'InputType', clazz, defaultValue);
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

export function MultiSelect(parameters : any) {
    let clazz = parameters['clazz'];
    let name = parameters['name'];
    let propertyValue = parameters['property'];
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
    let style = parameters['style'];
    function actualDecorator(target: Object, property: string, parameterIndex?: number): void {
        if (name == undefined) {
            name = property;
        }        
        if (property == undefined) {
            property = propertyValue;            
        }        
        let component = new CrudComponentObj(property, name, 'MultiSelect', clazz)
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

export function Chips(parameters : any) {
    let clazz = parameters['clazz'];
    let name = parameters['name'];
    let propertyValue = parameters['property'];
    let disabled = parameters['disabled'];
    let order = parameters['order'];   
    let autoWidth = parameters['autoWidth'];
    let width = parameters['width'];     
    let colMdLeft = parameters['colMdLeft'];
    let colMdRigth = parameters['colMdRigth'];     
    let focus = parameters['focus'];
    let translateKey = parameters['translateKey'];
    let required = parameters['required'];
    let requiredMessage = parameters['requiredMessage'];
    let requiredMessageKey = parameters['requiredMessageKey'];    
    let regexp = parameters['regexp'];
    let regexpMessage = parameters['regexpMessage'];
    let regexpMessageKey = parameters['regexpMessageKey'];    
    let style = parameters['style'];
    function actualDecorator(target: Object, property: string, parameterIndex?: number): void {
        if (name == undefined) {
            name = property;
        }
        if (property == undefined) {
            property = propertyValue;
        }
        let component = new CrudComponentObj(property, name, 'Chips', clazz);
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

export function Select(parameters : any) {
    let clazz = parameters['clazz'];
    let name = parameters['name'];
    let propertyValue = parameters['property'];
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
    let required = parameters['required'];
    let requiredMessage = parameters['requiredMessage'];
    let requiredMessageKey = parameters['requiredMessageKey'];        
    let tableColumn = parameters['tableColumn'];
    let sortable = parameters['sortable'];
    let style = parameters['style'];
    let translateKeyByValue = parameters['translateKeyByValue'];
    let url = parameters['url'];
    let selectItemLabel = parameters['modelSelectLabel'];
    let selectItemValue = parameters['modelSelectValue'];
    
    function actualDecorator(target: Object, property: string, parameterIndex?: number): void {
        if (name == undefined) {
            name = property;
        }
        if (property == undefined) {
            property = propertyValue;            
        }
        let component = new CrudComponentObj(property, name, 'Select', clazz);
        component.url = url;
        component.selectItemValue = selectItemValue;
        component.selectItemLabel = selectItemLabel;
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
        component.required = required;
        component.requiredMessage = requiredMessage;
        component.requiredMessageKey = requiredMessageKey;                      
        component.tableColumn = tableColumn;
        component.sortable = sortable;
        component.style = style;
        component.translateKeyByValue = translateKeyByValue;
        var typeOfObject = window['Reflect'].getMetadata("design:type", target, property);
        component.typeOfObject = typeOfObject;        
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function Calendar(parameters : any) {
    let clazz = parameters['clazz'];
    let name = parameters['name'];
    let propertyValue = parameters['property'];
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
    let style = parameters['style'];
    function actualDecorator(target: Object, property: string, parameterIndex?: number): void {
        if (name == undefined) {
            name = property;
        }
        if (property == undefined) {
            property = propertyValue;
        }
        let component = new CrudComponentObj(property, name, 'Calendar', clazz);
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

export function Checkboxes(parameters : any) {
    let clazz = parameters['clazz'];
    let name = parameters['name'];
    let propertyValue = parameters['property'];
    let disabled = parameters['disabled'];
    let order = parameters['order'];   
    let autoWidth = parameters['autoWidth'];
    let width = parameters['width'];     
    let colMdLeft = parameters['colMdLeft'];
    let colMdRigth = parameters['colMdRigth'];     
    let focus = parameters['focus'];
    let values = parameters['values'];
    let translateKey = parameters['translateKey'];
    let style = parameters['style'];
    function actualDecorator(target: Object, property: string, parameterIndex?: number): void {
        if (name == undefined) {
            name = property;
        }
        if (property == undefined) {
            property = propertyValue;            
        }
        let component = new CrudComponentObj(property, name, 'Checkboxes', clazz);
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

export function Radioboxes(parameters : any) {
    let clazz = parameters['clazz'];
    let name = parameters['name'];
    let propertyValue = parameters['property'];
    let disabled = parameters['disabled'];
    let order = parameters['order'];   
    let autoWidth = parameters['autoWidth'];
    let width = parameters['width'];     
    let colMdLeft = parameters['colMdLeft'];
    let colMdRigth = parameters['colMdRigth'];     
    let focus = parameters['focus'];
    let values = parameters['values'];
    let translateKey = parameters['translateKey'];
    let style = parameters['style'];
    let targetProperty = parameters['target'];
    function actualDecorator(target: Object, property: string, parameterIndex?: number): void {
        if (name == undefined) {
            name = property;
        }
        if (property == undefined) {
            property = propertyValue;            
        }
        let component = new CrudComponentObj(property, name, 'Radioboxes', clazz);
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