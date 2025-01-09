import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  // Método para redirigir a las rutas de los formularios
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  redirectToBase(): void {
    // Redirige a la ruta raíz
    this.router.navigate(['/']);
  }
}
