import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaIntermediaProductoComponent } from './pantalla-intermedia-producto.component';

describe('PantallaIntermediaProductoComponent', () => {
  let component: PantallaIntermediaProductoComponent;
  let fixture: ComponentFixture<PantallaIntermediaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaIntermediaProductoComponent]
    });
    fixture = TestBed.createComponent(PantallaIntermediaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
