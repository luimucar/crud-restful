import { Component, Input } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';

@Component({
    selector: 'inputText',
    template: `
        <div class="row">
            <div class="col-md-4">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-8">    
                <p-chips [(ngModel)]="values" (onAdd)="add($event.value)" (onRemove)="remove($event.value)" [disabled]="disabled"></p-chips>
            </div>            
        </div>
    `
})

export class ChipsComponent extends BaseComponent {
    @Input()
    index : number;
       
    values: string[];
    
    ngOnInit() {
        this.readCommonsParameters(this.index);
        CrudComponentObj.components[this.index].value = [];
    }
    
    add(value:string) {
        CrudComponentObj.components[this.index].value.push(value);
    }
    
    remove(value:string) {
        var myArray: string[] = CrudComponentObj.components[this.index].value;
        for (var i=myArray.length-1; i>=0; i--) {
            if (myArray[i] == value) {
                myArray.splice(i, 1);
            }
        }
        CrudComponentObj.components[this.index].value = myArray;
    }
}



