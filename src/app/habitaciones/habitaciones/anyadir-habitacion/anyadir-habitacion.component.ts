import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../habitaciones.component';

@Component({
  selector: 'app-anyadir-habitacion',
  templateUrl: './anyadir-habitacion.component.html',
  styleUrls: ['./anyadir-habitacion.component.css']
})
export class AnyadirHabitacionComponent{

  constructor(public dialogoRef: MatDialogRef<AnyadirHabitacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void{
    this.dialogoRef.close();
  }



}
