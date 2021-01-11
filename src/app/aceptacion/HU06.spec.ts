
import {Dispositivo} from '../dispositivos/dispositivo';
import {limpiarEstado, obtenerServicioDispositivos, obtenerServicioHabitaciones} from './comun';
import {DispositivosService} from '../dispositivos/dispositivos.service';
import {Habitacion} from '../habitaciones/habitacion';
import {DispositivoYaAnadido} from '../habitaciones/errores/dispositivo-ya-anadido';
import {HabitacionesService} from '../habitaciones/habitaciones.service';
/*
describe('HU06: Asignar un dispositivo a una habitación', () => {

  let dispositivos: DispositivosService;
  let habitaciones: HabitacionesService;

  beforeEach(() => {
    dispositivos = obtenerServicioDispositivos();
    habitaciones = obtenerServicioHabitaciones();
  });

  it('Despues de asignarle una habitación a un dispositivo este deberia estar activo y asignado a la habitación', async () => {
    // Given: Estado inicial apagado y no asignado y una habitacion sin dispositivos
    const dispositivo: Dispositivo = {
      nombre: 'Sensor de Ventana',
      estado: 'apagado',
      codigo: 15,
      asignado: false
    };
    let habitacion: Habitacion;

    // When: Asignamos una habitación al dispositivo

    habitaciones.anadirDispositivo(habitacion, dispositivo);
    const dispositivosDeHabitacion: Array<Dispositivo> = await habitaciones.listarDispositivos(habitacion);
    // Then: El dispositivo esta asignado a la habitación y activo
    expect(dispositivos.estaAsigando(dispositivo)).toBeTrue();
    expect(dispositivos.getEstadoDeDispositivo(dispositivo)).toMatch('activado');
    expect(dispositivosDeHabitacion.includes(dispositivo)).toBeTrue();



  });

  it('Al intentar asignar a un dispositivo una habitación que ya tiene asignada debe mostrar un mensaje de error', async () => {
    // Given: Un dispositivo con una habitación ya asignada

    const habitacion: Habitacion={
      nombre: 'cocina',
      dispositivos: Array<Dispositivo>()
    };

    const dispositivo: Dispositivo = {
      nombre: 'Sensor de Ventana',
      estado: 'apagado',
      codigo: 15,
      asignado: false
    };

    habitaciones.anadirDispositivo(habitacion, dispositivo);

    // When:intentamos añadir un dispositivo que ya pertenece a la habitacion que se intenta asignar

    // Then: lanzará un error al ya contener al dispositivo
    await expectAsync(habitaciones.anadirDispositivo(habitacion, dispositivo)).toBeRejectedWith(new DispositivoYaAnadido(habitacion));
  });

  afterEach(() => {
    limpiarEstado();
  });
});
*/
