import {Habitacion} from '../habitacion';

export class HabitacionNoEncontrada extends Error {
  constructor(habitacion: String) {
    super(`No se ha encontrado la habitación ${habitacion}`);
  }
}
