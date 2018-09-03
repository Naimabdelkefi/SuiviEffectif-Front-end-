import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { NormalComponent } from './normal/normal.component';
import { JqueryDatatableComponent } from './jquery-datatable/jquery-datatable.component';

@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule
  ],
  declarations: [NormalComponent, JqueryDatatableComponent]
})
export class TablesModule { }
