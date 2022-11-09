import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloReporteriaComponent } from './reporteria.component';

describe('ModuloReporteriaComponent', () => {
  let component: ModuloReporteriaComponent;
  let fixture: ComponentFixture<ModuloReporteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloReporteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloReporteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
