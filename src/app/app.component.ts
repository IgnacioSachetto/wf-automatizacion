import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router
import { JiraService } from './services/api-jira.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentScreen: string = '';  // Para controlar la pantalla que se muestra
  selectedForm: string = '';   // Para controlar qué formulario se muestra

  constructor(private router: Router, private jiraService: JiraService) {}

  // Método para manejar el envío del formulario
  onFormSubmitted() {
    this.selectedForm = 'pantalla-intermedia-producto'; // Establece el formulario como "pantalla-intermedia-producto"
    this.currentScreen = 'pantalla-intermedia-producto'; // Configura la pantalla actual



}

onFormSubmitted2() {
  this.selectedForm = 'pantalla-intermedia-ia'; // Establece el formulario como "pantalla-intermedia-producto"
  this.currentScreen = 'pantalla-intermedia-ia'; // Configura la pantalla actual
}

  // Cuando se selecciona un formulario desde el Sidebar
  onFormSelected(formType: string) {
    console.log('Formulario seleccionado:', formType);
    this.selectedForm = formType;
    this.currentScreen = formType; // Mostrar la pantalla seleccionada
  }

  // Método para cerrar el formulario cuando se envíe
  onFormClosed() {
    this.selectedForm = ''; // Cerrar el formulario
    this.currentScreen = ''; // Ocultar la pantalla intermedia
  }

  onFormOpened(formType: string) {
    this.selectedForm = formType; // Mostramos el formulario correspondiente
    this.currentScreen = '';       // Ocultamos la pantalla intermedia
  }
}
