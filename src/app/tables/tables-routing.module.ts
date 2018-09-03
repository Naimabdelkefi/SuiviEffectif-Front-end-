import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NormalComponent} from './normal/normal.component';
import {JqueryDatatableComponent} from './jquery-datatable/jquery-datatable.component';
const routes: Routes = [

    {
        path: 'turn-over',
        component: NormalComponent
    },
    {
        path: 'liste-effectif',
        component: JqueryDatatableComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
