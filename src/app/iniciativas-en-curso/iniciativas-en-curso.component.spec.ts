import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativasEnCursoComponent } from './iniciativas-en-curso.component';

describe('IniciativasEnCursoComponent', () => {
  let component: IniciativasEnCursoComponent;
  let fixture: ComponentFixture<IniciativasEnCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IniciativasEnCursoComponent]
    });
    fixture = TestBed.createComponent(IniciativasEnCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
