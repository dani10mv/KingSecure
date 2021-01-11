import {DispositivosService} from '../dispositivos/dispositivos.service';
import {TestBed} from '@angular/core/testing';
import {HabitacionesService} from '../habitaciones/habitaciones.service';
import {BrowserModule} from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from '../app.component';
import {HabitacionesComponent} from '../habitaciones/habitaciones/habitaciones.component';
import {DispositivosComponent} from '../dispositivos/dispositivos/dispositivos.component';
import {InfoHabtiacionesComponent} from '../habitaciones/habitaciones/info-habtiaciones/info-habtiaciones.component';
import {AnyadirHabitacionComponent} from '../habitaciones/habitaciones/anyadir-habitacion/anyadir-habitacion.component';

export function obtenerServicioDispositivos(): DispositivosService {
  TestBed.configureTestingModule({});
  return  TestBed.inject(DispositivosService);
}
export function obtenerServicioHabitaciones(): HabitacionesService {
  TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      HabitacionesComponent,
      DispositivosComponent,
      InfoHabtiacionesComponent,
      AnyadirHabitacionComponent
    ],
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireModule
    ]
  });
  return  TestBed.inject(HabitacionesService);
}



export function limpiarEstado(): void {
  // TODO: Hacer limpieza
}
