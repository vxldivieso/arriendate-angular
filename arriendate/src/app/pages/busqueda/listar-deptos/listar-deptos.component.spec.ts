import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDeptosComponent } from './listar-deptos.component';

describe('ListarDeptosComponent', () => {
  let component: ListarDeptosComponent;
  let fixture: ComponentFixture<ListarDeptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDeptosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarDeptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
