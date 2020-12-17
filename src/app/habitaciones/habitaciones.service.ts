import { Injectable } from '@angular/core';
import {Dispositivo} from '../dispositivos/dispositivo';
import {Habitacion} from './habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  constructor() { }


  listarDispositivos(habitacion:Habitacion):Promise<Array<Dispositivo>>{
    throw new Error('Unimplemented');

  }

  anadirDispositivo(habitacion:Habitacion,dispositivo:Dispositivo):void{
    throw new Error('Unimplemented');

  }

  eliminarDispositivo(habitacion:Habitacion,dispositivo:Dispositivo):void{
    throw new Error('Unimplemented');

  }

}
