import { Component, Input, EventEmitter } from '@angular/core';
import { CrudComponentObj, setObject } from '../index';
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
                <p-inputMask *ngIf="mask" name="{{name}}" [inputId]="id" [style.width]="width" [value]="value" (click)="setValue(myInput.value)" (keypress)="setValue(myInput.value)" (blur)="setValue(myInput.value)" [readonly]="readonly" [disabled]="disabled" #myInput [mask]="mask"></p-inputMask>
                <input *ngIf="!mask" [style.width]="width" pInputText id="{{id}}" type="{{inputType}}" name="{{name}}" [value]="value" (click)="setValue(myInput.value)" (keypress)="setValue(myInput.value)" (blur)="setValue(myInput.value)" [readonly]="readonly" [disabled]="disabled" #myInput>
                <span class="crudRestfulLabelError" id="label_error_{{id}}" style="color: red; display: none;"></span>                
            </div>
        </div>
    `
})

export class InputTextComponent extends BaseComponent {
    @Input() broadcast: EventEmitter<any> = new EventEmitter<any>();
    
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
            let style = this.style;
            if (style != undefined) {
                $("input[name='"+name+"']").each(function() {
                    style.split(';').forEach(value => {
                        let kv : any[] = value.split(':');
                        $(this).css(kv[0], kv[1]);
                    });
                });
            }
        }, 50);  
       
        setTimeout(() => {
            if (this.value) {
                $('#'+this.id).prop('checked', 'true');
            }
        }, 50);

        let id = this.id;        
        if (this.broadcast != undefined) {
            let clazzName = this.clazzName;
            let property = this.property;
            this.broadcast.subscribe((value : any) => {
                if (value != undefined && value[property] != undefined) {
                    setObject(clazzName, value);
                    $("#" + id).val(value[property]);
                    if (this.inputType == 'checkbox') {
                        this.value = value[property];
                        $('#'+this.id).prop('checked', value[property]);
                    }
                }
            });
        }   
    }

    setValue(value:string){
        if (this.inputType == 'checkbox') {
            CrudComponentObj.getComponents(this.clazzName)[this.index].value = $('#'+this.id).is(':checked');
        } else {
            CrudComponentObj.getComponents(this.clazzName)[this.index].value = value;
        }
    }
}


