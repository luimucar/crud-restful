import {Component, Input, Output, EventEmitter} from '@angular/core';
import {getObject, setObject, CrudComponentObj, Configuration} from './index';
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
    
    ngOnInit() {
        this.components = CrudComponentObj.getComponents(this.clazz);
        setObject(this.clazz, this.model);        
        setTimeout(() => {
            if (!Configuration.tableLess.get(this.clazz)) {
                BaseComponent.showOrHideComponets(this.clazz, 'none');
            } else {
                BaseComponent.showOrHideComponets(this.clazz, 'block');
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
                let obj = getObject(this.components[0].clazz);
                this.onOk.emit(obj);
            }
        }        
    }

    save() {
        if (this.components.length > 0) {
            if (this.validate()) {
                let obj = getObject(this.components[0].clazz);
                if (!Configuration.tableLess.get(this.clazz)) {
                    BaseComponent.showOrHideComponets(this.clazz, 'none');
                } else {
                    BaseComponent.showOrHideComponets(this.clazz, 'block');
                }
                this.showTable();
                this.onSave.emit(obj);
            }
        }
    }
    
    remove() {
        if (this.components.length > 0) {
            this.hideMsgError();
            let obj = getObject(this.components[0].clazz);
            if (!Configuration.tableLess.get(this.clazz)) {
                BaseComponent.showOrHideComponets(this.clazz, 'none');
            } else {
                BaseComponent.showOrHideComponets(this.clazz, 'block');
            }
            this.showTable();
            this.onRemove.emit(obj);
        }
    }

    showTable() {
        if (this.components.length > 0) {
            this.components.forEach(comp => {
                if (comp.type == 'Table') {
                    $('#table' + comp.clazzName + comp.index).css("display", "block");
                }
            });
        }
    }
    
    cancel() {
        if (this.components.length > 0) {
            this.hideMsgError();
            if (!Configuration.tableLess.get(this.clazz)) {
                BaseComponent.showOrHideComponets(this.clazz, 'none');
            } else {
                BaseComponent.showOrHideComponets(this.clazz, 'block');
            }
            this.showTable();
            this.onCancel.emit();
        }
    }
    
    public notify() {
        this.showRemove = BaseComponent.showRemove.get(this.clazz) && this.showRemoveButton;
        if (BaseComponent.hideMsgError.get(this.clazz)) {
            this.hideMsgError();
        }
        this.concreteSubject.notify("BASE-COMPONENT");
    }
}

