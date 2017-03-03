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
    public order : number;
    public autoWidth : boolean;
    public width : string;
    public colMdLeft : number = 4;
    public colMdRigth : number = 8;      
    public focus : boolean;
    
    readCommonsParameters(index : number) {
        this.id = CrudComponentObj.getComponents(this.clazzName)[index].property;
        if (CrudComponentObj.getComponents(this.clazzName)[index].value != undefined) {
            this.value = CrudComponentObj.getComponents(this.clazzName)[index].value;
        } else {
            this.value = CrudComponentObj.getComponents(this.clazzName)[index].defaultValue;
        }
        if (this.value == undefined) {
            this.value = null;
        }
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
        this.order = CrudComponentObj.getComponents(this.clazzName)[index].order;
        this.autoWidth = CrudComponentObj.getComponents(this.clazzName)[index].autoWidth;
        if (this.autoWidth) {
            this.width = "100%";
        } else {
            this.width = CrudComponentObj.getComponents(this.clazzName)[index].width;
        }
        if (CrudComponentObj.getComponents(this.clazzName)[index].colMdLeft != undefined) {
            this.colMdLeft = CrudComponentObj.getComponents(this.clazzName)[index].colMdLeft;
        }
        if (CrudComponentObj.getComponents(this.clazzName)[index].colMdRigth != undefined) {
            this.colMdRigth = CrudComponentObj.getComponents(this.clazzName)[index].colMdRigth;
        }
        if (CrudComponentObj.getComponents(this.clazzName)[index].focus != undefined) {
            this.focus = CrudComponentObj.getComponents(this.clazzName)[index].focus;
        }
        CrudComponentObj.getComponents(this.clazzName)[index].value = this.value;
    }
}