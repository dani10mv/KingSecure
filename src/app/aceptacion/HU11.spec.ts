import {HabitacionesService} from '../habitaciones/habitaciones.service';
import {DispositivosService} from '../dispositivos/dispositivos.service';
import {limpiarEstado, obtenerServicioDispositivos, obtenerServicioHabitaciones} from './comun';
import {Habitacion} from '../habitaciones/habitacion';
import {Dispositivo} from '../dispositivos/dispositivo';

describe('HU11: Como usuario quiero poder consultar el estado de los dispositivos de una habitación',  () => {

  let habitaciones: HabitacionesService;
  let dispositivos: DispositivosService;

  beforeEach( () => {
    habitaciones = obtenerServicioHabitaciones();
    dispositivos = obtenerServicioDispositivos();
  });

  it('Al consultar el estado de los despositivos de una habitación ha de devolver el estado de los mismos', async () => {
    //Given: Una habitación con dispositivos asignados
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

    const sensor: Dispositivo={
      nombre:'Sensor volumétrico',
      estado:'activo',
      codigo:16,
      asignado:false
    }

    habitaciones.anadirHabitacion(dormitorio);
    habitaciones.anadirDispositivo(dormitorio, dispositivo);
    habitaciones.anadirDispositivo(dormitorio, sensor);

    //When: Se intenta comprobar el estado de los dispositivos
    //Then: Se muestra un listado de los diferentes estados de los dispositivos

    const disps: Array<Dispositivo> = await habitaciones.listarDispositivos(dormitorio);

    expect(disps.length).toEqual(2);

    for (let disp of disps){
      expect(dispositivos.getEstadoDeDispositivo(disp)).toMatch('activo' || 'apagado');
    }
  });

  it('Al consultar el estado de los despositivos de una habitación sin dispositivos ha de devolver una lista vacía', async () => {
    //Given: Una habitación sin dispositivos asignados
    const dormitorio: Habitacion={
      nombre: 'dormitorio',
      dispositivos: Array<Dispositivo>()
    };

    habitaciones.anadirHabitacion(dormitorio);

    //When: Se intenta comprobar el estado de los dispositivos
    //Then: Se muestra un listado vacío

    const disps: Array<Dispositivo> = await habitaciones.listarDispositivos(dormitorio);

    expect(disps.length).toEqual(0);
  });

  afterEach(() => {
    limpiarEstado();
  });
});

