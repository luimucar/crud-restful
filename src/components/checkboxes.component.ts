import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';

@Component({
    selector: 'selectCrudRestful',
    template: `
        <div class="row">
            <div class="col-md-{{colMdLeft}}">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-{{colMdRigth}}">
                <div *ngFor="let item of values">
                    <input type='checkbox' [name]="item.value" [value]="item.value" (change)="updateCheckedOptions(item, $event)">
                    <label>{{item.name}}</label> 
            </div>
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





