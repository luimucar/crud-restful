import { Injectable } from '@angular/core';
import { Id, InputType, MultiSelect, Chips, Select } from '../index';

@Injectable()
export class User {
    @InputType({
        name : 'Password:',
        type : 'password',
        autoWidth : true,
        order : 1
    })
    public passwordConfirmation;

    constructor(
        @InputType({
            name : 'User:',
            type : 'text',
            readOnly : true,
            disabled : true,            
            autoWidth : true,
            order : 0
        })
        public username?: string, 
        @InputType({
            name : 'Confirmation:',
            type : 'password',
            autoWidth : true,
            order : 2
        })        
        public password?:string, 
        public token?: string) {}
}