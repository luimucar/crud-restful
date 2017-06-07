import { Component, EventEmitter, Input } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import * as $ from 'jquery';

@Component({
    selector: 'selectCrudRestful',
    template: `
        <div class="row" id="select{{clazzName}}{{index}}">
            <div class="col-md-{{colMdLeft}}">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-{{colMdRigth}}">    
                <select id="{{id}}" [style.width]="width" (change)="onChangeObj($event.target.value)">
                    <option id="select_{{clazzName}}_{{i}}" [value]="item.value" *ngFor="let item of values; let i = index">{{item.label}}</option>
                </select>
                <span class="crudRestfulLabelError" id="label_error_{{id}}" style="color: red; display: none;"></span>
            </div>
        </div>
    `
})

export class SelectComponent extends BaseComponent {   
    @Input() broadcast: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
        this.readCommonsParameters(this.index);
        this.loadData();      

        if (this.broadcast != undefined) {
            this.broadcast.subscribe((value : any) => {
                let newValue = value[this.property];
                $("#"+this.id).val(newValue).change();
            });
        }   
    }
    
    loadData() {
        setTimeout(() => {
            this.values.forEach(value => {
                if (this.translateKeyByValue) {
                    if (value['labelTranslateKey'] == undefined) {
                        value['labelTranslateKey'] = value['label'];
                        value['label'] = this.translate.instant(value['label']);
                    } else {
                        value['label'] = this.translate.instant(value['labelTranslateKey']);
                    }
                }
                $("#"+this.id).val(this.value).change();
            })
        }, 100);        
    }
    
    onChangeObj(value:any) {
        CrudComponentObj.getComponents(this.clazzName)[this.index].value = value;
    }
    
    public notify(): void {
        this.loadData();
    }
}    





