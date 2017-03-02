import { Injectable } from '@angular/core';
import { Id, InputType, EndPoint, MultiSelect, Chips, Select } from '../index';

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
        name : 'Admin:',
        type : 'checkbox',
        defaultValue : true
    })
    public admin: boolean;
    
            
    @MultiSelect({
        url : 'http://www.mocky.io/v2/58822b002800002d05cbd40d', 
        modelSelect : 'reportList',        
        modelSelectClazz : Report, 
        modelSelectValue : 'id',
        modelSelectLabel : 'name',
        disabled : true
    })
    public reports: Report[];
    
    @Chips({
        disabled : false
    })
    public mails: string[];
    
    @MultiSelect({
        url : 'http://www.mocky.io/v2/583ecaf7240000f20383b35d', 
        modelSelectClazz : CarPark, 
        modelSelectValue : 'id', 
        modelSelectLabel : 'name'
    })
    public carParks: CarPark[];
    
    @Select({
        values : [{"value" : 1, "label" : "Value 1"}, {"value" : 2, "label" : "Value 2"}, {"value" : 3, "label" : "Value 3"}],
        defaultValue : 2
    })
    public period: string;
}

