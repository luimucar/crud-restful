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
        <crud [clazz]="'Login'" [model]="login" [broadcast]="broadcast" [buttons]="'Save,Remove,Cancel'" (onSave)="handleOnSave($event)" (onRemove)="handleOnRemove($event)" (onCancel)="handleOnCancel()" (onOk)="handleOnOk($event)"></crud>
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
    @ViewChild(CrudComponent) crudComponent : CrudComponent;
    login : Login = new Login();

    constructor(public translate: TranslateService) {
        translate.addLangs(["en-en", "pt-br"]);
        translate.setDefaultLang('en-en');
        translate.use('en-en');
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

    handleOnOk(login : Login) {
        console.log(login);
    }
                
    i18n() {
        this.translate.use('pt-br');
        this.crudComponent.notify();
    }
    
    refresh() {
        this.login.email = 'cmargulhano@gmail.com';
        this.broadcast.emit(this.login);
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
