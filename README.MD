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
    url : 'http://www.mocky.io/v2/58bdc0e10f0000c3255c6857',
    rows : 10,
    paginator : true,
    pageLinks : 3,
    sortField : 'id',
    sortOrder : 1,   
    order : 0,
    emptyMessageKey : 'MSG.EMPTY_MESSAGE'
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
        name : 'Name',
        translateKey : 'NAME',
        type : 'text',
        autoWidth : true,
        order : 2,
        tableColumn : 1,
        sortable : true,
        required : true,
        requiredMsgKey : 'MESSAGE.FIELD_REQUIRED'
    })            
    name : string;
    
    @InputType({
        name : 'Full Name',
        translateKey : 'FULLNAME',
        type : 'text',
        autoWidth : true,
        order : 3,
        tableColumn : 2,
        sortable : true,
        required : true,
        requiredMsgKey : 'MESSAGE.FIELD_REQUIRED'
    })    
    fullName : string;   
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
<crud [clazz]="'Login'" [model]="login" (onSave)="handleOnSave($event)" (onRemove)="handleOnRemove" (onCancel)="handleOnCancel()"></crud>
```

<pre>
<b>- Inputs:</b>
[clazz] - required - The class name
[model] - optional - The instance of class with default values

<b>- Events:</b>
Save
Remove
Cancel
</pre>

### In the component initialize your object model with default values (if necessary) and handle the events:

```javascript
    .
    .
    .

    login : Login;

    constructor() {
        this.login = new Login();
        this.login.id = 1;
        this.login.name = 'cmargulhano@gmail.com';
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
    url : 'http://www.mocky.io/v2/58bdc0e10f0000c3255c6857',
    rows : 10,
    paginator : true,
    pageLinks : 3,
    sortField : 'id',
    sortOrder : 1,   
    order : 0,
    emptyMessage : 'MSG.EMPTY_MESSAGE'
})
export class Login {
    .
    .
    .
    @InputType({
        name : 'Name',
        translateKey : 'NAME',
        type : 'text',
        autoWidth : true,
        order : 2,
        tableColumn : 1,
        sortable : true,
        required : true,
        requiredMsgKey : 'MESSAGE.FIELD_REQUIRED'
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
    name : 'Name',
    translateKey : 'NAME',
    type : 'text',
    autoWidth : true,
    order : 2,
    tableColumn : 1,
    sortable : true,
    required : true,
    requiredMsgKey : 'MESSAGE.FIELD_REQUIRED'
})            
name : string;
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
## License

MIT © [Claudio Margulhano](mailto:cmargulhano@gmail.com)
