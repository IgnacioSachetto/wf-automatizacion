import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPreProduccionIaComponent } from './formulario-pre-produccion-ia.component';

describe('FormularioPreProduccionIaComponent', () => {
  let component: FormularioPreProduccionIaComponent;
  let fixture: ComponentFixture<FormularioPreProduccionIaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioPreProduccionIaComponent]
    });
    fixture = TestBed.createComponent(FormularioPreProduccionIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
