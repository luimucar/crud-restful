import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { CrudComponent } from './crud.component';
//import { PrimeNgModule } from '../../../../app/primeng.module';
import { InputTextComponent } from './input.component';
import { ControlFactoryDirective } from './control-factory.directive';

@NgModule({
    declarations: [CrudComponent, ControlFactoryDirective, InputTextComponent],
    imports: [BrowserModule, RouterModule/*, PrimeNgModule.forRoot()*/],
    exports : [CrudComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    entryComponents : [InputTextComponent]
})
export class CrudModule { }
