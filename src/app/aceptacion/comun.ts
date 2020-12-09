import {DispositivosService} from '../dispositivos/dispositivos.service';
import {TestBed} from '@angular/core/testing';

export function obtenerServicioDispositivos(): DispositivosService {
  TestBed.configureTestingModule({});
  return  TestBed.inject(DispositivosService);
}

export function limpiarEstado(): void {
  // TODO: Hacer limpieza
}
