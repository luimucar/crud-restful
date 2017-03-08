import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';

@Component({
    selector: 'selectCrudRestful',
    template: `
        <div class="row" id="select{{clazzName}}{{index}}">
            <div class="col-md-{{colMdLeft}}">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-{{colMdRigth}}">    
                <select [style.width]="width" [ngModel]="value" (ngModelChange)="onChangeObj($event)">
                    <option [ngValue]="i.value" *ngFor="let i of values">{{i.label}}</option>
                </select>
            </div>
            <span id="label_error_{{id}}" style="color: red; display: none;"></span>
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





