import {HabitacionesService} from '../app/habitaciones/habitaciones.service';
import {DispositivosService} from '../app/dispositivos/dispositivos.service';
import {limpiarEstado, obtenerServicioDispositivos, obtenerServicioHabitaciones} from './comun';
import {Habitacion} from '../app/habitaciones/habitacion';
import {Dispositivo} from '../app/dispositivos/dispositivo';
import {HabitacionYaAnadida} from '../app/habitaciones/errores/habitacion-ya-anadida';
import {HabitacionNoEncontrada} from '../app/habitaciones/errores/habitacion-no-encontrada';

describe('HU05: Como usuario quiero poder cambiar de habitación un dispositivo', () => {

  let habitaciones: HabitacionesService;
  let dispositivos: DispositivosService;

  beforeEach( () => {
    habitaciones = obtenerServicioHabitaciones();
    dispositivos = obtenerServicioDispositivos();
  });

  it('El usuario intenta cambiar un dispositivo a una habitación que no existe', async () => {

    //Given:Un conjunto de habitaciones existentes con un dispositivo asignado a una
    const cocina: Habitacion={
      nombre: 'cocina',
      dispositivos: Array<Dispositivo>()
    };

    const dormitorio: Habitacion={
      nombre: 'dormitorio',
      dispositivos: Array<Dispositivo>()
    };

    const dispositivo: Dispositivo={
      nombre:'Sensor de Ventana',
      estado:'apagado',
      codigo:15,
      asignado:false
    }

    habitaciones.anadirHabitacion(cocina)
    habitaciones.anadirHabitacion(dormitorio)
    habitaciones.anadirDispositivo(cocina, dispositivo)

    //When:Se cambia el dispositivo a una habitación exsitente
    habitaciones.cambiarHabitacionDispositivo('cocina', 'dormitorio', dispositivo);

    //Then:El dispositivo cambiará de habitación correctamente
    const dispHabitacionCocina = await habitaciones.listarDispositivos(cocina);
    const dispHabitacionDorm = await habitaciones.listarDispositivos(dormitorio);

    expect(dispHabitacionCocina.includes(dispositivo)).toBeFalse();
    expect(dispHabitacionDorm.includes(dispositivo)).toBeTrue();

  });

  it('El usuario intenta cambiar un dispositivo a una habitación que no existe', async () => {

    //Given:Un conjunto de habitaciones existentes con un dispositivo asignado a una
    const cocina: Habitacion={
      nombre: 'cocina',
      dispositivos: Array<Dispositivo>()
    };

    const dormitorio: Habitacion={
      nombre: 'dormitorio',
      dispositivos: Array<Dispositivo>()
    };

    const dispositivo: Dispositivo={
      nombre:'Sensor de Ventana',
      estado:'apagado',
      codigo:15,
      asignado:false
    }

    habitaciones.anadirHabitacion(cocina)
    habitaciones.anadirDispositivo(cocina, dispositivo)
    //When:Se cambia el dispositivo a una habitación inexsitente
    //Then:Se mostrará un mensaje de error
    await expectAsync(habitaciones.cambiarHabitacionDispositivo('cocina', 'salon', dispositivo)).toBeRejected(new HabitacionNoEncontrada('salon'))

  });

  afterEach(() => {
    limpiarEstado();
  });

});
