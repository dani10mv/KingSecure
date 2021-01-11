import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyadirHabitacionComponent } from './anyadir-habitacion.component';

describe('AnyadirHabitacionComponent', () => {
  let component: AnyadirHabitacionComponent;
  let fixture: ComponentFixture<AnyadirHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnyadirHabitacionComponent ]
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
});
