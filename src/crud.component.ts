import {Component, Input, Output, EventEmitter} from '@angular/core';
import {getObject, setObject, CrudComponentObj, Configuration, getValueFromMap} from './index';
import {Service} from './services/index';
import {ConcreteSubject} from './components/observer/concrete-subject';
import {Observer} from './components/observer/observer';
import {BaseComponent} from './components/base.component';
import * as $ from 'jquery';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'crud',   
    templateUrl : './crud.html',
    providers : [Service]
})
export class CrudComponent extends Observer {
    @Input() clazz : string;
    @Input() model : any;
    @Input() broadcast: EventEmitter<any>;
    @Input() buttons : string;
    @Input() onTableLoaded: EventEmitter<any>;
    @Input() onTableRowSelected: EventEmitter<any>;
    
    @Output() onOk = new EventEmitter();
    @Output() onSave = new EventEmitter();
    @Output() onRemove = new EventEmitter();
    @Output() onCancel = new EventEmitter();

    showOkButton : boolean;
    showSaveButton : boolean;
    showRemoveButton : boolean;
    showCancelButton : boolean;
            
    components: CrudComponentObj[];        
    concreteSubject: ConcreteSubject = ConcreteSubject.getInstance();
    showRemove : boolean;
       
    constructor(public service: Service, public translate : TranslateService) {
        super('CRUD-COMPONENT');
        this.concreteSubject.register(this);
    }
    
    googleAnalyticsObject() {
        window['GoogleAnalyticsObject'] = 'ga';
        window['ga'] = window['ga'] || function() {
            (window['ga'].q = window['ga'].q || []).push(arguments)
        },
            window['ga'].l = new Date();
        var a = document.createElement('script');
        var m = document.getElementsByTagName('script')[0];
        a['async'] = true;
        a.src = '//www.google-analytics.com/analytics.js';
        m.parentNode.insertBefore(a, m);
        
        window['ga']('create', 'UA-11176624-8', 'auto');
        window['ga']('send', 'pageview');        
    };
    
    ngOnInit() {
        this.googleAnalyticsObject();
        this.components = CrudComponentObj.getComponents(this.clazz);
        setObject(this.clazz, this.model);        
        setTimeout(() => {
            if (!getValueFromMap(Configuration.tableLess, this.clazz)) {
                BaseComponent.showOrHideComponents(this.clazz, 'none');
            } else {
                BaseComponent.showOrHideComponents(this.clazz, 'block');
            }
        }, 200);
        if (this.buttons != undefined) {
            let buttons = this.buttons.split(',');
            buttons.forEach(button => {
                if (button.toUpperCase() == "OK") {
                    this.showOkButton = true;                        
                } else if (button.toUpperCase() == "SAVE") {
                    this.showSaveButton = true;
                } else if (button.toUpperCase() == "REMOVE") {
                    this.showRemoveButton = true;
                } else if (button.toUpperCase() == "CANCEL") {
                    this.showCancelButton = true;
                }
            });
        }
        
    }

    hideMsgError() {
        this.components.forEach(componet => {
            if (componet.required) {
                $("#label_error_"+componet.clazzName+"_"+componet.property).css('display', 'none');
            }
        });
    }
    
    validate() {
        let ret : boolean = true;
        this.components.forEach(component => {
            if (component.required) {
                if (component.value == null || component.value.trim() == '') {
                    let message = null;
                    if (component.requiredMessageKey) {
                        message = this.translate.instant(component.requiredMessageKey);
                    } else {
                        message = component.requiredMessage;
                    }
                    let name = null;
                    if (component.translateKey != undefined) {
                        name = this.translate.instant(component.translateKey);
                    } else {
                        name = component.name;
                    }
                    let msg = name + ': ' + message;
                    $("#label_error_"+component.clazzName+"_"+component.property).text(msg);
                    $("#label_error_"+component.clazzName+"_"+component.property).css('color', 'red');
                    $("#label_error_"+component.clazzName+"_"+component.property).css('display', 'block');
                    ret = false;
                } else {
                    $("#label_error_"+component.clazzName+"_"+component.property).css('display', 'none');
                }
            }
            if (component.regexp) {
                var regexp = eval(component.regexp);
                if (component.value instanceof Array && component.value != undefined && component.value.length > 0) {
                    component.value.forEach(value => {
                        if (!this.validateRegexp(regexp, component.name, value, component.property, component.clazzName, component.translateKey, component.regexpMessageKey, component.regexpMessage)) {
                            ret = false;
                            return;
                        }
                    });                   
                }
                if (!(component.value instanceof Array) && component.value != undefined && component.value != '') {
                    ret = this.validateRegexp(regexp, component.name, component.value, component.property, component.clazzName, component.translateKey, component.regexpMessageKey, component.regexpMessage);
                }
            }
        });
        return ret;
    }
    
