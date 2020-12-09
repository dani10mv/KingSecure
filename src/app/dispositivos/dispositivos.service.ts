import { Injectable } from '@angular/core';
import {Dispositivo} from './dispositivo';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService {

  constructor() { }

  getEstadoDeDispositivo(dispositivo:Dispositivo) :Promise<number>{
    throw new Error('Unimplemented')
  }


  //De volvera si esta  o no asignado un dispositivo
  estaAsigando(dispositivo:Dispositivo):Promise<boolean>{
    throw new Error('Unimplemented')

  }

}
