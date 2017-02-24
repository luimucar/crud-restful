import { Component, Input } from '@angular/core';
import { CrudComponentObj } from '../index';

@Component({
    selector: 'selectInput',
    template: `
        <div class="col-md-4">    
            <label>{{name}}</label>
        </div>
        <div class="col-md-8">    
            <select [ngModel]="selectedObj" (ngModelChange)="onChangeObj($event)">
                <option [ngValue]="i.value" *ngFor="let i of values">{{i.label}}</option>
            </select>

        </div>
    `
})

export class SelectComponent {
    @Input()
    index : number;
    
    @Input()
    name : string;

    selectedObj : string;
    
    values : any [];
    
    ngOnInit() {
        let crudComponentObj = CrudComponentObj.components[this.index];
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        this.values = crudComponentObj.values;
    }
    
    onChangeObj(value:any) {
        let crudComponentObj = CrudComponentObj.components[this.index];
        CrudComponentObj.components[this.index].value = value;
        this.selectedObj = value;
    }
}    





