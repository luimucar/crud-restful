import { Directive, OnChanges, Input, ViewContainerRef, ComponentFactoryResolver, SimpleChange } from '@angular/core';
import { InputTextComponent } from './components/input.component';
import { MultiSelectComponent } from './components/multiselect.component';
import { ChipsComponent } from './components/chips.component';
import { SelectComponent } from './components/select.component';
import { CalendarComponent } from './components/calendar.component';

@Directive({
    selector: '[crud-factory]'
})
export class CrudFactoryDirective implements OnChanges {
    @Input()
    type : string;
    
    @Input()
    index : number;
    
    @Input()
    clazzName : string;
    
    @Input()
    model : any;
      
    componentRef : any;

    init = false;

    constructor(
        private vcRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver) { }

    create(comp : any) {
        const factory = this.resolver.resolveComponentFactory(comp);
        const compRef = this.vcRef.createComponent(factory);
        (<any>compRef).instance.index = this.index;
        (<any>compRef).instance.clazzName = this.clazzName;
        if (this.model != undefined) {
            (<any>compRef).instance.model = this.model;
        }

        if (this.componentRef) {
            this.componentRef.destroy();
        }

        this.componentRef = compRef;
        this.init = true;
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (this.init)
            return;
        let comp;
        if (this.type == 'InputType') {
            comp = InputTextComponent;
        } else if (this.type == 'MultiSelect') {
            comp = MultiSelectComponent;
        } else if (this.type == 'Chips') {
            comp = ChipsComponent;
        } else if (this.type == 'Select') {
            comp = SelectComponent;
        } else if (this.type == 'Calendar') {
            comp = CalendarComponent;
        }
        if (comp) {
            this.create(comp);
        }
    }

    public ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}

