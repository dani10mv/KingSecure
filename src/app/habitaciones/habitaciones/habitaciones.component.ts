import { Component, OnInit } from '@angular/core';
import {Habitacion} from '../habitacion';
import {HabitacionesService} from '../habitaciones.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AnyadirHabitacionComponent} from './anyadir-habitacion/anyadir-habitacion.component';
import {error} from '@angular/compiler/src/util';

export interface DialogData{
  animal: string;
  name: string;
}
@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {

  constructor(private habService: HabitacionesService, public dialogo: MatDialog) { }
  habitaciones: Habitacion[] = [];
  animal: string;
  name: string;
  dialogoRef: MatDialogRef<AnyadirHabitacionComponent, any>;
  ngOnInit(): void {
    async () => {
      this.habitaciones = await this.habService.listarHabitaciones();

    }
  }

  openDialog(): void{

    console.log('The dialog was open');
    this.dialogoRef = this.dialogo.open(AnyadirHabitacionComponent, {
      width: '270px',
      height: '200px',
      disableClose: false,
      data: {name: this.name, animal: this.animal}
    });

    this.dialogoRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
