import { Injectable } from '@angular/core';
import { Id, InputType, EndPoint, MultiSelect, Chips, Select } from '../index';

@Injectable()
export class User {
    constructor(
        @InputType({
            name : 'User:',
            type : 'text',
            defaultValue : 'Cláudio Margulhano',
            readOnly : true,
            order : 0
        })public name?: string) {
    }
    
    @Id()
    public id: number;
    

    @InputType({
        name : 'Password:',
        type : 'password',
        defaultValue : '123',
        order : 1
    })
    public password: string;
    
    @InputType({
        name : 'Password confirmation:',
        type : 'password',
        defaultValue : '123',
        order : 2
    })
    public passwordConfirmation: string; 
       
}

