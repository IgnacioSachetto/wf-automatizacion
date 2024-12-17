// pantalla-intermedia-ia.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pantalla-intermedia-ia',
  templateUrl: './pantalla-intermedia-ia.component.html',
  styleUrls: ['./pantalla-intermedia-ia.component.css']
})
export class PantallaIntermediaIaComponent {
  @Output() formOpened = new EventEmitter<string>();

  openForm(type: string) {
    this.formOpened.emit(type);  // Emite el tipo de formulario a abrir
  }
}
