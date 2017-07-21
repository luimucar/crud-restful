import { Component, EventEmitter, Input } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import { Service } from '../services/index';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import { Util } from './util'

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
    lang: string;
    @Input() broadcast: EventEmitter<any> = new EventEmitter<any>();

    constructor(public service: Service, private http: Http) {
        super();
        setTimeout(() => {
            this.lang = this.translate.currentLang;
        }, 50);
    }

    ngOnInit() {
        this.readCommonsParameters(this.index);
        this.loadData();

        if (this.broadcast != undefined) {
            this.broadcast.subscribe((value: any) => {
                let newValue = value[this.property];
                $("#" + this.id).val(newValue).change();
            });
        }
    }

    loadData() {
        setTimeout(() => {
            let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
            if (this.values == null) {
                if (crudComponentObj.url) {
                    this.values = [];
                    this.getSelectValues(crudComponentObj.url)
                        .subscribe(values => {
                            values = values.sort(Util.sortBy(crudComponentObj.selectItemLabel));
                            values.forEach(val => {
                                this.values.push({ label: val[crudComponentObj.selectItemLabel], value: val[crudComponentObj.selectItemValue] });                            
                            });
                            $("#" + this.id).val(crudComponentObj.defaultValue).change();
                        },
                        error => {
                            console.log(error);
                        });

                } else {
                    this.values.forEach(value => {
                        if (this.translateKeyByValue) {
                            if (value['labelTranslateKey'] == undefined) {
                                value['labelTranslateKey'] = value['label'];
                                value['label'] = this.translate.instant(value['label']);
                            } else {
                                value['label'] = this.translate.instant(value['labelTranslateKey']);
                            }
                        }
                        $("#" + this.id).val(this.value).change();
                    })
                }
            }
        }, 100);
    }

    onChangeObj(value: any) {
        CrudComponentObj.getComponents(this.clazzName)[this.index].value = value;
    }

    public notify(): void {
        this.loadData();
    }

    getSelectValues(url: string): Observable<any[]> {
        return this.service.get(url);
    }
}





