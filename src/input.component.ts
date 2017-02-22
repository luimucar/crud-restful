import { Component, Input } from '@angular/core';
import { CrudComponentObj } from './index';

@Component({
    selector: 'inputText',
    template: `
        <label>{{name}}</label>
        <input type="text" name="{{name}}" [value]="value" (keypress)="setValue(myInput.value)" (blur)="setValue(myInput.value)" #myInput>
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


