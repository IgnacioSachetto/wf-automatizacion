import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCargaRiesgoComponent } from './formulario-carga-riesgo.component';

describe('FormularioCargaRiesgoComponent', () => {
  let component: FormularioCargaRiesgoComponent;
  let fixture: ComponentFixture<FormularioCargaRiesgoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCargaRiesgoComponent]
    });
    fixture = TestBed.createComponent(FormularioCargaRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
