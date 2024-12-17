import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() formSelected = new EventEmitter<string>();

  // Emitimos el tipo de pantalla a mostrar
  selectForm(form: string) {
    this.formSelected.emit(form);
  }
}
