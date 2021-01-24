import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyadirHabitacionComponent } from './anyadir-habitacion.component';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MaterialesModule} from '../../../../Materiales.module';
import {MatFormField} from '@angular/material/form-field';

describe('AnyadirHabitacionComponent', () => {
  let component: AnyadirHabitacionComponent;
  let fixture: ComponentFixture<AnyadirHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatFormField, useValue: {}},
      ],
      declarations: [ AnyadirHabitacionComponent ],

    })
      .compileComponents();

  });

beforeEach(() => {
    fixture = TestBed.createComponent(AnyadirHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

it('should create', () => {
    expect(component).toBeTruthy();
  });
})
