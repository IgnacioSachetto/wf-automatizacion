import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoRiesgosPorAreaIaComponent } from './estado-riesgos-por-area-ia.component';

describe('EstadoRiesgosPorAreaIaComponent', () => {
  let component: EstadoRiesgosPorAreaIaComponent;
  let fixture: ComponentFixture<EstadoRiesgosPorAreaIaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoRiesgosPorAreaIaComponent]
    });
    fixture = TestBed.createComponent(EstadoRiesgosPorAreaIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
