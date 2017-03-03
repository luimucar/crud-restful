import { Input } from '@angular/core';
import { CrudComponentObj } from '../index';

export class BaseComponent {
    @Input()
    index : number;
    
    @Input()
    clazzName : string;
    
    public id : string;
    public name : string;
    public value : any;    
    public readonly : boolean = false;
    public disabled : boolean = false;  
    public values : any [];
    
    readCommonsParameters(index : number) {
        this.id = CrudComponentObj.getComponents(this.clazzName)[index].property;
        this.value = CrudComponentObj.getComponents(this.clazzName)[index].defaultValue;
        this.values = CrudComponentObj.getComponents(this.clazzName)[index].values;
        this.name = CrudComponentObj.getComponents(this.clazzName)[index].name;
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        if (CrudComponentObj.getComponents(this.clazzName)[index].readOnly != undefined) {
            this.readonly = CrudComponentObj.getComponents(this.clazzName)[index].readOnly;
        } else {
            this.readonly = false;
        }
        if (CrudComponentObj.getComponents(this.clazzName)[index].disabled != undefined) {
            this.disabled = CrudComponentObj.getComponents(this.clazzName)[index].disabled;        
        } else {
            this.disabled = false;
        }
        CrudComponentObj.getComponents(this.clazzName)[index].value = this.value;
    }
}