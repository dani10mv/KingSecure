

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HabitacionesComponent } from './habitaciones/habitaciones/habitaciones.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { DispositivosComponent } from './dispositivos/dispositivos/dispositivos.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { InfoHabtiacionesComponent } from './habitaciones/habitaciones/info-habtiaciones/info-habtiaciones.component';


@NgModule({
  declarations: [
    AppComponent,
    HabitacionesComponent,
    DispositivosComponent,
    InfoHabtiacionesComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule

  ],
  providers: [],
  bootstrap: [AppComponent],


})
export class AppModule { }
