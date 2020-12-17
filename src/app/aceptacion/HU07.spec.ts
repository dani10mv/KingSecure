


import {Dispositivo} from '../dispositivos/dispositivo';
import {limpiarEstado, obtenerServicioDispositivos, obtenerServicioHabitaciones} from './comun';
import {DispositivosService} from '../dispositivos/dispositivos.service';
import {Habitacion} from '../habitaciones/habitacion';
import {DispositivoYaAnadido} from '../habitaciones/errores/dispositivo-ya-anadido';
import {DispositovoNoEncontrado} from '../habitaciones/errores/dispositovoNoEncontrado';
import {HabitacionesService} from '../habitaciones/habitaciones.service';

describe('HU07: Borrar un dispositivo de una habitación', () => {

  let dispositivos: DispositivosService;
  let habitaciones: HabitacionesService
  beforeEach(() => {
    dispositivos = obtenerServicioDispositivos();
    habitaciones = obtenerServicioHabitaciones();
  });

  it('Después de borrar un dispositivo de una habitación el dispositivo no está en la habitación y está apagado', async () => {
    // Given: Un dispositivo con una habitación asignada y activo
    const dispositivo: Dispositivo={
      nombre:'Sensor de Ventana',
      estado:'apagado',
      codigo:15,
      asignado:false
    }
    let habitacion:Habitacion;

    habitaciones.anadirDispositivo(habitacion,dispositivo);

    const listaDispositivos=await habitaciones.listarDispositivos(habitacion);

    // When: Borramos al dispositivo de la habitación

    habitaciones.eliminarDispositivo(habitacion,dispositivo);

    // Then: El dispositivo no está en la habitación y está apagado

    expect(listaDispositivos.includes(dispositivo)).toBeFalse();
    expect(dispositivos.getEstadoDeDispositivo(dispositivo)).toMatch('apagado');


  });

  it('Al intentar borrar de una habitación un dispositivo que no tiene habitación asignada debe mostrar un mensaje de error', async () => {
    // Given: Estado inicial una habitacion sin dispositivos y un dispositivo que no tiene ninguna habitación asignada

    let habitacion:Habitacion;
    const dispositivo: Dispositivo={
      nombre:'Sensor de Ventana',
      estado:'apagado',
      codigo:15,
      asignado:false
    }

    // When: Intentamos eliminar un dispositivo que no tiene la habitación
    // Then: Muestra un error por no encontrar ese dispositivo en la habitación
    await expectAsync(habitaciones.eliminarDispositivo(habitacion,dispositivo)).toBeRejectedWith(new DispositovoNoEncontrado(habitacion));
  });

  afterEach(() => {
    limpiarEstado();
  });
});
