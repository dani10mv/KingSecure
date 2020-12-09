import {Habitacion} from '../habitacion';

export class DispositivoYaAnadido extends Error {
  constructor(habitacion: Habitacion) {
    super(`Este dispositivo ya estaba asignado a la habitación ${habitacion.nombre} previamente `);
  }
}
