import {Component, Input} from '@angular/core';
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
    
    constructor(public service: Service) {
    }
    
    ngOnInit() {
        this.components = CrudComponentObj.getComponents(this.clazz);
    }
    
    save() {
        if (this.components.length > 0) {
            let obj = getObject(this.components[0].clazz);
            console.log(obj);
            let endP = CrudEndPoint.getEndPoint(this.components[0].clazz, 'create');
            this.service.setBody(obj);
            this.service.post(endP)
                .subscribe(v => {
                    console.log('ok');
                },
                err => {
                    console.log(err);
                });            
        }
    }
}

