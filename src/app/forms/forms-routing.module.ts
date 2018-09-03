import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormBasicComponent} from './form-basic/form-basic.component';
import {FormUploadComponent} from './form-upload/form-upload.component';
import {FormEditorsComponent} from './form-editors/form-editors.component';

const routes: Routes = [
    {
        path: 'new-effectif',
        component: FormBasicComponent
    },
    {
        path: 'edit-effectif/:id',
        component: FormEditorsComponent
    },
    {
        path: 'upload',
        component: FormUploadComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
