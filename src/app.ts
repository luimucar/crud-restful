import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {CrudModule} from './crud.module'
import {Scheduling} from './examples/scheduling'

@Component({
  selector: 'my-app',
  template: `
    <div style="width: 50%;">
      <crud [clazz]="'Scheduling'"></crud>
    </div>
  `,
})
export class App {    
  constructor() {
  }
}

@NgModule({
  imports: [ BrowserModule, CrudModule],
  declarations: [ App ],
  bootstrap: [ App ],
  providers : [Scheduling]
})
export class AppModule {}
