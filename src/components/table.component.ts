import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { BaseComponent } from './base.component';
import { Service } from '../services/index';
import { Observable } from 'rxjs/Rx';
import * as $ from 'jquery';

@Component({
    selector: 'tableCrudRestful',
    template: `
        <div class="row">
            <div class="col-md-12">
                <p-dataTable id="table" [value]="itens" selectionMode="single" [(selection)]="selected" (onRowSelect)="onRowSelect($event)" [paginator]="true" rows="15" [responsive]="true">
                    <p-column *ngFor="let col of cols" [field]="col.field" [header]="col.header" [sortable]="col.sortable"></p-column>
                    <p-footer>
                        <div class="ui-helper-clearfix" style="width:100%">
                            <button class="btn btn-primary btn-margin-vertical pull-left" type="button" (click)="newItem()" style="margin-top: 5px;">
                                <strong>
                                    <i class="fa fa-plus"></i>&nbsp;New
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
    
    constructor(public service: Service) {
        super();
    }
    
    ngOnInit() {
        this.readCommonsParameters(this.index);
        CrudComponentObj.getComponents(this.clazzName)[this.index].value = [];
        CrudComponentObj.getComponents(this.clazzName).forEach(comp => {
            if (comp.tableColumn >= 0) {
                this.cols.push({ field: comp.property, header: comp.name, sortable: comp.sortable });                
            }
        });
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        this.getItens(crudComponentObj.url)
            .subscribe(itens => {
                itens.forEach(item => {
                    this.itens.push(item);
                });
            },
            error => {
                console.log(error);
            });
        
    }
    
    getItens(url : string): Observable<any[]> {
        this.service.setHeader(null, false);
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
    }
    
    newItem() {
        CrudComponentObj.getComponents(this.clazzName).forEach(comp => {
            comp.value = null;
            $('#' + comp.clazzName + '_' + comp.property).val(null);
        });        
    }   
}



