import { Injectable } from '@angular/core';
import { Id, InputType, EndPoint, MultiSelect, Chips, Select } from '../index';

@Injectable()
export class User {
    constructor() {
    }
    
    @Id()
    public id: number;
    
    @InputType({
        name : 'User:',
        type : 'text',
        defaultValue : 'Cláudio Margulhano',
        readOnly : true
    })
    public name: string;

    @InputType({
        name : 'Password:',
        type : 'password',
        defaultValue : '123'
    })
    public password: string;
    
    @InputType({
        name : 'Password confirmation:',
        type : 'password',
        defaultValue : '123'
    })
    public passwordConfirmation: string; 
       
}

