import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosdeptoComponent } from './estadosdepto.component';

describe('EstadosdeptoComponent', () => {
  let component: EstadosdeptoComponent;
  let fixture: ComponentFixture<EstadosdeptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadosdeptoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosdeptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
