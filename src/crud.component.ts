import { Component } from '@angular/core';
import { CrudComponentObj } from './index';

@Component({
    selector: 'crud',
    templateUrl: 'crud.html'
})

export class CrudComponent {
    components : CrudComponentObj[] = CrudComponentObj.components;

    save() {
        console.log(this.components);
    }
}

