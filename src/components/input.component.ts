import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import * as $ from 'jquery';

@Component({
    selector: 'inputTextCrudRestful',
    template: `
        <div class="row" id="input{{clazzName}}{{index}}">
            <div class="col-md-{{colMdLeft}}">
                <label id="label_{{id}}">{{name}}</label>
            </div>
            <div class="col-md-{{colMdRigth}}">    
                <p-inputMask *ngIf="mask" name="{{name}}" id="{{id}}" [style.width]="width" [value]="value" (click)="setValue(myInput.value)" (keypress)="setValue(myInput.value)" (blur)="setValue(myInput.value)" [readonly]="readonly" [disabled]="disabled" #myInput [mask]="mask" [placeholder]="mask"></p-inputMask>
                <input *ngIf="!mask" [style.width]="width" pInputText id="{{id}}" type="{{inputType}}" name="{{name}}" [value]="value" (click)="setValue(myInput.value)" (keypress)="setValue(myInput.value)" (blur)="setValue(myInput.value)" [readonly]="readonly" [disabled]="disabled" #myInput>
            </div>
            <span id="label_error_{{id}}" style="color: red; display: none;"></span>
        </div>
    `
})

export class InputTextComponent extends BaseComponent {
    inputType : string;
        
    ngOnInit() {
        this.readCommonsParameters(this.index);
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        this.inputType = crudComponentObj.inputType;
        let name = null;
        if (this.translateKey) {              
            name = this.translateKey;
        } else {
            name = this.name;
        }
        setTimeout(() => {
            if (this.translateKey) {
                name=this.translate.instant(name);
            }
            let width = this.width;
            $("input[name='"+name+"']").each(function() {
                $(this).width(width);
            });
        }, 50);  
       
        setTimeout(() => {
            if (this.value) {
                $('#'+this.id).attr('checked', 'true');
            }
        }, 50);
    }

    setValue(value:string){
        if (this.inputType == 'checkbox') {
            CrudComponentObj.getComponents(this.clazzName)[this.index].value = $('#'+this.id).is(':checked');
        } else {
            CrudComponentObj.getComponents(this.clazzName)[this.index].value = value;
        }
    }
}


