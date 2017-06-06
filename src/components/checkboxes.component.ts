import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import * as $ from 'jquery';

@Component({
    selector: 'selectCrudRestful',
    template: `
        <div class="row" id="checkboxes{{clazzName}}{{index}}">
            <div class="col-md-{{colMdLeft}}">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-{{colMdRigth}}">
                <div *ngFor="let item of values">
                    <input id="checkbox{{item.value}}" type='checkbox' [name]="item.value" [value]="item.value" (change)="updateCheckedOptions(item, $event)">
                    <label>{{item.label}}</label> 
                </div>
                <span class="crudRestfulLabelError" id="label_error_{{id}}" style="color: red; display: none;"></span>
            </div>            
        </div>
    `
})

export class CheckboxesComponent extends BaseComponent {
    ngOnInit() {
        this.readCommonsParameters(this.index);
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        crudComponentObj.value = this.values;
        this.values.forEach(value => {
            if (value['checked'] == true) {
                setTimeout(() => {
                    $('#checkbox' + value['value']).prop('checked', true);                
                }, 50);                        
            }
        });
    }
    
    updateCheckedOptions(item, event) {
        item['checked'] = event.target.checked;
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        crudComponentObj.value = this.values;
    }
}





