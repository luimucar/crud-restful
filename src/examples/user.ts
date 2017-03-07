import { Injectable } from '@angular/core';
import { Configure, Id, InputType, MultiSelect, Chips, Select, Calendar, Checkboxes, Table } from '../index';

@Injectable()
@Configure({
    i18nPath : './assets/i18n'
})
export class User {
    @InputType({
        name : 'Password',
        type : 'password',
        autoWidth : true,
        order : 2
    })
    public passwordConfirmation;

    constructor(
        @InputType({
            name : 'User',
            translateKey : 'USERNAME',
            type : 'text',
            autoWidth : true,
            order : 1,
            tableColumn : 0,
            sortable : true
        })
        public username?: string, 
        @InputType({
            name : 'Confirmation',
            type : 'password',
            autoWidth : true,
            order : 3
        })        
        public password?:string, 
        public token?: string) {}
}