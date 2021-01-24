
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HabitacionesComponent } from './habitaciones/habitaciones/habitaciones.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { DispositivosComponent } from './dispositivos/dispositivos/dispositivos.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { InfoHabtiacionesComponent } from './habitaciones/habitaciones/info-habtiaciones/info-habtiaciones.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
// @ts-ignore
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { AnyadirHabitacionComponent } from './habitaciones/habitaciones/anyadir-habitacion/anyadir-habitacion.component';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {FormsModule} from "@angular/forms";
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {TestBed} from "@angular/core/testing";


@NgModule({
  declarations: [
    AppComponent,
    HabitacionesComponent,
    DispositivosComponent,
    InfoHabtiacionesComponent,
    AnyadirHabitacionComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    BrowserAnimationsModule

  ],
  entryComponents: [
    AnyadirHabitacionComponent,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent],


})

export class AppModule { }
