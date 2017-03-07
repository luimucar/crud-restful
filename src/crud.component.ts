import {Component, Input, Output, EventEmitter} from '@angular/core';
import {getObject, setObject, CrudComponentObj, Configuration} from './index';
import {Service} from './services/index';
import {ConcreteSubject} from './components/observer/concrete-subject';
import {Observer} from './components/observer/observer';
import {BaseComponent} from './components/base.component';
import {ConfirmationService} from 'primeng/primeng';
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
    
    constructor(public service: Service, private confirmationService: ConfirmationService, private translate : TranslateService) {
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
    
    save() {
        if (this.components.length > 0) {
            let obj = getObject(this.components[0].clazz);
            if (!Configuration.tableLess.get(this.clazz)) {
                BaseComponent.showOrHideComponets(this.clazz, 'none');
            } else {
                BaseComponent.showOrHideComponets(this.clazz, 'block');
            }
            this.onSave.emit(obj);
        }
    }
    
    remove() {
        this.confirmationService.confirm({
            message: this.translate.instant(Configuration.confirmMessageKey),
            header: this.translate.instant(Configuration.confirmTitleMessageKey),
            icon: 'fa fa-trash',
            accept: () => {
                if (this.components.length > 0) {
                    let obj = getObject(this.components[0].clazz);
                    if (!Configuration.tableLess.get(this.clazz)) {
                        BaseComponent.showOrHideComponets(this.clazz, 'none');
                    } else {
                        BaseComponent.showOrHideComponets(this.clazz, 'block');
                    }
                    this.onRemove.emit(obj);
                }
            }
        });
    }
    
    cancel() {
        this.confirmationService.confirm({
            message: this.translate.instant(Configuration.confirmMessageKey),
            header: this.translate.instant(Configuration.confirmTitleMessageKey),
            icon: 'fa fa-times',
            accept: () => {
                if (this.components.length > 0) {
                    if (!Configuration.tableLess.get(this.clazz)) {
                        BaseComponent.showOrHideComponets(this.clazz, 'none');
                    } else {
                        BaseComponent.showOrHideComponets(this.clazz, 'block');
                    }
                    this.onCancel.emit();
                }
            }
        });
    }
    
    public notify() {
        this.showRemove = BaseComponent.showRemove;
        this.concreteSubject.notify("BASE-COMPONENT");
    }
}

