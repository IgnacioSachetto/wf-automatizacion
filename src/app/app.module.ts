import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { EstadoRiesgosPorAreaIaComponent } from './estado-riesgos-por-area-ia/estado-riesgos-por-area-ia.component';
import { EstadoRiesgosPorAreaComponent } from './estado-riesgos-por-area/estado-riesgos-por-area.component';
import { FormularioCargaRiesgoIAComponent } from './formulario-carga-riesgo-ia/formulario-carga-riesgo-ia.component';
import { FormularioCargaRiesgoComponent } from './formulario-carga-riesgo/formulario-carga-riesgo.component';
import { FormularioMonitoreoIaComponent } from './formulario-monitoreo-ia/formulario-monitoreo-ia.component';
import { FormularioNuevaIniciativaIAComponent } from './formulario-nueva-iniciativa-ia/formulario-nueva-iniciativa-ia.component';
import { FormularioIniciativaComponent } from './formulario-nueva-iniciativa/formulario-nueva-iniciativa.component';
import { FormularioPreProduccionIaComponent } from './formulario-pre-produccion-ia/formulario-pre-produccion-ia.component';
import { IniciativasEnCursoIAComponent } from './iniciativas-en-curso-ia/iniciativas-en-curso-ia.component';
import { IniciativasEnCursoComponent } from './iniciativas-en-curso/iniciativas-en-curso.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PantallaIntermediaIaComponent } from './pantalla-intermedia-ia/pantalla-intermedia-ia.component';
import { PantallaIntermediaProductoComponent } from './pantalla-intermedia-producto/pantalla-intermedia-producto.component';

const appRoutes: Routes = [
  { path: 'pantalla-intermedia-producto', component: PantallaIntermediaProductoComponent },
  { path: 'pantalla-intermedia-ia', component: PantallaIntermediaIaComponent },
  { path: 'formulario-carga-riesgos', component: FormularioCargaRiesgoComponent },
  { path: 'formulario-carga-riesgos-ia', component: FormularioCargaRiesgoIAComponent },
  { path: 'formulario-nueva-iniciativa', component: FormularioIniciativaComponent },
  { path: 'formulario-nueva-iniciativa-ia', component: FormularioNuevaIniciativaIAComponent },
  { path: 'formulario-pre-produccion-ia', component: FormularioPreProduccionIaComponent },
  { path: 'formulario-monitoreo-ia', component: FormularioMonitoreoIaComponent },
  { path: 'iniciativas-en-curso', component: IniciativasEnCursoComponent },
  { path: 'iniciativas-en-curso-ia', component: IniciativasEnCursoIAComponent },
  { path: 'estado-riesgos-por-area', component: EstadoRiesgosPorAreaComponent },
  { path: 'estado-riesgos-por-area-ia', component: EstadoRiesgosPorAreaIaComponent },

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
    FormularioCargaRiesgoIAComponent,
    FormularioNuevaIniciativaIAComponent,
    IniciativasEnCursoComponent,
    EstadoRiesgosPorAreaComponent,
    IniciativasEnCursoIAComponent,
    EstadoRiesgosPorAreaIaComponent,
    FormularioPreProduccionIaComponent,
    FormularioMonitoreoIaComponent
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
