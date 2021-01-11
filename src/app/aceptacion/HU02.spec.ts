import {HabitacionesService} from '../habitaciones/habitaciones.service';
import {limpiarEstado, obtenerServicioHabitaciones} from './comun';
import {Habitacion} from '../habitaciones/habitacion';
import {HabitacionYaAnadida} from '../habitaciones/errores/habitacion-ya-anadida';


describe('HU02: Como usuario quiero poder crear una habitación donde poder asignar mis dispositivos', () => {

  let habitaciones: HabitacionesService;
  var originalTimeout;

  beforeEach( () => {
    habitaciones = obtenerServicioHabitaciones();

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('Al intentar crear una habitación que no existe en el sistema debe de crearse satisfactoriamente', async () => {
    //Given: Un conjunto vacío de habitaciones
    //When: Se intenta crear una habitación inexistente
    const habitacion: Habitacion={
      nombre: 'cocinaPrueba',
      dispositivos: []
    };

    habitaciones.anadirHabitacion(habitacion);
    //Then: Se crea correctamente
    let listadoHabitaciones: Habitacion[] = await habitaciones.listarHabitaciones();
    expect(listadoHabitaciones.includes(habitacion)).toBeTrue();

  });

  it('Al intentar crear una habitación que ya existe en el sistema debe mostrar un mensaje de error', async () => {
    //Given: Un conjunto de habitaciones ya existentes
    const habitacion: Habitacion={
      nombre: 'cocinaPrueba',
      dispositivos: []
    };

    habitaciones.anadirHabitacion(habitacion);
    //When: Se intenta crear una habitación ya existente
    //Then: Mostrará un error ya que la habitación ya existe
    await expectAsync(habitaciones.anadirHabitacion(habitacion)).toBeRejected(new HabitacionYaAnadida(habitacion.nombre))
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    limpiarEstado();
  });
});
