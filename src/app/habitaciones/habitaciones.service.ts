import { Injectable } from '@angular/core';
import {Dispositivo} from '../dispositivos/dispositivo';
import {Habitacion} from './habitacion';
import {AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Action} from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  habitacionesList: Observable<Habitacion[]>;
  habitacionesCollection: AngularFirestoreCollection<Habitacion>;
  habitacionDoc: AngularFirestoreDocument;

  constructor(
    private db: AngularFirestore
  ) {
    this.habitacionesCollection = this.db.collection('habitaciones');
    this.habitacionesList = this.habitacionesCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Habitacion;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }


  anadirHabitacion(habitacion: Habitacion):void{
    this.habitacionesCollection.add(habitacion);
  }

  eliminarHabitacion(habitacion: String):void{
    throw new Error('Unimplemented');
  }

  cambiarNombreHabitacion(nombreAnt: String, nombreNuevo: String):void{
    throw new Error('Unimplemented');
  }

  listarHabitaciones():Promise<Habitacion[]>{
    return this.habitacionesList.toPromise();
  }

  //Listar todos los dispositivos asignados a una habitación
  listarDispositivos(habitacion:Habitacion):Promise<Array<Dispositivo>>{
    throw new Error('Unimplemented');

  }

  //Listar todos los dispositivos de la app
  listarTodosDispositivos(): Promise<Array<Dispositivo>>{
    throw new Error('Unimplemented');
  }

  anadirDispositivo(habitacion:Habitacion,dispositivo:Dispositivo):void{
    throw new Error('Unimplemented');

  }

  eliminarDispositivo(habitacion:Habitacion,dispositivo:Dispositivo):void{
    throw new Error('Unimplemented');

  }

  cambiarHabitacionDispositivo(habitacionAnt: String, habitacionPost: String, dispositivo: Dispositivo){
    throw new Error('Unimplemented');
  }

}
