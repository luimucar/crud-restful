# crud-restful - UNDER DEVELOPMENT

UNDER DEVELOPMENT

This component aims to facilitate the construction of interfaces in Angular 2.
This component provides high-level interface components using PrimeNG.
The use of this component generates a great gain of productivity and flexibility in the construction of the interfaces.
All components are created at runtime based on Decorators and Metadatas that provides information such as field positioning, combos content and component configuration.


## Libraries dependencies

Installation of dependencies:

1. primeng: http://www.primefaces.org/primeng/#/setup
2. jQuery : https://www.npmjs.com/package/jquery
3. ng2-translate : https://www.npmjs.com/package/ng2-translate
4. moment : https://www.npmjs.com/package/moment
5. font-awesome : https://www.npmjs.com/package/font-awesome

<br><br>
## Library installation

To install this library, run:

```bash
$ npm install crud-restful --save
```
<br><br>
## Ho to use

### Describe your model with Decorators and Metadatas. Example:

```javascript
import { Configure, Id, InputType, MultiSelect, Chips, Select, Calendar, Checkboxes, Table } from '../index';

@Table({
    name : 'tableUser',
    url : '/data/login.json',  
    rows : 10,
    paginator : true,
    pageLinks : 3,
    sortField : 'id',
    sortOrder : 1,   
    order : 0,
    emptyMessageKey : 'MESSAGE.NO_DATA',
    autoHide : true
})
@Configure({
    i18nPath : './assets/i18n'
})
export class Login {
    @InputType({
        name : 'Id',
        type : 'text',
        readOnly : true,
        disabled : true,
        autoWidth : true,
        order : 1,
        tableColumn : 0,
        sortable : true
    })    
    id : number;

    @InputType({
        name : 'Email',
        translateKey : 'EMAIL',
        type : 'text',
        autoWidth : true,
        order : 2,
        tableColumn : 2,
        sortable : true,
        required : true,
        requiredMessageKey : 'MESSAGE.FIELD_REQUIRED',
        regexp : "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i",
        regexpMessage : 'Email is invalid'
    })            
    name : string;
    
    @InputType({
        name : 'Full Name',
        translateKey : 'FULLNAME',
        type : 'text',
        autoWidth : true,
        order : 3,
        tableColumn : 1,
        sortable : true,
        required : true,
        requiredMessageKey : 'MESSAGE.FIELD_REQUIRED',
        style : 'color: blue;font-style: italic;'
    })    
    fullname : string;   
}
```

Result:

