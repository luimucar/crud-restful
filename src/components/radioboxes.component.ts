import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import * as $ from 'jquery';

@Component({
    selector: 'selectCrudRestful',
    template: `
        <div class="row" id="radioboxes{{clazzName}}{{index}}">
            <div class="col-md-{{colMdLeft}}">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-{{colMdRigth}}">
                <div *ngFor="let item of values">
                    <input id="radiobox{{item.value}}" type="radio" name="radiobox" [value]="item.value" (click)="selectValue(item)">
                    <label>{{item.label}}</label> 
                </div>
            </div>
            <span class="crudRestfulLabelError" id="label_error_{{id}}" style="color: red; display: none;"></span>
        </div>
    `
})

export class RadioboxesComponent extends BaseComponent {
    ngOnInit() {
        this.readCommonsParameters(this.index);
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        crudComponentObj.value = this.values;
        this.values.forEach(item => {
            if (item['checked'] == true) {
                setTimeout(() => {
                    $('#radiobox' + item['value']).prop('checked', true);
                    crudComponentObj.targetPropertyValue = item['value'];
                }, 50);                        
            }
        });        
    }
   
    selectValue(item) {
        item['checked'] = true;
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        crudComponentObj.targetPropertyValue = item['value'];
        crudComponentObj.value = this.values;
    }
}





