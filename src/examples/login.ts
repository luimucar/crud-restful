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
    autoHide : false
})
@Configure({
    i18nPath : './assets/i18n'
})
export class Login {

    constructor(
        @InputType({
            name : 'Id',
            property : 'id', //when use in a constructor, set property value with the name of atribute. See: https://github.com/Microsoft/TypeScript/issues/15904
            type : 'text',
            readOnly : true,
            disabled : true,
            width : '300px',
            order : 1,
            tableColumn : 0,
            sortable : true
        })    
        public id? : number) {
    }

    @InputType({
        name : 'Email',
        translateKey : 'EMAIL',
        type : 'text',
        width : '300px',
        order : 2,
        tableColumn : 2,
        sortable : true,
        required : true,
        requiredMessageKey : 'MESSAGE.FIELD_REQUIRED',
        regexp : "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i",
        regexpMessage : 'Email is invalid'        
    })            
    email : string;
    
    @InputType({
        name : 'Full Name',
        translateKey : 'FULLNAME',
        type : 'text',
        width : '300px',
        order : 3,
        tableColumn : 1,
        sortable : true,
        required : true,
        requiredMessageKey : 'MESSAGE.FIELD_REQUIRED',
        style : 'color: blue; font-style : italic;'
    })    
    fullname : string;  

    @InputType({
        name : 'Phone Number',
        type : 'text',
        width : '300px',
        order : 4,
        tableColumn : 3,
        sortable : true,
        required : false,
        requiredMessageKey : 'MESSAGE.FIELD_REQUIRED',
        mask : '(99) 999-9999',
        style : 'color: pink;'
    })    
    phonenumber : string;      
}