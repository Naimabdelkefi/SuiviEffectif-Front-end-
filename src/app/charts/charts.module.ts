import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { MorrisComponent } from './morris/morris.component';

@NgModule({
  imports: [
    CommonModule,
    ChartsRoutingModule
  ],
  declarations: [MorrisComponent]
})
export class ChartsModule { }
