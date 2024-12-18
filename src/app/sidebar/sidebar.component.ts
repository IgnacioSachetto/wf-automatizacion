import { Component, EventEmitter, Output } from '@angular/core';
import { JiraService } from '../services/api-jira.service'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private jiraService: JiraService) {}

  // Método para crear una tarea en Jira
  crearTareaEnJira() {


    this.jiraService.crearTareaEnJira().subscribe(
      (response) => {
        console.log('Tarea creada correctamente:', response);
        // Aquí puedes agregar lógica adicional para manejar la respuesta, como mostrar un mensaje de éxito.
      },
      (error) => {
        console.error('Error al crear tarea en Jira:', error);
        // Puedes agregar lógica aquí para manejar errores, como mostrar un mensaje de error.
      }
    );
  }

  @Output() formSelected = new EventEmitter<string>();

  // Emitimos el tipo de pantalla a mostrar
  selectForm(form: string) {
    this.formSelected.emit(form);
  }
}
