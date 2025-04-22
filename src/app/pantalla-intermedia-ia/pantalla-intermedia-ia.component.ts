import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-intermedia-ia',
  templateUrl: './pantalla-intermedia-ia.component.html',
  styleUrls: ['./pantalla-intermedia-ia.component.css']
})
export class PantallaIntermediaIaComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
