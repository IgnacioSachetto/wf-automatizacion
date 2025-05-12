import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JiraService } from './services/api-jira.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentScreen: string = '';
  selectedForm: string = '';
  showNavbar: boolean = false;

  constructor(private router: Router, private jiraService: JiraService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.urlAfterRedirects === '/';
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onFormSubmitted() {
    this.navigateTo('pantalla-intermedia-producto');
    this.setForm('pantalla-intermedia-producto');
  }

  onFormSubmitted2() {
    this.navigateTo('pantalla-intermedia-ia');
    this.setForm('pantalla-intermedia-ia');
  }

  onFormSelected(formType: string) {
    console.log('Formulario seleccionado:', formType);
    this.setForm(formType);
  }

  onFormClosed() {
    this.selectedForm = '';
    this.currentScreen = '';
  }

  onFormOpened(formType: string) {
    this.selectedForm = formType;
    this.currentScreen = '';
  }

  openExternalLink() {
    window.open('https://www.powerbi.com', '_blank');
  }


  private setForm(formType: string) {
    this.selectedForm = formType;
    this.currentScreen = formType;
  }
}
