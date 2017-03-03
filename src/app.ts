import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CrudModule } from './crud.module'
import { Scheduling } from './examples/scheduling'
import { User } from './examples/user'

@Component({
    selector: 'my-app',
    template: `
    <div style="width: 50%;">
      <crud [clazz]="'Scheduling'" (onSave)="handleOnSave($event)" (onCancel)="handleOnCancel()"></crud>
    </div>
  `,
})
export class App {
    constructor() {
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
