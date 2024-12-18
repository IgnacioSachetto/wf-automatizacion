import { Component, EventEmitter, Output } from '@angular/core';
import { JiraService } from '../services/api-jira.service'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private jiraService: JiraService) {}



  @Output() formSelected = new EventEmitter<string>();

  // Emitimos el tipo de pantalla a mostrar
  selectForm(form: string) {
    this.formSelected.emit(form);
  }
}
