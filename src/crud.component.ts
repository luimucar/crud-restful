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
    @Input()
    clazz : string;
    
    @Input()
    model : any;
    
    components: CrudComponentObj[];
    
    @Output() onSave = new EventEmitter();
    @Output() onRemove = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    
    @Input() broadcast: EventEmitter<string>;
    
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
    }

    hideMsgError() {
        this.components.forEach(componet => {
            if (componet.required) {
                $("#label_error_"+componet.clazzName+"_"+componet.property).css('display', 'none');
            }
        });
    }
    
    validate() {
        let ret = true;
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
                if (regexp.test(component.value)) {
                    $("#label_error_"+component.clazzName+"_"+component.property).css('display', 'none');
                } else {
                    let message = null;
                    if (component.regexpMessageKey) {
                        message = this.translate.instant(component.regexpMessageKey);
                    } else {
                        message = component.regexpMessage;
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
                }
            }
        });
        return ret;
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
        this.showRemove = BaseComponent.showRemove.get(this.clazz);
        if (BaseComponent.hideMsgError.get(this.clazz)) {
            this.hideMsgError();
        }
        this.concreteSubject.notify("BASE-COMPONENT");
    }
}

