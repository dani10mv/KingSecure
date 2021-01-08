import { Component, OnInit } from '@angular/core';
import {Habitacion} from '../habitacion';
import {HabitacionesService} from '../habitaciones.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {

  constructor(private habService: HabitacionesService) { }
  habitaciones: Habitacion[] = [];
  ngOnInit(): void {

  }


}
