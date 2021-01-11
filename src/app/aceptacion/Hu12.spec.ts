import {HabitacionesService} from '../habitaciones/habitaciones.service';
import {DispositivosService} from '../dispositivos/dispositivos.service';
import {limpiarEstado, obtenerServicioDispositivos, obtenerServicioHabitaciones} from './comun';
import {Habitacion} from '../habitaciones/habitacion';
import {Dispositivo} from '../dispositivos/dispositivo';
/*
describe('HU12: Como usuario quiero poder consultar el listado de habitaciones creadas',  () => {

  let habitaciones: HabitacionesService;

  beforeEach( () => {
    habitaciones = obtenerServicioHabitaciones();
  });

  it('Al consultar el listado de habitaciones creadas devolverá una lista con las mismas', async () => {
    //Given: Un conjunto de habitaciones creadas
    const dormitorio: Habitacion={
      nombre: 'dormitorio',
      dispositivos: Array<Dispositivo>()
    };
    const cocina: Habitacion={
      nombre: 'cocina',
      dispositivos: Array<Dispositivo>()
    };
    const salon: Habitacion={
      nombre: 'salon',
      dispositivos: Array<Dispositivo>()
    };

    habitaciones.anadirHabitacion(dormitorio);
    habitaciones.anadirHabitacion(cocina);
    habitaciones.anadirHabitacion(salon);
    //When: Se intenta comprobar el listado de habitaciones

    const listHabitaciones: Array<Habitacion> = await habitaciones.listarHabitaciones();
    //Then: Se muestra un listado de las habitaciones creadas

    expect(listHabitaciones.length).toEqual(3);
    expect(listHabitaciones.includes(dormitorio)).toBeTrue();
    expect(listHabitaciones.includes(cocina)).toBeTrue();
    expect(listHabitaciones.includes(salon)).toBeTrue();

  });

  it('Al consultar el listado de habitaciones creadas cuando no existe ninguna devolverá una lista vacía', async () => {
    //Given: Un conjunto vacío de habitaciones
    //When: Se intenta comprobar el listado de habitaciones

    const listHabitaciones: Array<Habitacion> = await habitaciones.listarHabitaciones();
    //Then: Se muestra un listado vacío de las habitaciones

    expect(listHabitaciones.length).toEqual(0);

  });

  afterEach(() => {
    limpiarEstado();
  });
});
*/
