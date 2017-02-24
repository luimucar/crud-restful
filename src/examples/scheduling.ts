import { Injectable } from '@angular/core';
import { InputType, SaveEndPoint, MultiSelect, Chips, Select } from '../index';

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
@SaveEndPoint('')
export class Scheduling {
    constructor() {
    }
    
    public id: number;
    
    @InputType(Scheduling, 'text')
    public name: string;
    
    @MultiSelect(Scheduling, 'http://www.mocky.io/v2/58822b002800002d05cbd40d', Report, 'reportList', 'id', 'name')
    public reports: Report[];
    
    @Chips(Scheduling)
    public mails: string[];
    
    @MultiSelect(Scheduling, 'http://www.mocky.io/v2/583ecaf7240000f20383b35d', CarPark, null, 'id', 'name')
    public carParks: CarPark[];
    
    @Select(Scheduling, [{"value" : 1, "label" : "Value 1"}, {"value" : 2, "label" : "Value 2"}, {"value" : 3, "label" : "Value 3"}])
    public period: string;
}

