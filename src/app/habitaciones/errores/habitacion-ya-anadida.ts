import {Habitacion} from '../habitacion';

export class HabitacionYaAnadida extends Error {
  constructor(habitacion: string) {
    super(`La habitación ${habitacion} ya ha sido creada previamente `);
  }
}
