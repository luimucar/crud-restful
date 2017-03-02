import * as $ from 'jquery';

export class CrudEndPoint {
    public static endPoints: CrudEndPoint[] = [];
    public clazz : any;     
    public createEndP : string;
    public readEndP : string;
    public updateEndP : string;
    public deleteEndP : string;
    public static getEndPoint(clazzName: string, type : string) : string {
        let endPoint : string = undefined;
        if (CrudEndPoint.endPoints.length > 0) {
            CrudEndPoint.endPoints.forEach(endP => {
                if (endP.clazz == clazzName) {                    
                    if (type == 'create') {
                        endPoint = endP.createEndP;
                    } else if (type == 'read') {
                        endPoint = endP.readEndP;
                    } else if (type == 'update') {
                        endPoint = endP.updateEndP;
                    } else if (type == 'delete') {
                        endPoint = endP.deleteEndP;
                    }
                }
            });
        }
        return endPoint;
    }
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

export function EndPoint(parameters : any) {
    let createEndP = parameters['Create'];
    let readEndP = parameters['Read'];
    let updateEndP = parameters['Update'];
    let deleteEndP = parameters['Delete'];    
    function actualDecorator(constructor: Function) {        
        Object.seal(constructor);
        Object.seal(constructor.prototype);
        let crudEndPoint : CrudEndPoint = new CrudEndPoint();
        crudEndPoint.clazz = constructor;
        crudEndPoint.createEndP = createEndP;
        crudEndPoint.readEndP = readEndP;
        crudEndPoint.updateEndP = updateEndP;
        crudEndPoint.deleteEndP = deleteEndP;
        CrudEndPoint.endPoints.push(crudEndPoint);
    }
    return actualDecorator;
}

export function Id() {
    function actualDecorator(target: Object, property: string): void {
        let component : CrudComponentObj = new CrudComponentObj(property, property, 'Id', target.constructor);
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function InputType(parameters : any) {
    let name = parameters['name'];
    let inputType = parameters['type'];
    let defaultValue = parameters['defaultValue'];
    let readOnly = parameters['readOnly'];
    let disabled = parameters['disabled'];
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }
        let component : CrudComponentObj = new CrudComponentObj(property, name, 'InputType', target.constructor, defaultValue);
        component.inputType = inputType;
        component.readOnly = readOnly;
        component.disabled = disabled;
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
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function Chips(parameters : any) {
    let name = parameters['name'];
    let disabled = parameters['disabled'];     
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'Chips', target.constructor);
        component.disabled = disabled;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function Select(parameters : any) {
    let name = parameters['name'];
    let values = parameters['values'];
    let disabled = parameters['disabled'];
    let defaultValue = parameters['defaultValue'];
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'Select', target.constructor);
        component.values = values;
        component.disabled = disabled;
        component.defaultValue = defaultValue;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}