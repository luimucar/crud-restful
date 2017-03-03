import {Component, Input, Output, EventEmitter} from '@angular/core';
import {getObject, CrudComponentObj, CrudEndPoint} from './index';
import {Service} from './services/index';

@Component({
    selector: 'crud',   
    templateUrl : './crud.html',
    providers : [Service]
})
export class CrudComponent {
    @Input()
    clazz : string;
    
    components: CrudComponentObj[];
    
    @Output() onSave = new EventEmitter();
    @Output() onCancel = new EventEmitter();
    
    constructor(public service: Service) {
    }
    
    ngOnInit() {
        this.components = CrudComponentObj.getComponents(this.clazz);
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
    
    /*
    let endP = CrudEndPoint.getEndPoint(this.components[0].clazz, 'create');
    this.service.setBody(obj);
    this.service.post(endP)
        .subscribe(v => {
            console.log('ok');
        },
        err => {
            console.log(err);
        });            
     */
}

