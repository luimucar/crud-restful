import { Component, Input } from '@angular/core';
import { CrudComponentObj } from '../index';

@Component({
    selector: 'inputText',
    template: `
        <div class="col-md-4">    
            <label>{{name}}</label>
        </div>
        <div class="col-md-8">    
            <p-chips [(ngModel)]="values" (onAdd)="add($event.value)" (onRemove)="remove($event.value)"></p-chips>
        </div>            
    `
})

export class ChipsComponent {
    @Input()
    index : number;
    
    @Input()
    name : string;
    
    values: string[];
    
    ngOnInit() {
        CrudComponentObj.components[this.index].value = [];
        //this.value = CrudComponentObj.components[this.index].value;
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1)
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



