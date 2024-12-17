import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Asegúrate de que FormsModule esté importado
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { FormularioIniciativaComponent } from './formulario-nueva-iniciativa/formulario-nueva-iniciativa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PantallaIntermediaIaComponent } from './pantalla-intermedia-ia/pantalla-intermedia-ia.component';
import { PantallaIntermediaProductoComponent } from './pantalla-intermedia-producto/pantalla-intermedia-producto.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormularioCargaRiesgoComponent } from './formulario-carga-riesgo/formulario-carga-riesgo.component';
import { FormularioCargaRiesgoIaComponent } from './formulario-carga-riesgo-ia/formulario-carga-riesgo-ia.component';
import { FormularioNuevaIniciativaIaComponent } from './formulario-nueva-iniciativa-ia/formulario-nueva-iniciativa-ia.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    PantallaIntermediaProductoComponent,
    FormularioIniciativaComponent,
    PantallaIntermediaIaComponent,
    FormularioCargaRiesgoComponent,
    FormularioCargaRiesgoIaComponent,
    FormularioNuevaIniciativaIaComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,  // Necesario para Toastr
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',   // Ubicación del toast
      timeOut: 3000,                     // Duración del toast
      closeButton: true,                 // Mostrar botón de cerrar
      progressBar: true,                 // Mostrar barra de progreso
      preventDuplicates: true,           // Evitar duplicados
      newestOnTop: true                  // Colocar el toast más reciente arriba
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
