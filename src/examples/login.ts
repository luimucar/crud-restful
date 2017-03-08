import { Configure, Id, InputType, MultiSelect, Chips, Select, Calendar, Checkboxes, Table } from '../index';

@Table({
    name : 'tableUser',
    url : '/data/login.json',
    fileConfig : '/config/webapp-config.json',
    fileConfigServerKey : 'server.backend',    
    rows : 10,
    paginator : true,
    pageLinks : 3,
    sortField : 'id',
    sortOrder : 1,   
    order : 0,
    emptyMessageKey : 'MESSAGE.NO_DATA'
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
        translateKey : 'NAME',
        type : 'text',
        autoWidth : true,
        order : 2,
        tableColumn : 2,
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
        tableColumn : 1,
        sortable : true,
        required : true,
        requiredMsgKey : 'MESSAGE.FIELD_REQUIRED'
    })    
    fullname : string;   
}
