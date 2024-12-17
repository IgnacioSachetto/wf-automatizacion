import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCargaRiesgoIaComponent } from './formulario-carga-riesgo-ia.component';

describe('FormularioCargaRiesgoIaComponent', () => {
  let component: FormularioCargaRiesgoIaComponent;
  let fixture: ComponentFixture<FormularioCargaRiesgoIaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCargaRiesgoIaComponent]
    });
    fixture = TestBed.createComponent(FormularioCargaRiesgoIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
