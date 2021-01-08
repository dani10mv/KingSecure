import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHabtiacionesComponent } from './info-habtiaciones.component';

describe('InfoHabtiacionesComponent', () => {
  let component: InfoHabtiacionesComponent;
  let fixture: ComponentFixture<InfoHabtiacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoHabtiacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoHabtiacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
