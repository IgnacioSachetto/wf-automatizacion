import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoRiesgosPorAreaComponent } from './estado-riesgos-por-area.component';

describe('EstadoRiesgosPorAreaComponent', () => {
  let component: EstadoRiesgosPorAreaComponent;
  let fixture: ComponentFixture<EstadoRiesgosPorAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoRiesgosPorAreaComponent]
    });
    fixture = TestBed.createComponent(EstadoRiesgosPorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
