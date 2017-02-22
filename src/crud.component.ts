import {Component} from '@angular/core';
import {CrudComponentObj, getObject} from './index';

@Component({
    selector: 'crud',
    template: `
        <br>

        <div style="width: 100%;" *ngFor="let comp of components; let i = index">
            <div crud-factory [type]="comp.type" [name]="comp.name" [index]="i"></div>
        </div>


        <button (click)="save()">Save</button>    
    `
})

export class CrudComponent {
    components : CrudComponentObj[] = CrudComponentObj.components;

    save() {
        let objs : Object[] = getObject();
        console.log(objs[0]);
    }
}

