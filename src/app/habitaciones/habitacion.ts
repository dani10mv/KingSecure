import {Dispositivo} from '../dispositivos/dispositivo';

export class Habitacion {
  id?: number;
  nombre: string;


  listarDispositivos():Promise<Array<Dispositivo>>{
    throw new Error('Unimpremented');

  }

  anadirDispositivo(dispositivo:Dispositivo):void{
    throw new Error('Unimpremented');

  }
}



