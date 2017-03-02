import * as $ from 'jquery';

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
    constructor(public property: string, public name: string, public type: string, public clazz : any, public defaultValue? : any) {
        this.clazzName = clazz.name;
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
        return objs;
    }
}

export function getObject(clazz: any): any {
    let ret = new clazz();
    CrudComponentObj.components.forEach(obj => {
        ret[obj.property] = obj.value;
    });
    return ret;
}

export function SaveEndPoint(url: string) {
    function actualDecorator(constructor: Function) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }
    return actualDecorator;
}

export function InputType(parameters : any) {
    let name = parameters['name'];
    let inputType = parameters['type'];
    let clazz = parameters['model'];
    let defaultValue = parameters['defaultValue'];
    let readOnly = parameters['readOnly'];
    let disabled = parameters['disabled'];
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }
        let component : CrudComponentObj = new CrudComponentObj(property, name, 'InputType', clazz, defaultValue);
        component.inputType = inputType;
        component.readOnly = readOnly;
        component.disabled = disabled;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function MultiSelect(parameters : any) {
    let name = parameters['name'];
    let clazz = parameters['model'];
    let url = parameters['url'];
    let selectItemArray = parameters['modelSelect'];
    let selectItemLabel = parameters['modelSelectLabel'];
    let selectItemValue = parameters['modelSelectValue'];
    let selectClazz = parameters['modelSelectClazz'];
    let disabled = parameters['disabled'];    
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'MultiSelect', clazz)
        component.url = url;
        component.selectItemArray = selectItemArray;
        component.selectItemLabel = selectItemLabel;
        component.selectItemValue = selectItemValue;
        component.selectClazz = selectClazz;
        component.disabled = disabled;        
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function Chips(parameters : any) {
    let name = parameters['name'];
    let clazz = parameters['model'];  
    let disabled = parameters['disabled'];     
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'Chips', clazz);
        component.disabled = disabled;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function Select(parameters : any) {
    let name = parameters['name'];
    let clazz = parameters['model'];
    let values = parameters['values'];
    let disabled = parameters['disabled'];
    let defaultValue = parameters['defaultValue'];
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'Select', clazz);
        component.values = values;
        component.disabled = disabled;
        component.defaultValue = defaultValue;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}