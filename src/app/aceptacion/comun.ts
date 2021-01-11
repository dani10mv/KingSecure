import {DispositivosService} from '../dispositivos/dispositivos.service';
import {TestBed} from '@angular/core/testing';
import {HabitacionesService} from '../habitaciones/habitaciones.service';

export function obtenerServicioDispositivos(): DispositivosService {
  //TestBed.configureTestingModule({});
  return  TestBed.inject(DispositivosService);
}
export function obtenerServicioHabitaciones(): HabitacionesService {
  // TestBed.configureTestingModule({});
  return  TestBed.inject(HabitacionesService);
}



export function limpiarEstado(): void {
  // TODO: Hacer limpieza
}
