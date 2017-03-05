import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CrudModule } from './crud.module'
import { Scheduling } from './examples/scheduling'
import { User } from './examples/user'

@Component({
    selector: 'my-app',
    template: `
    <div style="width: 50%;">
      <crud [clazz]="'Scheduling'" [model]="scheduling" (onSave)="handleOnSave($event)" (onCancel)="handleOnCancel()"></crud>
    </div>
  `,
})
export class App {
    scheduling : Scheduling;
    user : User;
    constructor() {
        this.scheduling = new Scheduling();
        this.scheduling.name = 'Teste';
        this.scheduling.period = '3';
        this.scheduling.date = '01/01/2017';
        
        this.user = new User('Cláudio');
        this.user.password = '123';
        this.user.passwordConfirmation = '123';
    }
    handleOnSave(user : User) {
        console.log(user);
    }
    handleOnCancel() {
        console.log('Cancel');
    }    
}

@NgModule({
    imports: [BrowserModule, CrudModule],
    declarations: [App],
    bootstrap: [App],
    providers: [Scheduling, User]
})
export class AppModule {
}
