import * as $ from 'jquery';

export class CrudComponentObj {
    public static components : CrudComponentObj[] = [];
    public value : string = '';
    public target : Object;
    constructor(public name : string, public type : string, public clazz) {
    }
}

export function getObject() : Object[] {
    let objs : Object[] = [];
    CrudComponentObj.components.forEach( obj => {
        obj.target = new obj.clazz();
        $.extend(obj.target, obj);
        objs.push(obj.target);
    })        
    return objs;
}


export function input(clazz : any, inputType: string) {
    function actualDecorator(target: Object, property: string): void {
        CrudComponentObj.components.push(new CrudComponentObj(property, inputType, clazz));
    }
    return actualDecorator;
}