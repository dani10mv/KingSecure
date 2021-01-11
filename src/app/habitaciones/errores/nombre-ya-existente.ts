import {Habitacion} from '../habitacion';

export class NombreYaExistente extends Error {
  constructor(habitacion: Habitacion) {
    super(`El nombre ${habitacion.nombre} ya ha sido utilizado previamente `);
  }
}
