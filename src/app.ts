import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {CrudModule} from './crud.module'
import {Sample} from './sample'

@Component({
  selector: 'my-app',
  template: `
    <div>
      <crud></crud>
    </div>
  `,
})
export class App {    
  constructor() {
      new Sample();
  }
}

@NgModule({
  imports: [ BrowserModule, CrudModule],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}
