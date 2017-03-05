import { Injectable } from '@angular/core';
import { Id, InputType, EndPoint, MultiSelect, Chips, Select, Calendar } from '../index';

export class Report {
    constructor(public id: string) {
    }
}

export class CarPark {
    public checked : boolean;
    public id: number;
    public name: string;
    constructor () {
    }
}

@Injectable()
@EndPoint({
    Create : 'http://requestb.in/10h1r4i1',
    Read : '',
    Update : '',
    Delete : ''
    
})
export class Scheduling {
    constructor() {
    }
    
    @Id()
    public id: number;
    
    @InputType({
        name : 'User:',
        type : 'text',
        defaultValue : 'Cláudio Margulhano',
        readOnly : true,
        autoWidth : true,
        order : 0
    })
    public name: string;

    @InputType({
        name : 'Password:',
        type : 'password',
        defaultValue : '123',
        autoWidth : true,
        order : 1
    })
    public password: string;
    
    @InputType({
        name : 'Admin:',
        type : 'checkbox',
        defaultValue : true,
        order : 2
    })
    public admin: boolean;
    
            
    @MultiSelect({
        url : 'http://www.mocky.io/v2/58822b002800002d05cbd40d', 
        modelSelect : 'reportList',        
        modelSelectClazz : Report, 
        modelSelectValue : 'id',
        modelSelectLabel : 'name',
        disabled : true,
        order : 3
    })
    public reports: Report[];
    
    @Chips({
        disabled : false,
        autoWidth : true,
        order : 4
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
        order : 5
    })
    public period: string;
    
    @Calendar({
        disabled : false,
        autoWidth : true,
        order : 7,
        format : 'DD/MM/YYYY'
    })
    public date : string;
}

