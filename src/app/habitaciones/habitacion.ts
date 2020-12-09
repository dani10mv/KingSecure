import {Dispositivo} from '../dispositivos/dispositivo';

export class Habitacion {
  id?: number;
  nombre: string;


  listarDispositivos():Promise<Array<Dispositivo>>{
    throw new Error('Unimplemented');

  }

  anadirDispositivo(dispositivo:Dispositivo):void{
    throw new Error('Unimplemented');

  }

  eliminarDispositivo(dispositivo:Dispositivo):void{
    throw new Error('Unimplemented');

  }

}



