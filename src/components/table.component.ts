import { Component, Input, EventEmitter } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import { Service } from '../services/index';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import {DataTable} from 'primeng/primeng';

@Component({
    selector: 'tableCrudRestful',
    template: `
        <div class="row" id="table{{clazzName}}{{index}}" style="margin-top : 20px; margin-bottom : 20px;">
            <div class="col-md-12">
                <p-dataTable #dt id="table" [value]="itens" selectionMode="single" [(selection)]="selected" (onRowSelect)="onRowSelect($event)" 
                    [sortField]="sortField" [sortOrder]="sortOrder"
                    [rows]="rows" [paginator]="paginator" [pageLinks]="pageLinks" [responsive]="true">
                    <p-column *ngFor="let col of cols" [field]="col.field" [header]="col.header" [sortable]="col.sortable"></p-column>
                    <p-footer>
                        <div class="ui-helper-clearfix" style="width:100%">
                            <button class="btn btn-primary btn-margin-vertical pull-left" type="button" (click)="newItem(dt)" style="margin-top: 5px;">
                                <strong>
                                    <i class="fa fa-plus"></i>&nbsp;{{ 'COMMON.BUTTON.ADD' | translate }}
                                </strong>
                            </button>
                        </div>
                    </p-footer>
                </p-dataTable>
            </div>
        </div>
    `
})

export class TableComponent extends BaseComponent {
    cols: any[] = [];
    itens: any[] = [];
    selected : any;
    dt : DataTable;
    
    @Input() broadcast: EventEmitter<any> = new EventEmitter<any>();
    
    constructor(public service: Service, private http: Http) {
        super();
    }
    
    ngOnInit() {
        this.readCommonsParameters(this.index);
        this.loadData();
        if (this.broadcast != undefined) {
            this.broadcast.subscribe(() => {
                this.readCommonsParameters(this.index);
                this.loadData();
                /*
                if (this.dt != undefined) {
                    this.dt.reset();
                    this.dt.sortField = CrudComponentObj.getComponents(this.clazzName)[this.index].sortField;
                    this.dt.sortOrder = CrudComponentObj.getComponents(this.clazzName)[this.index].sortOrder;
                }
                */
            });
        }
    }
    
    loadData() {
        this.cols = [];
        this.itens = [];
        setTimeout(() => {
            let emptyMessage = this.translate.instant(this.emptyMessage);
            $('.ui-datatable-emptymessage').html(emptyMessage);
        }, 50);        
        CrudComponentObj.getComponents(this.clazzName)[this.index].value = [];
        CrudComponentObj.getComponents(this.clazzName).forEach(comp => {
            if (comp.tableColumn != undefined && comp.tableColumn >= 0) {
                this.cols.push({ field: comp.property, header: comp.name, sortable: comp.sortable, order : comp.tableColumn });
            }
        });
        
        this.cols = this.cols.sort((o1,o2) => {
            if (o1.order > o2.order) {
                return 1;
            }

            if (o1.order < o2.order) {
                return -1;
            }
            return 0;
        });
        
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        setTimeout(() => {            
            if (crudComponentObj.fileConfig != undefined) {
                this.http.get(this.fileConfig).map(res => res.json())
                    .subscribe(config => {
                        let keys : string[] = this.fileConfigServerKey.split('.');
                        let server : any = null;
                        keys.forEach(key => {
                            if (server == null) {
                                server = config[key];
                            } else {
                                server = server[key];
                            }
                        });
                        this.getItens(server + crudComponentObj.url)
                            .subscribe(itens => {
                                itens.forEach(item => {
                                    this.itens.push(item);
                                });
                            },
                            error => {
                                console.log(error);
                            },
                            () => {
                                this.sort(crudComponentObj);
                            });                                        
                    });                
            } else {
                this.getItens(crudComponentObj.url)
                    .subscribe(itens => {
                        itens.forEach(item => {
                            this.itens.push(item);
                        });
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        this.sort(crudComponentObj);
                    });
            }                        
        }, 100);
    }
    
    sort(crudComponentObj : CrudComponentObj) {
        this.itens.sort((o1,o2) => {
            if (crudComponentObj.sortOrder == 1) {
                if (o1[crudComponentObj.sortField] > o2[crudComponentObj.sortField]) {
                    return 1;
                }
                if (o1[crudComponentObj.sortField] < o2[crudComponentObj.sortField]) {
                    return -1;
                }                                        
            } else {
                if (o1[crudComponentObj.sortField] < o2[crudComponentObj.sortField]) {
                    return 1;
                }
                if (o1[crudComponentObj.sortField] > o2[crudComponentObj.sortField]) {
                    return -1;
                }                                        
            }
            return 0;
        });
        
    }
    
    getItens(url : string): Observable<any[]> {
        return this.service.get(url);
    }    
    
    onRowSelect(event) {
        this.selected = event.data;
        CrudComponentObj.getComponents(this.clazzName).forEach(comp => {
            if (this.selected[comp.property]) {
                comp.value = this.selected[comp.property];
                $('#' + comp.clazzName + '_' + comp.property).val(this.selected[comp.property]);
            }
        });
        BaseComponent.showOrHideComponets(this.clazzName, 'block');
        BaseComponent.setShowRemove(this.clazzName, true);
        this.concreteSubject.notify('CRUD-COMPONENT');
    }
    
    newItem(dt : DataTable) {
        this.dt = dt;
        CrudComponentObj.getComponents(this.clazzName).forEach(comp => {
            comp.value = null;
            $('#' + comp.clazzName + '_' + comp.property).val(null);
        });
        BaseComponent.showOrHideComponets(this.clazzName, 'block');        
        BaseComponent.setShowRemove(this.clazzName, false);
        BaseComponent.setHideMsgError(this.clazzName, true);
        this.concreteSubject.notify('CRUD-COMPONENT');
    }
}



