import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaIntermediaIaComponent } from './pantalla-intermedia-ia.component';

describe('PantallaIntermediaIaComponent', () => {
  let component: PantallaIntermediaIaComponent;
  let fixture: ComponentFixture<PantallaIntermediaIaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaIntermediaIaComponent]
    });
    fixture = TestBed.createComponent(PantallaIntermediaIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
