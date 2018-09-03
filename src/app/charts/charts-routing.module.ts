import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MorrisComponent} from './morris/morris.component';


const routes: Routes = [
    {
        path: '',
        component: MorrisComponent
    },
    {
        path: '',
        redirectTo: 'morris',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
