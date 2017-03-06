import { Injectable } from '@angular/core';
import { Configure, Id, InputType, MultiSelect, Chips, Select, Calendar, Checkboxes } from '../index';

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
    i18nPath : './assets/i18n',
})
export class Scheduling {
    constructor() {
    }
    
    @Id( {
        order : 0
    })
    public id: number;
    
    @InputType({
        name : 'User:',
        translateKey : 'USERNAME',
        type : 'text',
        defaultValue : 'Cláudio Margulhano',
        readOnly : true,
        autoWidth : true,
        order : 1
    })
    public name: string;

    @InputType({
        name : 'Password:',
        type : 'password',
        defaultValue : '123',
        autoWidth : true,
        order : 2
    })
    public password: string;
    
    @InputType({
        name : 'Admin:',
        type : 'checkbox',
        defaultValue : true,
        order : 3
    })
    public admin: boolean;
    
            
    @MultiSelect({
        url : 'http://www.mocky.io/v2/58822b002800002d05cbd40d', 
        modelSelect : 'reportList',        
        modelSelectClazz : Report, 
        modelSelectValue : 'id',
        modelSelectLabel : 'name',
        disabled : true,
        order : 4
    })
    public reports: Report[];
    
    @Chips({
        disabled : false,
        autoWidth : true,
        order : 5
    })
    public mails: string[];
    
    @MultiSelect({
        url : 'http://www.mocky.io/v2/583ecaf7240000f20383b35d', 
        modelSelectClazz : CarPark, 
        modelSelectValue : 'id', 
        modelSelectLabel : 'name',
        order : 6
    })
    public carParks: CarPark[];
    
    @Select({
        values : [{"value" : '1', "label" : "Value 1"}, {"value" : '2', "label" : "Value 2"}, {"value" : '3', "label" : "Value 3"}],
        defaultValue : 2,
        order : 7
    })
    public period: string;
    
    @Calendar({
        disabled : false,
        autoWidth : true,
        order : 8,
        format : 'DD/MM/YYYY'
    })
    public date1 : string;
    
    @Calendar({
        disabled : false,
        autoWidth : true,
        order : 9,
        format : 'DD/MM/YYYY'
    })
    public date2 : Date;

     @Checkboxes({
        disabled : false,
        autoWidth : true,
        order : 10,
        values : [new CarPark(1, 'Value 1', false),
                  new CarPark(2, 'Value 2', false)]
    })
    public allCarParks : CarPark[];
}

