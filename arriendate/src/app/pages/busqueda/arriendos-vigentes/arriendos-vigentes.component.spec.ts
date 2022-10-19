import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriendosVigentesComponent } from './arriendos-vigentes.component';

describe('ArriendosVigentesComponent', () => {
  let component: ArriendosVigentesComponent;
  let fixture: ComponentFixture<ArriendosVigentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriendosVigentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArriendosVigentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
