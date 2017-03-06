import { Injectable } from '@angular/core';
import { Configure, Id, InputType, MultiSelect, Chips, Select, Calendar, Checkboxes, Table } from '../index';

@Injectable()
@Table({
    name : 'tableUser',
    url : 'http://www.mocky.io/v2/58bdb28e0f000082245c6832',
    order : 0
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