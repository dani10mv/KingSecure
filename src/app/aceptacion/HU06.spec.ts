
import {Dispositivo} from '../dispositivos/dispositivo';
import {limpiarEstado, obtenerServicioDispositivos} from './comun';
import {DispositivosService} from '../dispositivos/dispositivos.service';
import {Habitacion} from '../habitaciones/habitacion';
import {DispositivoYaAnadido} from '../habitaciones/errores/dispositivo-ya-anadido';

describe('HU06: Asignar un dispositivo a una habitación', () => {

  let dispositivos: DispositivosService;

  beforeEach(() => {
    dispositivos = obtenerServicioDispositivos();
  });

  it('Despues de asignarle una habitación a un dispositivo este deberia estar activo y asignado a la habitación', async () => {
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
    let dispositivosDeHabitacion:Array<Dispositivo>=await habitacion.listarDispositivos();
    const listaDispositivos=await habitacion.listarDispositivos();
    // Then: El dispositivo esta asignado a la habitación y activo
    expect(dispositivos.estaAsigando(dispositivo)).toBeTrue();
    expect(dispositivos.getEstadoDeDispositivo(dispositivo)).toMatch('activado');
    expect(dispositivosDeHabitacion.includes(dispositivo)).toBeTrue();



  });

  it('Al intentar asignar a un dispositivo una habitación que ya tiene asignada debe mostrar un mensaje de error', async () => {
    // Given: Un dispositivo con una habitación ya asignada

    let habitacion:Habitacion;

    const dispositivo: Dispositivo={
      nombre:'Sensor de Ventana',
      estado:'apagado',
      codigo:15,
      asignado:false
    }

    habitacion.anadirDispositivo(dispositivo);

    // When:intentamos añadir un dispositivo que ya pertenece a la habitacion que se intenta asignar

    // Then: lanzará un error al ya contener al dispositivo
    await expectAsync(habitacion.anadirDispositivo(dispositivo)).toBeRejectedWith(new DispositivoYaAnadido(habitacion));
  });

  afterEach(() => {
    limpiarEstado();
  });
});
