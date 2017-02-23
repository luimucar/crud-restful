import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { CrudComponent } from './crud.component';
import { PrimeNgModule } from './primeng.module';
import { CrudFactoryDirective } from './crud-factory.directive';
import { HttpModule } from '@angular/http';

import { InputTextComponent } from './components/input.component';
import { MultiSelectComponent } from './components/multiselect.component';
import { ChipsComponent } from './components/chips.component';

@NgModule({
    declarations: [CrudComponent, CrudFactoryDirective, InputTextComponent, MultiSelectComponent, ChipsComponent],
    imports: [HttpModule, BrowserModule, RouterModule, PrimeNgModule.forRoot()],
    exports : [CrudComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    entryComponents : [InputTextComponent, MultiSelectComponent, ChipsComponent]
})
export class CrudModule { }
