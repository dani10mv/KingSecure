


import {Dispositivo} from '../dispositivos/dispositivo';
import {limpiarEstado, obtenerServicioDispositivos} from './comun';
import {DispositivosService} from '../dispositivos/dispositivos.service';
import {Habitacion} from '../habitaciones/habitacion';

describe('HU10: Consultar lista de dispositivos de una habitación', () => {

  let dispositivos: DispositivosService;

  beforeEach(() => {
    dispositivos = obtenerServicioDispositivos();
  });

  it('Despues de asignarle una habitación a un dispositivo el tamaño de esta deveria ser 1 si esta estaba vacia', async () => {
    // Given: Estado inicial apagado y no asignado y una habitacion sin dispositivos
    const dispositivo: Dispositivo={
      nombre:'Sensor de Ventana',
      estado:'apagado',
      codigo:15,
      asignado:false
    }
    let habitacion:Habitacion;

    // When: Asignamos una habitación al dispositivo

    habitacion.anadirDispositivo(dispositivo);
    const listaDispositivos=await habitacion.listarDispositivos();
    // Then: el tamaño de la habitación será 1
    expect(listaDispositivos.length).toBe(1);


  });

  it('El listado de dispositivos de una habitación vacia deveria ser 0', async () => {
    // Given: Estado inicial una habitacion sin dispositivos

    let habitacion:Habitacion;

    // When: Vemos cuantos dispositivos tiene asignados

    const listaDispositivos=await habitacion.listarDispositivos();
    // Then: el tamaño de la habitación será 0
    expect(listaDispositivos.length).toBe(0);
  });

  afterEach(() => {
    limpiarEstado();
  });
});