![alt tag](https://github.com/cmargulhano/crud-restful/blob/master/demo.gif)

### Import in your module:

```javascript
import {CrudModule} from 'crud-restful/index';
```

### In your HTML template:

```html
<crud [buttons]="'Ok,Save,Remove,Cancel'" [clazz]="'Login'" [model]="login" [broadcast]="broadcast" (onSave)="handleOnSave($event)" (onRemove)="handleOnRemove($event)" (onCancel)="handleOnCancel()" (onOk)="handleOnOk($event)"></crud>
```

<pre>
<b>- Inputs:</b>
[buttons] - required : Visible buttons : Ok, Save, Remove, Cancel
[clazz] - required : The class name
[model] - optional : The instance of class with default values
[broadcast] - optional : Emit events to update the table

<b>- Events:</b>
Ok
Save
Remove
Cancel
</pre>

### In the component initialize your object model with default values (if necessary) and handle the events:

```javascript
    .
    .
    .

    broadcast: EventEmitter<any> = new EventEmitter<any>();
    login : Login;

    constructor() {
        this.login = new Login();
        this.login.id = 1;
        this.login.email = 'cmargulhano@gmail.com';
        this.login.fullname = 'Cláudio Margulhano';
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

    refreshTable() {
        this.broadcast.emit();
    }

    i18n() {
        this.translate.use('pt-br');
        this.crudComponent.notify();
    }    

    changeEmail () {
        this.broadcast.emit('{"email" : "cmargulhano@hotmail.com"}');
    }
    .
    .
    .
```
<br><br>
## Playground of components: http://localhost:8080

```bash
git clone https://github.com/cmargulhano/crud-restful.git
npm install
npm start
```
<br><br>
## Components

### Table - class decorator

Example:

```javascript
@Table({
    name : 'tableUser',
    url : '/data/login.json', 
    rows : 10,
    paginator : true,
    pageLinks : 3,
    sortField : 'id',
    sortOrder : 1,   
    order : 0,
    emptyMessageKey : 'MESSAGE.NO_DATA',
    autoHide : true
})
export class Login {
    .
    .
    .
    @InputType({
        name : 'Email',
        translateKey : 'EMAIL',
        type : 'text',
        autoWidth : true,
        order : 2,
        tableColumn : 2,
        sortable : true,
        required : true,
        requiredMessageKey : 'MESSAGE.FIELD_REQUIRED',
        regexp : "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i",
        regexpMessage : 'Email is invalid',
        style : 'color: blue;font-style: italic;'
    })            
    name : string;
    .
    .
    .
}
````

The decorator @InputType needs to inform news parameters for the table component:
<br>
<b>tableColumn</b> parameter defines the order of column in the table.<br>
<b>sortable</b> parameter defines if the column will be sortable.<br>
<br>

### InputType - property decorator

Example:

```javascript
@InputType({
    name : 'Email',
    translateKey : 'EMAIL',
    type : 'text',
    autoWidth : true,
    order : 2,
    tableColumn : 2,
    sortable : true,
    required : true,
    requiredMessageKey : 'MESSAGE.FIELD_REQUIRED',
    regexp : "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i",
    regexpMessage : 'Email is invalid',
    style : 'color: blue;font-style: italic;'
})            
email : string;

    @InputType({
        name : 'Phone Number',
        type : 'text',
        autoWidth : true,
        order : 4,
        tableColumn : 3,
        sortable : true,
        required : false,
        requiredMessageKey : 'MESSAGE.FIELD_REQUIRED',
        style : 'color: pink;'
        mask : '(999) 999-9999'
    })    
    phonenumber : string;
```

### MultiSelect - property decorator

Example:

```javascript
@MultiSelect({
    url : 'http://www.mocky.io/v2/58822b002800002d05cbd40d', 
    modelSelect : 'reportList',        
    modelSelectClazz : Report, 
    modelSelectValue : 'id',
    modelSelectLabel : 'name',
    disabled : true,
    order : 3
})
public reports: Report[];
```

### Chips - property decorator

```javascript
@Chips({
    disabled : false,
    autoWidth : true,
    order : 4
})
public mails: string[];
```

### Select - property decorator

Example:

```javascript
@Select({
    values : [{"value" : 1, "label" : "Value 1"}, {"value" : 2, "label" : "Value 2"}, {"value" : 3, "label" : "Value 3"}],
    defaultValue : 2,
    order : 5
})
public period: string;
```

### Calendar - property decorator

Example:

Using string object:

```javascript
@Calendar({
    disabled : false,
    autoWidth : true,
    order : 7,
    format : 'DD/MM/YYYY'
})
public date : string;
```

Or using Date object:

```javascript
@Calendar({
    disabled : false,
    autoWidth : true,
    order : 7,
    format : 'DD/MM/YYYY'
})
public date : Date;
```

Posible formats:

1. DD/MM/YYYY
2. MM/DD/YYYY
3. YYYY/MM/DD

### Checkboxes - property decorator

Example:

```javascript
@Checkboxes({
    disabled : false,
    autoWidth : true,
    order : 8,
    values : [new CarPark(1, 'Value 1', false),
              new CarPark(2, 'Value 2', false)]
})
public allCarParks : CarPark[];
```

### Scheduling (under development)

### Dual List Box (under development)

<br><br>
## Internationalization

Crud-restful uses Ng2-translate component to translate the interface.

### Configuration

By default, Crud-restful will search for files in assets/i18n/*.json.
If you want you can customize this behavior by changing the path (attribute <b>i18nPath</b>) of the files with the decorator <b>@Config</b>, example:

```javascript
@Configure({
    i18nPath : './assets/i18n'
})
```

All decorators have the <b>translateKey</b> parameter which refers to the translation key of the json file.<br>
The exception is the <b>@Table</b> decorator that has the parameter <b>emptyMessageKey</b> that refers to the "Records not found" message.<br>
<br><br>
If you change the used language of Ng2-Translate you need to refresh the translation in your App. Example:
<br>

```javascript
export class App {
    @ViewChild(CrudComponent) crudComponent : CrudComponent;

    refreshI18N() {
        this.translate.use('pt-br');
        this.crudComponent.notify();
    }
...
```

<br><br>

## Auth

If you need, you can use bearer tokens in HTTP requests, for example:

```javascript
import { Configuration } from 'crud-restful/index';
```

```javascript
Configuration.token = 'bearer 96549c0e-dab8-4d05-9d62-33cbd320b152';
```

<br><br>
## License

MIT © [Claudio Margulhano](mailto:cmargulhano@gmail.com)
