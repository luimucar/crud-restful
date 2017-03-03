# crud-restful - UNDER DEVELOPMENT

UNDER DEVELOPMENT

This component aims to facilitate the construction of interfaces in Angular 2.
This component provides high-level interface components using PrimeNG to render the interface.
The use of this component generates a great gain of productivity and flexibility in the construction of the interfaces.
All components are created at runtime based on Decorators and Metadatas that provide information such as field positioning, combos content and component configuration.


## Prerequisite

Installation of depencies:
    - primeng: http://www.primefaces.org/primeng/#/setup
    - jquery


## Installation

To install this library, run:

```bash
$ npm install crud-restful --save
```

## Ho to use

1. Describe your model with Decorators. Example:

```javascript
import { InputType } from 'crud-restful/index';

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

2. Import in your module:

```javascript
import {CrudModule} from 'crud-restful/index';
import {User} from 'user';
```

3. In your HTML template:

<crud [clazz]="'User'" [model]="user" (onSave)="handleOnSave($event)" (onCancel)="handleOnCancel()"></crud>

4. In your component initialize your object model and handle the events of Save and Cancel:

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

1. InputType

Example:

@InputType({
    name : 'User:',
    type : 'text',
    readOnly : true,
    disabled : true,            
    autoWidth : true,
    order : 0
})
username: string;

2. MultiSelect

Example:

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

3. Chips

@Chips({
    disabled : false,
    autoWidth : true,
    order : 4
})
public mails: string[];

4. Select

@Select({
    values : [{"value" : 1, "label" : "Value 1"}, {"value" : 2, "label" : "Value 2"}, {"value" : 3, "label" : "Value 3"}],
    defaultValue : 2,
    order : 5
})
public period: string;

5. Calendar (under development)
6. Table (under development)
7. Scheduling (under development)
8. Dual List Box (under development)

## License

MIT © [Claudio Margulhano](mailto:cmargulhano@gmail.com)
