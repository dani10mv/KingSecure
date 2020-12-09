import {Habitacion} from '../habitacion';

export class DispositovoNoEncontrado extends Error {
  constructor(habitacion: Habitacion) {
    super(`Este dispositivo no se ha encontrado en la habitación ${habitacion.nombre}`);
  }
}
