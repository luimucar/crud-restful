import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';

@Component({
    selector: 'selectCrudRestful',
    template: `
        <div class="row" id="checkboxes{{clazzName}}{{index}}">
            <div class="col-md-{{colMdLeft}}">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-{{colMdRigth}}">
                <div *ngFor="let item of values">
                    <input type='checkbox' [name]="item.value" [value]="item.value" (change)="updateCheckedOptions(item, $event)">
                    <label>{{item.name}}</label> 
            </div>
            <span id="label_error_{{id}}" style="color: red; display: none;"></span>
        </div>
    `
})

export class CheckboxesComponent extends BaseComponent {
    ngOnInit() {
        this.readCommonsParameters(this.index);
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
    }
    updateCheckedOptions(item, event) {
        item['checked'] = event.target.checked;
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        crudComponentObj.value = this.values;
    }
}





