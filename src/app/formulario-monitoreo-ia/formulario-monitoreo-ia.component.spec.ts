import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMonitoreoIaComponent } from './formulario-monitoreo-ia.component';

describe('FormularioMonitoreoIaComponent', () => {
  let component: FormularioMonitoreoIaComponent;
  let fixture: ComponentFixture<FormularioMonitoreoIaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioMonitoreoIaComponent]
    });
    fixture = TestBed.createComponent(FormularioMonitoreoIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
