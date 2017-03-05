import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import * as moment from 'moment';

@Component({
    selector: 'calendarCrudRestful',
    template: `
        <div class="row">
            <div class="col-md-2">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-10">    
                <p-calendar [dateFormat]="formatComp" [(ngModel)]="date" [showIcon]="true" (onSelect)="onSelect($event)" [disabled]="disabled" [readonlyInput]="readonly"></p-calendar>
            </div>            
        </div>
    `
})

export class CalendarComponent extends BaseComponent {
    date : Date;
    formatComp : string;
    
    ngOnInit() {
        this.readCommonsParameters(this.index);
        if (this.format.indexOf('YYYY') >= 0) {
            this.formatComp = this.format.split('YYYY').join('yy').toLowerCase();
            console.log(this.formatComp);
        }
        let dateStr = CrudComponentObj.getComponents(this.clazzName)[this.index].value;
        this.date = moment(dateStr, this.format).toDate();
    }
    
    onSelect(value : any) {
        let dateStr = moment(value).format(this.format);
        CrudComponentObj.getComponents(this.clazzName)[this.index].value = dateStr;
    }
}



