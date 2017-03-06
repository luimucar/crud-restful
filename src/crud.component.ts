import {Component, Input, Output, EventEmitter} from '@angular/core';
import {getObject, setObject, CrudComponentObj} from './index';
import {Service} from './services/index';
import { ConcreteSubject } from './components/observer/concrete-subject';

@Component({
    selector: 'crud',   
    templateUrl : './crud.html',
    providers : [Service]
})
export class CrudComponent {
    @Input()
    clazz : string;
    
    @Input()
    model : any;
    
    components: CrudComponentObj[];
    
    @Output() onSave = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    
    concreteSubject: ConcreteSubject = ConcreteSubject.getInstance();
    
    constructor(public service: Service) {
    }
    
    ngOnInit() {
        this.components = CrudComponentObj.getComponents(this.clazz);
        setObject(this.clazz, this.model);
        //console.log(this.components);
    }
    
    save() {
        if (this.components.length > 0) {
            let obj = getObject(this.components[0].clazz);
            this.onSave.emit(obj);
        }
    }
    
    cancel() {
        this.onCancel.emit();
    }
    
    public notify() {
        this.concreteSubject.notify("BASE-COMPONENT");
    }
}

