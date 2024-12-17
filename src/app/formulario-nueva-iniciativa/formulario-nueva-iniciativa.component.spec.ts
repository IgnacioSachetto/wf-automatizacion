import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNuevaIniciativaComponent } from './formulario-nueva-iniciativa.component';

describe('FormularioNuevaIniciativaComponent', () => {
  let component: FormularioNuevaIniciativaComponent;
  let fixture: ComponentFixture<FormularioNuevaIniciativaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioNuevaIniciativaComponent]
    });
    fixture = TestBed.createComponent(FormularioNuevaIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
