# crud-restful - UNDER DEVELOPMENT

UNDER DEVELOPMENT

This component aims to facilitate the construction of interfaces in Angular 2.
This component provides high-level interface components using PrimeNG.
The use of this component generates a great gain of productivity and flexibility in the construction of the interfaces.
All components are created at runtime based on Decorators and Metadatas that provides information such as field positioning, combos content and component configuration.


## Prerequisites

Installation of dependencies:

1. primeng: http://www.primefaces.org/primeng/#/setup
2. jquery
3. ng2-translate
4. moment
5. font-awesome


## Library's installation

To install this library, run:

```bash
$ npm install crud-restful --save
```

## Ho to use

## Describe your model with Decorators. Example:

```javascript
import { InputType } from 'crud-restful/index';

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
export class User {
    @InputType({
        name : 'Password:',
        type : 'password',
        autoWidth : true,
        order : 1
    })
    public passwordConfirmation;

    constructor(
        @InputType({
            name : 'User:',
            type : 'text',
            readOnly : true,
            disabled : true,            
            autoWidth : true,
            order : 0
        })
        public username?: string, 
        @InputType({
            name : 'Confirmation:',
            type : 'password',
            autoWidth : true,
            order : 2
        })        
        public password?:string, 
        public token?: string) {}
}
```

Result:

![alt tag](https://github.com/cmargulhano/crud-restful/blob/master/demo.gif)

## Import in your module:

```javascript
import {CrudModule} from 'crud-restful/index';
import {User} from 'user';
```

## In your HTML template:

```html
<crud [clazz]="'User'" [model]="user" (onSave)="handleOnSave($event)" (onCancel)="handleOnCancel()"></crud>
```

## In the component initialize your object model (if necessary) and handle the events of Save and Cancel:

```javascript
    .
    .
    .

    user : User;

    constructor() {
        this.user = new User('Cláudio Margulhano');
    }
    
    handleOnSave(user : User) {
        console.log(user);
    }
    handleOnCancel() {
        this.display = false;
    }

    .
    .
    .
```
## Playground of components: http://localhost:8080

```bash
git clone https://github.com/cmargulhano/crud-restful.git
npm install
npm start
```

## Components

## Table - class decorator

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
}
````

## InputType - property decorator

Example:

```javascript
@InputType({
    name : 'User:',
    type : 'text',
    readOnly : true,
    disabled : true,            
    autoWidth : true,
    order : 0
})
username: string;
```

## MultiSelect - property decorator

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

## Chips - property decorator

```javascript
@Chips({
    disabled : false,
    autoWidth : true,
    order : 4
})
public mails: string[];
```

## Select - property decorator

Example:

```javascript
@Select({
    values : [{"value" : 1, "label" : "Value 1"}, {"value" : 2, "label" : "Value 2"}, {"value" : 3, "label" : "Value 3"}],
    defaultValue : 2,
    order : 5
})
public period: string;
```

## Calendar - property decorator

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

## Checkboxes - property decorator

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

## Scheduling (under development)

## Dual List Box (under development)


## License

MIT © [Claudio Margulhano](mailto:cmargulhano@gmail.com)
