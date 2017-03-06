import { Input } from '@angular/core';
import { CrudComponentObj } from '../index';
import { TranslateService } from 'ng2-translate';
import { Observer } from './observer/observer';
import { ConcreteSubject } from './observer/concrete-subject';

export class BaseComponent extends Observer {
    @Input()
    index : number;
    
    @Input()
    clazzName : string;
    
    @Input()
    translate : TranslateService;
    
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
    public format : string;
    
    concreteSubject: ConcreteSubject = ConcreteSubject.getInstance();
    
    constructor() {       
        super("BASE-COMPONENT");
        this.concreteSubject.register(this);
    }
    
    readCommonsParameters(index : number) {
        this.id = this.clazzName + "_" + CrudComponentObj.getComponents(this.clazzName)[index].property;
        this.loadValue(this.index);
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
        if (CrudComponentObj.getComponents(this.clazzName)[index].format != undefined) {
            this.format = CrudComponentObj.getComponents(this.clazzName)[index].format;
        }
        this.translateLabel(index);
        CrudComponentObj.getComponents(this.clazzName)[index].value = this.value;
    }
    
    public loadValue(index : number) {
        if (CrudComponentObj.getComponents(this.clazzName)[index].value != undefined) {
            this.value = CrudComponentObj.getComponents(this.clazzName)[index].value;
        } else {
            this.value = CrudComponentObj.getComponents(this.clazzName)[index].defaultValue;
        }
        if (this.value == undefined) {
            this.value = null;
        }        
    }
    
    public notify(): void {        
        this.translateLabel(this.index);
    }
    
    public translateLabel(index : number): void {        
        if (this.translate != undefined && 
            CrudComponentObj.getComponents(this.clazzName)[index].translateKey != undefined &&
            CrudComponentObj.getComponents(this.clazzName)[index].translateKey != null) {
            let translateKey = CrudComponentObj.getComponents(this.clazzName)[index].translateKey;
            setTimeout(() => {
                this.name = this.translate.instant(translateKey);
            }, 50);
        }
    }
}