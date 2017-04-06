import { Input } from '@angular/core';
import { CrudComponentObj } from '../index';
import { TranslateService } from 'ng2-translate';
import { Observer } from './observer/observer';
import { ConcreteSubject } from './observer/concrete-subject';
import * as $ from 'jquery';

export class BaseComponent extends Observer {
    @Input()
    index : number;
    
    @Input()
    clazzName : string;
    
    @Input()
    public translate : TranslateService;
    
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
    public rows : number;
    public paginator : boolean;
    public pageLinks : number;  
    public sortField : string;
    public sortOrder : number;
    public emptyMessage : string; 
    public fileConfig : string;
    public fileConfigServerKey : string;
    public required : boolean;
    public requiredMsgKey : string;     
    public mask : string;
    public translateKey : string;
    public regexp : string;
    public regexpMessage : string;
    public regexpMessageKey : string;    
    public autoHide : boolean;
    public property : string;
    public style : string;
    public targetProperty : string;
    public translateKeyByValue : boolean;
    
    concreteSubject: ConcreteSubject = ConcreteSubject.getInstance();
    
    static showRemove : Map<string, boolean> = new Map<string, boolean>();
    static hideMsgError : Map<string, boolean> = new Map<string, boolean>()
    
    constructor() {       
        super("BASE-COMPONENT");
        this.concreteSubject.register(this);
    }
    
    readCommonsParameters(index : number) {
        this.id = this.clazzName + "_" + CrudComponentObj.getComponents(this.clazzName)[index].property;
        CrudComponentObj.getComponents(this.clazzName)[index].index = this.index;        
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
        this.rows = CrudComponentObj.getComponents(this.clazzName)[index].rows;
        this.pageLinks = CrudComponentObj.getComponents(this.clazzName)[index].pageLinks;
        this.paginator = CrudComponentObj.getComponents(this.clazzName)[index].paginator;
        this.sortField = CrudComponentObj.getComponents(this.clazzName)[index].sortField;
        this.sortOrder = CrudComponentObj.getComponents(this.clazzName)[index].sortOrder;
        this.emptyMessage = CrudComponentObj.getComponents(this.clazzName)[index].emptyMessage;
        this.fileConfig = CrudComponentObj.getComponents(this.clazzName)[index].fileConfig;
        this.fileConfigServerKey = CrudComponentObj.getComponents(this.clazzName)[index].fileConfigServerKey;
        this.mask = CrudComponentObj.getComponents(this.clazzName)[index].mask;
        this.translateKey = CrudComponentObj.getComponents(this.clazzName)[index].translateKey;
        this.regexp = CrudComponentObj.getComponents(this.clazzName)[index].regexp;
        this.regexpMessage = CrudComponentObj.getComponents(this.clazzName)[index].regexpMessage;
        this.regexpMessageKey = CrudComponentObj.getComponents(this.clazzName)[index].regexpMessageKey;
        this.autoHide = CrudComponentObj.getComponents(this.clazzName)[index].autoHide;
        this.property = CrudComponentObj.getComponents(this.clazzName)[index].property;
        this.style = CrudComponentObj.getComponents(this.clazzName)[index].style;
        this.translateLabel(index);
        let id = this.id;
        let style = this.style;
        if (style != undefined) {
            setTimeout(() => {
                style.split(';').forEach((value:string) => {
                    value = value.trim();
                    let kv : string[] = value.split(':');
                    if (kv.length > 1) {
                        $("#" + id).css(kv[0].trim(), kv[1].trim());
                    }
                });
            }, 50);
        }
        this.targetProperty = CrudComponentObj.getComponents(this.clazzName)[index].targetProperty;
        this.translateKeyByValue = CrudComponentObj.getComponents(this.clazzName)[index].translateKeyByValue;
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

    public static showOrHideComponents(clazzName : string, display:string) {
        let counter : number = 0;
        $("#buttons"+clazzName).css("display", display);
        CrudComponentObj.getComponents(clazzName).forEach(c => {
            $("#calendar"+clazzName+counter).css("display", display);
            $("#checkboxes"+clazzName+counter).css("display", display);
            $("#radioboxes"+clazzName+counter).css("display", display);
            $("#chips"+clazzName+counter).css("display", display);
            $("#input"+clazzName+counter).css("display", display);
            $("#multiselect"+clazzName+counter).css("display", display);
            $("#select"+clazzName+counter).css("display", display);
            counter++;
        });
    }
    
    public static setShowRemove(clazz : string, value : boolean) {
        BaseComponent.showRemove.set(clazz, value);
    }

    public static setHideMsgError(clazz : string, value : boolean) {
        BaseComponent.hideMsgError.set(clazz, value);
    }
}