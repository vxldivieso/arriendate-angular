import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaExternaComponent } from './reserva-externa.component';

describe('ReservaExternaComponent', () => {
  let component: ReservaExternaComponent;
  let fixture: ComponentFixture<ReservaExternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaExternaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
