import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-intermedia-producto',
  templateUrl: './pantalla-intermedia-producto.component.html',
  styleUrls: ['./pantalla-intermedia-producto.component.css']
})
export class PantallaIntermediaProductoComponent {

  constructor(private router: Router) {}

  // Método para redirigir a las rutas de los formularios
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
