import { Component, Input } from '@angular/core';
import { CrudComponentObj } from '../index';

@Component({
    selector: 'inputText',
    template: `
        <div class="col-md-4">    
            <label>{{name}}</label>
        </div>
        <div class="col-md-8">    
            <input pInputText type="text" name="{{name}}" [value]="value" (keypress)="setValue(myInput.value)" (blur)="setValue(myInput.value)" #myInput>
        </div>            
    `
})

export class InputTextComponent {
    @Input()
    index : number;
    
    @Input()
    name : string;
    
    value : string = '';
    
    ngOnInit() {
        this.value = CrudComponentObj.components[this.index].value;
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1)
    }
    
    setValue(value:string){
        CrudComponentObj.components[this.index].value = value;
    }
}


