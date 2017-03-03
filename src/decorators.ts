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
    public order : number;

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

export function getObject(clazzName: any): any {
    let ret = new clazzName();
    CrudComponentObj.components.forEach(obj => {
        if (obj.clazzName == clazzName.name) {
            ret[obj.property] = obj.value;
        }
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

function getProperty(target: Object, parameterIndex: number) {
    let parametersConstructor = target.toString();
    let parametersArray = parametersConstructor.substring(parametersConstructor.indexOf('{') + 1, parametersConstructor.indexOf('}')).trim().replace(/\n/g, '').split(';');
    let parametersArrayClean : string [] = [];
    parametersArray.forEach(p => {
        if (p != "") {
            parametersArrayClean.push(p.trim());
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
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}

export function Chips(parameters : any) {
    let name = parameters['name'];
    let disabled = parameters['disabled'];
    let order = parameters['order'];     
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'Chips', target.constructor);
        component.disabled = disabled;
        component.order = order;
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
    function actualDecorator(target: Object, property: string): void {
        if (name == undefined) {
            name = property;
        }        
        let component = new CrudComponentObj(property, name, 'Select', target.constructor);
        component.values = values;
        component.disabled = disabled;
        component.defaultValue = defaultValue;
        component.order = order;
        CrudComponentObj.components.push(component);
    }
    return actualDecorator;
}