import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import * as $ from 'jquery';

@Component({
    selector: 'chipsCrudRestful',
    template: `
        <div class="row" id="chips{{clazzName}}{{index}}">
            <div class="col-md-{{colMdLeft}}">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-{{colMdRigth}}">    
                <p-chips [style.width]="width" [(ngModel)]="values" (onAdd)="add($event.value)" (onRemove)="remove($event.value)" [disabled]="disabled"></p-chips>
            </div>
            <span id="label_error_{{id}}" style="color: red; display: none;"></span>            
        </div>
    `
})

export class ChipsComponent extends BaseComponent {   
    ngOnInit() {
        this.readCommonsParameters(this.index);
        CrudComponentObj.getComponents(this.clazzName)[this.index].value = [];
    }
    
    add(value:string) {
        CrudComponentObj.getComponents(this.clazzName)[this.index].value.push(value);
    }
    
    remove(value:string) {
        var myArray: string[] = CrudComponentObj.getComponents(this.clazzName)[this.index].value;
        for (var i=myArray.length-1; i>=0; i--) {
            if (myArray[i] == value) {
                myArray.splice(i, 1);
            }
        }
        CrudComponentObj.getComponents(this.clazzName)[this.index].value = myArray;
        $("#label_error_"+this.clazzName+"_"+this.property).css('display', 'none');
    }
}



