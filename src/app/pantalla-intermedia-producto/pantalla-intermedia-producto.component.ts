import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-intermedia-producto',
  templateUrl: './pantalla-intermedia-producto.component.html',
  styleUrls: ['./pantalla-intermedia-producto.component.css']
})
export class PantallaIntermediaProductoComponent {

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  goToTableroLooker(){
      window.open('https://www.google.com', '_blank'); 
  }
}
