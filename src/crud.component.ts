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
            //console.log(Configuration.tableLess);
            if (!Configuration.tableLess.get(this.clazz)) {
                BaseComponent.showOrHideComponets(this.clazz, 'none');
            } else {
                BaseComponent.showOrHideComponets(this.clazz, 'block');
            }
        }, 200);
        //console.log(this.components);
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
        this.components.forEach(componet => {
            if (componet.required) {
                if (componet.value == null || componet.value.trim() == '') {
                    let requiredMsg = this.translate.instant(componet.requiredMsgKey);
                    let name = null;
                    if (componet.translateKey != undefined) {
                        name = this.translate.instant(componet.translateKey);
                    } else {
                        name = componet.name;
                    }
                    let msg = name + ': ' + requiredMsg;
                    $("#label_error_"+componet.clazzName+"_"+componet.property).text(msg);
                    $("#label_error_"+componet.clazzName+"_"+componet.property).css('color', 'red');
                    $("#label_error_"+componet.clazzName+"_"+componet.property).css('display', 'block');
                    ret = false;
                } else {
                    $("#label_error_"+componet.clazzName+"_"+componet.property).css('display', 'none');
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
            this.onRemove.emit(obj);
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

