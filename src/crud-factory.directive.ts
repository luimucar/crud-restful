import { Directive, OnChanges, Input, ViewContainerRef, ComponentFactoryResolver, SimpleChange } from '@angular/core';
import { InputTextComponent } from './components/input.component';
import { MultiSelectComponent } from './components/multiselect.component';
import { ChipsComponent } from './components/chips.component';
import { SelectComponent } from './components/select.component';

@Directive({
    selector: '[crud-factory]'
})
export class CrudFactoryDirective implements OnChanges {
    @Input()
    type : string;
    
    @Input()
    index : number;

    @Input()
    name : string;
        
    componentRef : any;

    init = false;

    constructor(
        private vcRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver) { }

    create(comp : any) {
        const factory = this.resolver.resolveComponentFactory(comp);
        const compRef = this.vcRef.createComponent(factory);
        (<any>compRef).instance.index = this.index;
        (<any>compRef).instance.name = this.name;

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
        if (this.type == 'text') {
            comp = InputTextComponent;
        } else if (this.type == 'MultiSelect') {
            comp = MultiSelectComponent;
        } else if (this.type == 'Chips') {
            comp = ChipsComponent;
        } else if (this.type == 'Select') {
            comp = SelectComponent;
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

