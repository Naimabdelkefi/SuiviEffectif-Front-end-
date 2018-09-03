import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MorrisComponent} from "./charts/morris/morris.component";

const routes: Routes = [

    {
          path: 'effectif',
        loadChildren: 'app/forms/forms.module#FormsModules'
    },

    {
        path: 'tables',
        loadChildren: 'app/tables/tables.module#TablesModule'
    },
  {
        path: 'dashboard',
        loadChildren: 'app/charts/charts.module#ChartsModule'
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
