import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';

@Component({
    selector: 'selectInput',
    template: `
        <div class="row">
            <div class="col-md-4">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-8">    
                <select [ngModel]="value" (ngModelChange)="onChangeObj($event)">
                    <option [ngValue]="i.value" *ngFor="let i of values">{{i.label}}</option>
                </select>
            </div>
        </div>
    `
})

export class SelectComponent extends BaseComponent {   
    ngOnInit() {
        this.readCommonsParameters(this.index);
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
    }
    
    onChangeObj(value:any) {
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        CrudComponentObj.getComponents(this.clazzName)[this.index].value = value;
    }
}    





