import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.urlAfterRedirects === '/';
      }
    });
  }

  ngOnInit(): void {
  }

  openExternalLink() {
    window.open('https://www.powerbi.com', '_blank');
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
