import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormBasicComponent } from './form-basic/form-basic.component';
import { FormEditorsComponent } from './form-editors/form-editors.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import {  DropzoneComponent , DropzoneDirective,DropzoneModule } from 'ngx-dropzone-wrapper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsRoutingModule,
    DropzoneModule
  ],
  declarations: [
      FormBasicComponent,
      FormEditorsComponent,
      FormUploadComponent
  ]
})
export class FormsModules { }
