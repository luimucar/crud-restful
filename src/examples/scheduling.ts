import { Injectable } from '@angular/core';
import { InputType, SaveEndPoint, MultiSelect, Chips } from '../index';

@Injectable()
@SaveEndPoint('')
export class Scheduling {
    constructor() {
    }
    
    public id: number;
    
    @InputType(Scheduling, 'text')
    public name: string;
    
    //@MultiSelect(Scheduling, 'http://www.mocky.io/v2/58822b002800002d05cbd40d', 'reportList', 'id', 'name', Report)
    //public reports: Report[];
    
    @Chips(Scheduling)
    public mails: string[];
    
    @MultiSelect(Scheduling, 'http://www.mocky.io/v2/583ecaf7240000f20383b35d', CarPark, null, 'id', 'name')
    public carParks: CarPark[];
}

export class Report {
    constructor(public id: string) {
    }
}

export class CarPark {
    public checked : boolean;
    constructor (public id?: number, public name?: string) {
    }
}