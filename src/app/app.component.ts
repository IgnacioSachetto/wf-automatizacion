import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JiraService } from './services/api-jira.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentScreen: string = '';
  selectedForm: string = '';

  constructor(private router: Router, private jiraService: JiraService) {}

  onFormSubmitted() {
    this.selectedForm = 'pantalla-intermedia-producto';
    this.currentScreen = 'pantalla-intermedia-producto';



}

onFormSubmitted2() {
  this.selectedForm = 'pantalla-intermedia-ia';
  this.currentScreen = 'pantalla-intermedia-ia';
}

  onFormSelected(formType: string) {
    console.log('Formulario seleccionado:', formType);
    this.selectedForm = formType;
    this.currentScreen = formType;
  }

  onFormClosed() {
    this.selectedForm = '';
    this.currentScreen = '';
  }

  onFormOpened(formType: string) {
    this.selectedForm = formType;
    this.currentScreen = '';
  }
}
