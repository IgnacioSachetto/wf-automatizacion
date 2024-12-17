import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pantalla-intermedia-producto',
  templateUrl: './pantalla-intermedia-producto.component.html',
  styleUrls: ['./pantalla-intermedia-producto.component.css']
})
export class PantallaIntermediaProductoComponent {
  @Output() formOpened = new EventEmitter<string>();

  openForm(type: string) {
    this.formOpened.emit(type); // Emitimos el tipo de formulario a abrir
  }
}
