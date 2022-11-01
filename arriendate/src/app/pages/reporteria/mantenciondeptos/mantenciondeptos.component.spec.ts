import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenciondeptosComponent } from './mantenciondeptos.component';

describe('MantenciondeptosComponent', () => {
  let component: MantenciondeptosComponent;
  let fixture: ComponentFixture<MantenciondeptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenciondeptosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenciondeptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
