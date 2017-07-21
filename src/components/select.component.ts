import { Component, EventEmitter, Input } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import { Service } from '../services/index';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
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
                if (value) {
                    let newValue = value[this.property];
                    $("#" + this.id).val(newValue).change();
                }
            });
        }
    }

    loadData() {
        setTimeout(() => {
            let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
            if (this.values == null) {
                if (crudComponentObj.url) {
                    if (crudComponentObj.fileConfig != undefined) {
                        this.http.get(this.fileConfig).map(res => res.json())
                            .subscribe(config => {
                                let keys: string[] = this.fileConfigServerKey.split('.');
                                let server: any = null;
                                keys.forEach(key => {
                                    if (server == null) {
                                        server = config[key];
                                    } else {
                                        server = server[key];
                                    }
                                });
                                this.loadDataFromUrl(crudComponentObj, server);
                            });
                    } else {
                        this.loadDataFromUrl(crudComponentObj);
                    }
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

    loadDataFromUrl(crudComponentObj: CrudComponentObj, server? : string) {
        this.values = [];
        let url;
        if (server) {
            url = server + crudComponentObj.url;
        } else {
            url = crudComponentObj.url;
        }
        this.getSelectValues(url)
            .subscribe(values => {
                let field = crudComponentObj.selectItemLabel;
                values = values.sort((left, right): number => {
                    if (left[field] < right[field]) {
                        return -1;
                    } else if (left[field] > right[field]) {
                        return 1;
                    }
                    return 0;
                });
                values.forEach(val => {
                    this.values.push({ label: val[crudComponentObj.selectItemLabel], value: val[crudComponentObj.selectItemValue] });
                });
                $("#" + this.id).val(crudComponentObj.defaultValue).change();
            },
            error => {
                console.log(error);
            });
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