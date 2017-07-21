import { Component } from '@angular/core';
import { CrudComponentObj } from '../index';
import { SelectItem } from 'primeng/primeng';
import { Service } from '../services/index';
import { Observable } from 'rxjs/Rx';
import { BaseComponent } from './base.component';
import { Util } from './util'

@Component({
    selector: 'multiSelectCrudRestful',
    providers: [Service],
    template: `
        <div class="row" id="multiselect{{clazzName}}{{index}}">
            <div class="col-md-{{colMdLeft}}">    
                <label>{{name}}</label>
            </div>
            <div class="col-md-{{colMdRigth}}">    
                <p-multiSelect [options]="itens" [(ngModel)]="selectedItem" (onChange)="setValue($event.value)"></p-multiSelect>            
                <span class="crudRestfulLabelError" id="label_error_{{id}}" style="color: red; display: none;"></span>            
            </div>
        </div>
    `
})

export class MultiSelectComponent extends BaseComponent {
    itens: SelectItem[] = [];
    
    selectedItem: string[];
    
    constructor(public service: Service) {
        super();
    }
    
    ngOnInit() {       
        this.readCommonsParameters(this.index);
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        this.getMultiSelectValues(crudComponentObj.url)
            .subscribe(values => {
                values = values.sort(Util.sortBy(crudComponentObj.selectItemLabel));
                values.forEach(val => {
                    if (crudComponentObj.selectItemArray == undefined) {
                        this.itens.push({ label: val[crudComponentObj.selectItemLabel], value: val[crudComponentObj.selectItemValue] });
                    } else {
                        val[crudComponentObj.selectItemArray].forEach((val:any) => {
                            this.itens.push({ label: val[crudComponentObj.selectItemLabel], value: val[crudComponentObj.selectItemValue] });                            
                        });
                    }
                });
            },
            error => {
                console.log(error);
            });
    }
    
    getMultiSelectValues(url : string): Observable<any[]> {
        return this.service.get(url);
    }
    
       
    setValue(value:string[]){
        let crudComponentObj = CrudComponentObj.getComponents(this.clazzName)[this.index];
        CrudComponentObj.getComponents(this.clazzName)[this.index].value = [];
        value.forEach(v => {
            let selectClazz = new crudComponentObj.selectClazz();
            selectClazz[crudComponentObj.selectItemValue] = v;
            this.itens.forEach(item => {
                if (item.value == v) {
                    selectClazz[crudComponentObj.selectItemLabel] = item.label;
                }
            });
            CrudComponentObj.getComponents(this.clazzName)[this.index].value.push(selectClazz);
        });
    }
}



