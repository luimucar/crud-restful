import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import * as $ from 'jquery';

@Component({
    selector: 'inputText',
    template: `
        <div class="row">
            <div class="col-md-4">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-8">    
                <input pInputText id="{{id}}" type="{{inputType}}" name="{{name}}" [value]="value" (click)="setValue(myInput.value)" (keypress)="setValue(myInput.value)" (blur)="setValue(myInput.value)" [readonly]="readonly" [disabled]="disabled" #myInput>
            </div>            
        </div>
    `
})

export class InputTextComponent extends BaseComponent {
    inputType : string;
    
    ngOnInit() {

        this.readCommonsParameters(this.index);
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        this.inputType = crudComponentObj.inputType;        
        setTimeout(() => {
            if (this.value) {
                $('#'+this.id).attr('checked', 'true');
            }
        }, 50)
    }
    
    setValue(value:string){
        if (this.inputType == 'checkbox') {
            CrudComponentObj.getComponents(this.clazzName)[this.index].value = $('#'+this.id).is(':checked');
        } else {
            CrudComponentObj.getComponents(this.clazzName)[this.index].value = value;
            
        }
    }
}


