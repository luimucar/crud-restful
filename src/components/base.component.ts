import { CrudComponentObj } from '../index';

export class BaseComponent {
    public id : string;
    public name : string;
    public value : any;    
    public readonly : boolean = false;
    public disabled : boolean = false;  
    values : any [];  
    
    readCommonsParameters(index : number) {
        this.id = CrudComponentObj.components[index].property;
        this.value = CrudComponentObj.components[index].defaultValue;
        this.values = CrudComponentObj.components[index].values;
        this.name = CrudComponentObj.components[index].name;
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        if (CrudComponentObj.components[index].readOnly != undefined) {
            this.readonly = CrudComponentObj.components[index].readOnly;
        } else {
            this.readonly = false;
        }
        if (CrudComponentObj.components[index].disabled != undefined) {
            this.disabled = CrudComponentObj.components[index].disabled;        
        } else {
            this.disabled = false;
        }
        CrudComponentObj.components[index].value = this.value;
    }
}