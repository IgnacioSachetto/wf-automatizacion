import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativasEnCursoIaComponent } from './iniciativas-en-curso-ia.component';

describe('IniciativasEnCursoIaComponent', () => {
  let component: IniciativasEnCursoIaComponent;
  let fixture: ComponentFixture<IniciativasEnCursoIaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IniciativasEnCursoIaComponent]
    });
    fixture = TestBed.createComponent(IniciativasEnCursoIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
