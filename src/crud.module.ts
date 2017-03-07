import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { CrudComponent } from './crud.component';
import { PrimeNgModule } from './primeng.module';
import { CrudFactoryDirective } from './crud-factory.directive';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './components/input.component';
import { MultiSelectComponent } from './components/multiselect.component';
import { ChipsComponent } from './components/chips.component';
import { SelectComponent } from './components/select.component';
import { CalendarComponent } from './components/calendar.component';
import { CheckboxesComponent } from './components/checkboxes.component';
import { TableComponent } from './components/table.component';
import { TranslateModule } from 'ng2-translate';
import { ConcreteSubject } from './components/observer/concrete-subject';
import { ConfirmationService } from 'primeng/primeng';
import { TranslateService } from 'ng2-translate';

@NgModule({
    declarations: [CrudComponent, CrudFactoryDirective, InputTextComponent, 
        MultiSelectComponent, ChipsComponent, SelectComponent,
        CalendarComponent, CheckboxesComponent, TableComponent],
    imports: [ReactiveFormsModule, FormsModule, HttpModule, BrowserModule, RouterModule, PrimeNgModule.forRoot(), TranslateModule,    
    ],
    exports : [CrudComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    entryComponents : [InputTextComponent, MultiSelectComponent, ChipsComponent, 
        SelectComponent, CalendarComponent, CheckboxesComponent, TableComponent],
    providers : [ConcreteSubject, ConfirmationService, TranslateService]
})
export class CrudModule { }
