import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechasDisponiblesComponent } from './fechas-disponibles.component';

describe('FechasDisponiblesComponent', () => {
  let component: FechasDisponiblesComponent;
  let fixture: ComponentFixture<FechasDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechasDisponiblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FechasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
