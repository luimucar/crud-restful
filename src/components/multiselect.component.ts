import { Component, Input } from '@angular/core';
import { CrudComponentObj } from '../index';
import { SelectItem } from 'primeng/primeng';
import { Service } from '../services/index';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'inputText',
    providers: [Service],
    template: `
        <div class="col-md-4">    
            <label>{{name}}</label>
        </div>
        <div class="col-md-8">    
            <p-multiSelect [options]="itens" [(ngModel)]="selectedItem" (onChange)="setValue($event.value)"></p-multiSelect>            
        </div>            
    `
})

export class MultiSelectComponent {
    constructor(public service: Service) {
    }
    
    @Input()
    index : number;
    
    @Input()
    name : string;
       
    itens: SelectItem[] = [];
    
    selectedItem: string[];
    
    ngOnInit() {
        CrudComponentObj.components[this.index].value = [];
        
        let crudComponentObj = CrudComponentObj.components[this.index];
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        this.getMultiSelectValues(crudComponentObj.url)
            .subscribe(values => {
                values.forEach(val => {
                    if (crudComponentObj.selectItemArray == null) {
                        this.itens.push({ label: val[crudComponentObj.selectItemLabel], value: val[crudComponentObj.selectItemValue] });
                    } else {
                        val[crudComponentObj.selectItemArray].forEach(val => {
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
        this.service.setHeader(null, false);
        return this.service.get(url);
    }
    
       
    setValue(value:string){
        let crudComponentObj = CrudComponentObj.components[this.index];
        let ret = new crudComponentObj.selectClazz();
        CrudComponentObj.components.forEach(obj => {
            ret[obj.name] = obj.value;
        });        
        CrudComponentObj.components[this.index].value.push(ret);
    }
}



