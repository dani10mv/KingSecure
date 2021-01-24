import {HabitacionesService} from '../habitaciones/habitaciones.service';
import {limpiarEstado, obtenerServicioDispositivos, obtenerServicioHabitaciones} from './comun';
import {DispositivosService} from '../dispositivos/dispositivos.service';
import {Dispositivo} from '../dispositivos/dispositivo';
import {Habitacion} from '../habitaciones/habitacion';

describe('HU08: Como usuario quiero que se guarden los cambios cuando cierre la aplicación', () => {

  let habitaciones: HabitacionesService;
  let dispositivos: DispositivosService;

  beforeEach( () => {
    habitaciones = obtenerServicioHabitaciones();
    dispositivos = obtenerServicioDispositivos();
  });

  it('Al abrir la aplicación por primera vez se mostrará la información por defecto', async () => {
    //Given: La aplicación no ha sido abierta nunca
    //When: Se abre por primera vez la aplicación
    //Then: Está la información por defecto (ningún dispositivo asignado)
    const todosDisp: Array<Dispositivo> = await habitaciones.listarTodosDispositivos();

    for (let disp of todosDisp){
      expect(dispositivos.getEstadoDeDispositivo(disp)).toBeFalse()
    }
  });

  it('Al cerrar y abrir la aplicación se conservarán los datos almacenados', async () => {
    //Given: La aplicación con cambios hechos
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

    const sensor: Dispositivo={
      nombre:'Sensor volumétrico',
      estado:'apagado',
      codigo:16,
      asignado:false
    }

    habitaciones.anadirHabitacion(cocina);
    habitaciones.anadirHabitacion(dormitorio);
    habitaciones.anadirDispositivo(cocina, dispositivo);
    habitaciones.anadirDispositivo(dormitorio, sensor);
    //When: Cerramos y abrimos la aplicación
    habitaciones = obtenerServicioHabitaciones();
    dispositivos = obtenerServicioDispositivos();
    //Then: Los cambios se conservan
    const listaHabitaciones: Array<Habitacion> = await habitaciones.listarHabitaciones();
    const listaDisp: Array<Dispositivo> = await habitaciones.listarTodosDispositivos();
    expect(listaHabitaciones.includes(cocina)).toBeTrue();
    expect(listaHabitaciones.includes(dormitorio)).toBeTrue();
    expect(listaDisp.includes(dispositivo)).toBeTrue();
    expect(listaDisp.includes(sensor)).toBeTrue();
    expect(dispositivos.estaAsigando(dispositivo)).toBeTrue()
    expect(dispositivos.estaAsigando(dispositivo)).toBeTrue()
  });

  afterEach(() => {
    limpiarEstado();
  });
});

