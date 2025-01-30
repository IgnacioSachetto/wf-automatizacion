import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { EstadoRiesgosPorAreaComponent } from './estado-riesgos-por-area/estado-riesgos-por-area.component';
import { FormularioCargaRiesgoIaComponent } from './formulario-carga-riesgo-ia/formulario-carga-riesgo-ia.component';
import { FormularioCargaRiesgoComponent } from './formulario-carga-riesgo/formulario-carga-riesgo.component';
import { FormularioNuevaIniciativaIaComponent } from './formulario-nueva-iniciativa-ia/formulario-nueva-iniciativa-ia.component';
import { FormularioIniciativaComponent } from './formulario-nueva-iniciativa/formulario-nueva-iniciativa.component';
import { IniciativasEnCursoComponent } from './iniciativas-en-curso/iniciativas-en-curso.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PantallaIntermediaIaComponent } from './pantalla-intermedia-ia/pantalla-intermedia-ia.component';
import { PantallaIntermediaProductoComponent } from './pantalla-intermedia-producto/pantalla-intermedia-producto.component';

const appRoutes: Routes = [
  { path: 'pantalla-intermedia-producto', component: PantallaIntermediaProductoComponent },
  { path: 'pantalla-intermedia-ia', component: PantallaIntermediaIaComponent },
  { path: 'formulario-carga-riesgos', component: FormularioCargaRiesgoComponent },
  { path: 'formulario-carga-riesgos-ia', component: FormularioCargaRiesgoIaComponent },
  { path: 'formulario-nueva-iniciativa', component: FormularioIniciativaComponent },
  { path: 'formulario-nueva-iniciativa-ia', component: FormularioNuevaIniciativaIaComponent },
  { path: 'iniciativas-en-curso', component: IniciativasEnCursoComponent },
  { path: 'estado-riesgos-por-area', component: EstadoRiesgosPorAreaComponent },

  { path: '*', redirectTo: '' }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PantallaIntermediaProductoComponent,
    FormularioIniciativaComponent,
    PantallaIntermediaIaComponent,
    FormularioCargaRiesgoComponent,
    FormularioCargaRiesgoIaComponent,
    FormularioNuevaIniciativaIaComponent,
    IniciativasEnCursoComponent,
    EstadoRiesgosPorAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
      newestOnTop: true
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
