import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import * as moment from 'moment';

@Component({
    selector: 'calendarCrudRestful',
    template: `
        <div class="row" id="calendar{{clazzName}}{{index}}">
            <div class="col-md-{{colMdLeft}}">    
                <label id="label_{{id}}">{{name}}</label>
            </div>
            <div class="col-md-{{colMdRigth}}">    
                <p-calendar id="{{id}}" [dateFormat]="formatComp" [(ngModel)]="date" [showIcon]="true" (onSelect)="onSelect($event)" [disabled]="disabled" [readonlyInput]="readonly"></p-calendar>
            </div>   
            <span id="label_error_{{id}}" style="color: red; display: none;"></span>         
        </div>
    `
})

export class CalendarComponent extends BaseComponent {
    date : Date;
    formatComp : string;
    
    ngOnInit() {
        this.readCommonsParameters(this.index);
        if (this.format.indexOf('YYYY') >= 0) {
            this.formatComp = this.format.split('YYYY').join('YY').toLowerCase();
        }
        if (typeof CrudComponentObj.getComponents(this.clazzName)[this.index].value == "object") {
            if (CrudComponentObj.getComponents(this.clazzName)[this.index].value == null) {
                this.date = new Date();
            } else {
                this.date = CrudComponentObj.getComponents(this.clazzName)[this.index].value;
            }
        } else {
            let dateStr = CrudComponentObj.getComponents(this.clazzName)[this.index].value;
            this.date = moment(dateStr, this.format).toDate();
        }
        if (CrudComponentObj.getComponents(this.clazzName)[this.index].typeOfObject == 'Date') {
            CrudComponentObj.getComponents(this.clazzName)[this.index].value = this.date;
        } else {
            CrudComponentObj.getComponents(this.clazzName)[this.index].value = moment(this.date, this.format).format(this.format);
        }
    }
    
    onSelect(newDate : any) {
        if (typeof CrudComponentObj.getComponents(this.clazzName)[this.index].value == "object") {
            CrudComponentObj.getComponents(this.clazzName)[this.index].value = newDate;
        } else {
            let dateStr = moment(newDate).format(this.format);
            CrudComponentObj.getComponents(this.clazzName)[this.index].value = dateStr;
        }
    }
}



