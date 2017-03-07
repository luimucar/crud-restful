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
    emptyMessageKey : 'MESSAGE.NO_DATA'
})
@Configure({
    i18nPath : './assets/i18n',
    confirmMessageKey : 'MESSAGE.CONFIRMATION_MSG',
    confirmTitleMessageKey : 'MESSAGE.CONFIRM'
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
        type : 'text',
        autoWidth : true,
        order : 2,
        tableColumn : 1,
        sortable : true
    })            
    name : string;
    
    @InputType({
        name : 'Full Name',
        type : 'text',
        autoWidth : true,
        order : 3,
        tableColumn : 2,
        sortable : true
    })    
    fullname : string;   
}
