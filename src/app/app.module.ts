import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from "./app.component";



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [

    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
