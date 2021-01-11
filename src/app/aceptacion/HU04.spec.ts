import {HabitacionesService} from '../habitaciones/habitaciones.service';
import {limpiarEstado, obtenerServicioHabitaciones} from './comun';
import {Habitacion} from '../habitaciones/habitacion';
import {Dispositivo} from '../dispositivos/dispositivo';
import {NombreYaExistente} from '../habitaciones/errores/nombre-ya-existente';
/*
describe('Como usuario quiero poder cambiar el nombre de una habitación existente del sistema', () => {

  let habitaciones: HabitacionesService;

  beforeEach( () => {
    habitaciones = obtenerServicioHabitaciones();
  });

  it('Al intentar cambiar le nombre de una habitación existente a otro distinto de los de las habitaciones existentes se ha de realizar correctamente', async() => {
    //Given: Un conjunto de habitaciones existentes
    const habitacion: Habitacion={
      nombre: 'cocina',
      dispositivos: Array<Dispositivo>()
    };
    habitaciones.anadirHabitacion(habitacion);
    //When: Le cambiamos el nombre a una de ellas a un nombre no utilizado
    habitaciones.cambiarNombreHabitacion('cocina', 'dormitorio');
    //Then: El nombre se cambiará correctamente
    let listadoHabitaciones: Array<Habitacion> = await habitaciones.listarHabitaciones();

    const dormitorio: Habitacion={
      nombre: 'dormitorio',
      dispositivos: Array<Dispositivo>()
    };

    expect(listadoHabitaciones.includes(dormitorio)).toBeTrue();
  });

  it('Al intentar cambiar le nombre de una habitación existente a otro nombre y autilizado ha de mostrar un error', async() => {
    //Given: Un conjunto de habitaciones existentes
    const habitacion: Habitacion={
      nombre: 'cocina',
      dispositivos: Array<Dispositivo>()
    };
    const dormitorio: Habitacion={
      nombre: 'dormitorio',
      dispositivos: Array<Dispositivo>()
    };
    habitaciones.anadirHabitacion(habitacion);
    habitaciones.anadirHabitacion(dormitorio);
    //When: Le cambiamos el nombre a una de ellas a un nombre utilizado
    //Then: Mostrará un mensaje de error
    await expectAsync(habitaciones.cambiarNombreHabitacion('cocina', 'dormitorio')).toBeRejected(new NombreYaExistente(habitacion));
  });

  afterEach(() => {
    limpiarEstado();
  });
});
*/
