import { Injectable } from '@angular/core';
import { Configure, Id, InputType, MultiSelect, Chips, Select, Calendar, Checkboxes, Radioboxes, Table, Item } from '../index';

export class Report {
    constructor(public id: string) {
    }
}

export class CarPark {
    constructor (public id?: number, public name?: string, public checked? : boolean) {
    }
}

@Injectable()
@Configure({
    clazz : 'Scheduling',
    i18nPath : './assets/i18n'
})
export class Scheduling {
    constructor(
        @Id({
            clazz : 'Scheduling',
            order : 0
        })
        public id?: number) {
    }
    
    @InputType({
        clazz : 'Scheduling',
        name : 'User',
        translateKey : 'USERNAME',
        type : 'text',
        defaultValue : 'Cláudio Margulhano',
        readOnly : true,
        autoWidth : true,
        order : 1
    })
    public name: string;

    @InputType({
        clazz : 'Scheduling',
        name : 'Password',
        type : 'password',
        required : true,
        requiredMessageKey : 'MESSAGE.FIELD_REQUIRED',
        autoWidth : true,
        order : 2
    })
    public password: string;
    
    @InputType({
        clazz : 'Scheduling',
        name : 'Admin:',
        type : 'checkbox',
        defaultValue : true,
        order : 3
    })
    public admin: boolean;
    
            
    @MultiSelect({
        clazz : 'Scheduling',
        url : '/data/report.json', 
        modelSelect : 'reportList',        
        modelSelectClazz : Report, 
        modelSelectValue : 'id',
        modelSelectLabel : 'name',
        disabled : true,
        order : 4
    })
    public reports: Report[];
    
    @Chips({
        clazz : 'Scheduling',
        name : 'Email',
        disabled : false,
        autoWidth : true,       
        regexp : "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i",
        regexpMessage : 'Email is invalid',
        order : 5
    })
    public mails: string[];
    
    @MultiSelect({
        clazz : 'Scheduling',
        url : '/data/carpark.json', 
        modelSelectClazz : CarPark, 
        modelSelectValue : 'id', 
        modelSelectLabel : 'name',
        order : 6
    })
    public carParks: CarPark[];
    
    @Select({
        clazz : 'Scheduling',
        name: 'Period',
        property: 'period',
        values : [{"value" : null, "label" : "...::: Select :::..."}, {"value" : '1', "label" : "SELECT.VALUE_01"}, {"value" : '2', "label" : "SELECT.VALUE_02"}, {"value" : '3', "label" : "SELECT.VALUE_03"}],
        required : true,
        requiredMessageKey : 'MESSAGE.FIELD_REQUIRED',
        defaultValue : null,
        order : 7,
        translateKeyByValue : true
    })
    public period: string;
    
    @Calendar({
        clazz : 'Scheduling',
        disabled : false,
        autoWidth : true,
        order : 8,
        format : 'DD/MM/YYYY'
    })
    public date1 : string;
    
    @Calendar({
        clazz : 'Scheduling',
        disabled : false,
        autoWidth : true,
        order : 9,
        format : 'DD/MM/YYYY'
    })
    public date2 : Date;

    @Checkboxes({
        clazz : 'Scheduling',
        name : 'Itens',
        disabled : false,
        autoWidth : true,
        defaultValue : 1,
        order : 10,
        values : [new Item(1, 'Value 1', true),
                  new Item(2, 'Value 2', false),
                  new Item(3, 'Value 3', true)]
    })
    public itensCheckboxes : Item[];
    
    @Radioboxes({
        clazz : 'Scheduling',
        name : 'Itens',
        disabled : false,
        autoWidth : true,
        defaultValue : 1,
        order : 10,
        values : [new Item(1, 'Value 1', true),
                  new Item(2, 'Value 2', false)],
        target : 'selectedRadiobox'
    })
    public itensRadioboxes : Item[];
    
    public selectedRadiobox : number;    
}

