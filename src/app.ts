import { Component, NgModule, ViewChild, EventEmitter } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Http } from '@angular/http';
import { CrudModule } from './crud.module'
import { CrudComponent } from './crud.component'
import {TranslateService} from 'ng2-translate';
import { Scheduling } from './examples/scheduling'
import { User } from './examples/user'
import { Login } from './examples/login'
import * as moment from 'moment';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { getI18nPath } from './decorators';
import { PrimeNgModule } from './primeng.module';

@Component({
    selector: 'my-app',
    template: `
    <div style="width: 50%;">
        <crud [clazz]="'Login'" [broadcast]="broadcast" (onSave)="handleOnSave($event)" (onRemove)="handleOnRemove($event)" (onCancel)="handleOnCancel()"></crud>
        <div class="row" style="padding-top:20px;">
            <div class="col-md-12" style="padding-top:20px;">
                <button pButton type="button" (click)="i18n()" label="i18n"></button>
                <button pButton type="button" (click)="refresh()" label="Refresh"></button>
            </div>
        </div>        
    </div>
  `,
})
export class App {
    broadcast: EventEmitter<any> = new EventEmitter<any>();
    scheduling : Scheduling;
    user : User;
    @ViewChild(CrudComponent) crudComponent : CrudComponent;

    constructor(public translate: TranslateService) {
        translate.addLangs(["en-en", "pt-br"]);
        translate.setDefaultLang('en-en');
        translate.use('en-en');
        /*
        this.scheduling = new Scheduling();
        this.scheduling.name = 'Teste';
        this.scheduling.period = '3';
        this.scheduling.date1 = '01/01/2017';
        this.scheduling.date2 = moment("15/05/1979", "DD/MM/YYYY").toDate();

        this.user = new User('Cláudio');
        this.user.password = '123';
        this.user.passwordConfirmation = '123';
        */
    }
    
    handleOnSave(login : Login) {
        console.log('Save');
        console.log(login);
    }
    
    handleOnRemove(login : Login) {
        console.log('Remove');
        console.log(login);
    }

    handleOnCancel() {
        console.log('Cancel');
    }
        
    i18n() {
        this.translate.use('pt-br');
        this.crudComponent.notify();
    }
    
    refresh() {
        this.broadcast.emit();
    }
}

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, getI18nPath(), '.json');
}

@NgModule({
    imports: [BrowserModule, CrudModule, PrimeNgModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        })    
    ],
    declarations: [App],
    bootstrap: [App],
    providers: [Scheduling, User, Login]
})
export class AppModule {
}
