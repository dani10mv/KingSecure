


import {Dispositivo} from '../dispositivos/dispositivo';
import {limpiarEstado, obtenerServicioDispositivos} from './comun';
import {DispositivosService} from '../dispositivos/dispositivos.service';
import {Habitacion} from '../habitaciones/habitacion';

describe('HU09: Consultar el estado de un dispositivo', () => {

  let dispositivos: DispositivosService;

  beforeEach(() => {
    dispositivos = obtenerServicioDispositivos();
  });

  it('debería devolver el estado del dispositivo no activo y no asignado', async () => {
    // Given: Estado inicial apagado y no asignado
    const dispositivo: Dispositivo={
      nombre:'Sensor de Ventana',
      estado:'apagado',
      codigo:15,
      asignado:false
    }    // When: Obtenemos estado del dispositivo
    const estado = await dispositivos.getEstadoDeDispositivo(dispositivo);
    const asignado= await dispositivos.estaAsigando(dispositivo);
    // Then: El dispositivo esta apagado y no asignado
    expect(estado).toMatch('apagado');
    expect(asignado).toBeFalse();


  });

  it('deberia devolver el estado del dispositivo asignado y activo', async () => {
    // Given: Estado inicial apagado y no asignado
    const dispositivo: Dispositivo={
      nombre:'Sensor de Ventana',
      estado:'apagado',
      codigo:15,
      asignado:false
    }    // When: Asignamos el dispositivo a una habitacion
    let habitacion:Habitacion;

    habitacion.anadirDispositivo(dispositivo);

    const estado = await dispositivos.getEstadoDeDispositivo(dispositivo);
    const asignado= await dispositivos.estaAsigando(dispositivo);
    // Then: El dispositivo esta activado y asignado
    expect(estado).toMatch('activado');
    expect(asignado).toBeTrue();
  });

  afterEach(() => {
    limpiarEstado();
  });
});
