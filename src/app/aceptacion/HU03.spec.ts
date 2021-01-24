import {limpiarEstado, obtenerServicioHabitaciones} from './comun';
import {HabitacionesService} from '../habitaciones/habitaciones.service';
import {Habitacion} from '../habitaciones/habitacion';
import {Dispositivo} from '../dispositivos/dispositivo';
import {HabitacionYaAnadida} from '../habitaciones/errores/habitacion-ya-anadida';
import {HabitacionNoEncontrada} from '../habitaciones/errores/habitacion-no-encontrada';


describe('Como usuario quiero poder borrar una habitación del sistema', () => {


  let habitaciones : HabitacionesService;

  beforeEach( () => {
    habitaciones = obtenerServicioHabitaciones();
  });

  it('Al intentar borrar una habitación existente en el sistema se ha de poder borrar correctamente', async () => {
    //Given:Un conjunto de habitaciones ya esistentes
    const habitacion: Habitacion={
      nombre: 'cocina',
      dispositivos: Array<Dispositivo>()
    };

    habitaciones.anadirHabitacion(habitacion);
    //When:Intentamos borrar una habitación existente
    habitaciones.eliminarHabitacion('cocina');
    //Then: Se borra correctamente del sistema
    let listadoHabitaciones: Array<Habitacion> = await habitaciones.listarHabitaciones();
    expect(listadoHabitaciones.includes(habitacion)).toBeFalse();
  });

  it('Al intentar borrar una habitación inexsistente en el sistema ha de mostrar un mensaje indicando el error', async () => {
    //Given: un conjunto de habitaciones ya existentes
    const habitacion: Habitacion={
      nombre: 'cocina',
      dispositivos: Array<Dispositivo>()
    };

    habitaciones.anadirHabitacion(habitacion);
    //When: Intentamos borrar una habitaciób inexistente
    //Then: Muestra un error indicando que no existe esa habitación
    await expectAsync(habitaciones.eliminarHabitacion('dormitorio')).toBeRejected(new HabitacionNoEncontrada('dormitorio'))
  });

  afterEach(() => {
    limpiarEstado();
  });
});