    validateRegexp(regexp, name, value, property, clazzName, translateKey, regexpMessageKey, regexpMessage) : boolean {
        if (regexp.test(value)) {
            $("#label_error_"+clazzName+"_"+property).css('display', 'none');
            return true;
        } else {
            let message = null;
            if (regexpMessageKey) {
                message = this.translate.instant(regexpMessageKey);
            } else {
                message = regexpMessage;
            }                    
            let componentName = null;
            if (translateKey != undefined) {
                componentName = this.translate.instant(translateKey);
            } else {
                componentName = name;
            }
            let msg = componentName + ': ' + message;
            $("#label_error_"+clazzName+"_"+property).text(msg);
            $("#label_error_"+clazzName+"_"+property).css('color', 'red');
            $("#label_error_"+clazzName+"_"+property).css('display', 'block');
            return false;
        }        
    }
    
    ok() {
        if (this.components.length > 0) {
            if (this.validate()) {
                let obj = getObject(this.components[0].clazz, this.model);
                this.onOk.emit(obj);
            }
        }        
    }

    save() {
        if (this.components.length > 0) {
            if (this.validate()) {
                let obj = getObject(this.components[0].clazz, this.model);
                if (!getValueFromMap(Configuration.tableLess, this.clazz)) {
                    BaseComponent.showOrHideComponents(this.clazz, 'none');
                } else {
                    BaseComponent.showOrHideComponents(this.clazz, 'block');
                }
                this.showTable('block');
                this.onSave.emit(obj);
            }
        }
    }
    
    remove() {
        if (this.components.length > 0) {
            this.hideMsgError();
            let obj = getObject(this.components[0].clazz, this.model);
            if (!getValueFromMap(Configuration.tableLess, this.clazz)) {
                BaseComponent.showOrHideComponents(this.clazz, 'none');
            } else {
                BaseComponent.showOrHideComponents(this.clazz, 'block');
            }
            this.showTable('block');
            this.onRemove.emit(obj);
        }
    }

    showTable(display : string) {
        if (this.components.length > 0) {
            this.components.forEach(comp => {
                if (comp.type == 'Table') {
                    $('#table' + comp.clazzName + comp.index).css("display", display);
                }
            });
        }
    }
    
    showComponents(display : string) {
        if (this.components.length > 0) {
            this.hideMsgError();
            BaseComponent.showOrHideComponents(this.clazz, display);
        }
    }
    
    cancel() {
        if (this.components.length > 0) {
            this.hideMsgError();
            if (!getValueFromMap(Configuration.tableLess, this.clazz)) {
                BaseComponent.showOrHideComponents(this.clazz, 'none');
            } else {
                BaseComponent.showOrHideComponents(this.clazz, 'block');
            }
            this.showTable('block');
            this.onCancel.emit();
        }
    }
    
    public notify() {
        this.showRemove = getValueFromMap(BaseComponent.showRemove, this.clazz) && this.showRemoveButton;
        if (getValueFromMap(BaseComponent.hideMsgError, this.clazz)) {
            this.hideMsgError();
        }
        this.concreteSubject.notify("BASE-COMPONENT");
    }

    getComponent(clazz : string, name : string) : CrudComponentObj { 
        console.log(this.components);
        let crudComponentObj : CrudComponentObj;
        this.components.forEach(component => {
            if (component.clazzName == clazz && component.name == name) {
                crudComponentObj = component;
            }
        });
        return crudComponentObj;
    }
}

