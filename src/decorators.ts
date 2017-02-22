
export class CrudComponentObj {
    public static components : CrudComponentObj[] = [];
    public value : string = '';
    constructor(public name : string, public type : string) {
    }
}

export function input(inputType: string) {
    function actualDecorator(target: Object, property: string): void {
        CrudComponentObj.components.push(new CrudComponentObj(property, inputType));
    }
    return actualDecorator;
}