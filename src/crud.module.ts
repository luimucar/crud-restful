import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { CrudComponent } from './crud.component';
import { PrimeNgModule } from './primeng.module';
import { CrudFactoryDirective } from './crud-factory.directive';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './components/input.component';
import { MultiSelectComponent } from './components/multiselect.component';
import { ChipsComponent } from './components/chips.component';
import { SelectComponent } from './components/select.component';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { getI18nPath } from './decorators';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, getI18nPath(), '.json');
}

@NgModule({
    declarations: [CrudComponent, CrudFactoryDirective, InputTextComponent, MultiSelectComponent, ChipsComponent, SelectComponent],
    imports: [ReactiveFormsModule, FormsModule, HttpModule, BrowserModule, RouterModule, PrimeNgModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),    
    ],
    exports : [CrudComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    entryComponents : [InputTextComponent, MultiSelectComponent, ChipsComponent, SelectComponent]
})
export class CrudModule { }
