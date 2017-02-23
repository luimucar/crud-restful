import { Directive, OnChanges, Input, ViewContainerRef, ComponentFactoryResolver, SimpleChange } from '@angular/core';
import { InputTextComponent } from './components/input.component';
import { MultiSelectComponent } from './components/multiselect.component';
import { ChipsComponent } from './components/chips.component';

const typeMap = {
    'text': InputTextComponent,
    'MultiSelect' : MultiSelectComponent,
    'Chips' : ChipsComponent
}

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
        
    componentRef;

    init = false;

    constructor(
        private vcRef: ViewContainerRef,
        private resolver: ComponentFactoryResolver) { }

    create(comp) {
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
        const comp = typeMap[this.type];
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

