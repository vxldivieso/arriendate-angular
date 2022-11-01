import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiontransporteComponent } from './gestiontransporte.component';

describe('GestiontransporteComponent', () => {
  let component: GestiontransporteComponent;
  let fixture: ComponentFixture<GestiontransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestiontransporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestiontransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
