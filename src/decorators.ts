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
    constructor(public name: string, public type: string, public clazz : any) {
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
        ret[obj.name] = obj.value;
    });
    return ret;
}


export function InputType(clazz: any, inputType: string) {
    function actualDecorator(target: Object, property: string): void {
        CrudComponentObj.components.push(new CrudComponentObj(property, inputType, clazz));
    }
    return actualDecorator;
}

export function SaveEndPoint(url: string) {
    function actualDecorator(constructor: Function) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }
    return actualDecorator;
}

export function MultiSelect(clazz: any, url : string, selectClazz : any, selectItemArray : string, selectItemValue : string, selectItemLabel :string) {

    function actualDecorator(target: Object, property: string): void {
        let crudComponentObj = new CrudComponentObj(property, 'MultiSelect', clazz)
        crudComponentObj.url = url;
        crudComponentObj.selectItemArray = selectItemArray;
        crudComponentObj.selectItemLabel = selectItemLabel;
        crudComponentObj.selectItemValue = selectItemValue;
        crudComponentObj.selectClazz = selectClazz;
        CrudComponentObj.components.push(crudComponentObj);
    }
    return actualDecorator;
}

export function Chips(clazz: any) {
    function actualDecorator(target: Object, property: string): void {
        CrudComponentObj.components.push(new CrudComponentObj(property, 'Chips', clazz));
    }
    return actualDecorator;
}

export function Select(clazz: any, values : any[]) {
    function actualDecorator(target: Object, property: string): void {
        let crudComponentObj = new CrudComponentObj(property, 'Select', clazz);
        crudComponentObj.values = values;
        CrudComponentObj.components.push(crudComponentObj);
    }
    return actualDecorator;
}