import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { InplaceModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { AccordionModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';

@NgModule({
    imports: [CalendarModule, DropdownModule, CheckboxModule, SliderModule, InplaceModule, 
        InputMaskModule, TabViewModule, ConfirmDialogModule, DataTableModule, SharedModule, 
        MultiSelectModule, PanelModule, TreeModule, ToggleButtonModule, InputSwitchModule,
        AccordionModule, SplitButtonModule, DialogModule, OverlayPanelModule,
        AutoCompleteModule, FieldsetModule, ChipsModule],
        
    exports: [CalendarModule, DropdownModule, CheckboxModule, SliderModule, InplaceModule, 
        InputMaskModule, TabViewModule, ConfirmDialogModule, DataTableModule, SharedModule, 
        MultiSelectModule, PanelModule, TreeModule, ToggleButtonModule, InputSwitchModule,
        AccordionModule, SplitButtonModule, DialogModule, OverlayPanelModule,
        AutoCompleteModule, FieldsetModule, ChipsModule],
        
    providers: [ConfirmationService]
})

export class PrimeNgModule {

    static forRoot() {
        return {
            ngModule: PrimeNgModule
        }
    }
}

