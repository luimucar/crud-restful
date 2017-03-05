import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';

@Component({
    selector: 'chipsCrudRestful',
    template: `
        <div class="row">
            <div class="col-md-2">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-10">    
                <p-chips [style.width]="width" [(ngModel)]="values" (onAdd)="add($event.value)" (onRemove)="remove($event.value)" [disabled]="disabled"></p-chips>
            </div>            
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
    }
}



