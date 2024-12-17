import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNuevaIniciativaIaComponent } from './formulario-nueva-iniciativa-ia.component';

describe('FormularioNuevaIniciativaIaComponent', () => {
  let component: FormularioNuevaIniciativaIaComponent;
  let fixture: ComponentFixture<FormularioNuevaIniciativaIaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioNuevaIniciativaIaComponent]
    });
    fixture = TestBed.createComponent(FormularioNuevaIniciativaIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
