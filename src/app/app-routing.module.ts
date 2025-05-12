import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadoRiesgosPorAreaComponent } from './estado-riesgos-por-area/estado-riesgos-por-area.component';
import { FormularioCargaRiesgoComponent } from './formulario-carga-riesgo/formulario-carga-riesgo.component';
import { FormularioNuevaIniciativaIAComponent } from './formulario-nueva-iniciativa-ia/formulario-nueva-iniciativa-ia.component';
import { FormularioIniciativaComponent } from './formulario-nueva-iniciativa/formulario-nueva-iniciativa.component';
import { FormularioPreProduccionIaComponent } from './formulario-pre-produccion-ia/formulario-pre-produccion-ia.component';
import { IniciativasEnCursoComponent } from './iniciativas-en-curso/iniciativas-en-curso.component';
import { PantallaIntermediaIaComponent } from './pantalla-intermedia-ia/pantalla-intermedia-ia.component';
import { PantallaIntermediaProductoComponent } from './pantalla-intermedia-producto/pantalla-intermedia-producto.component';

const routes: Routes = [
  { path: 'pantalla-intermedia-producto', component: PantallaIntermediaProductoComponent },
  { path: 'pantalla-intermedia-ia', component: PantallaIntermediaIaComponent },
  { path: 'formulario-nueva-iniciativa', component: FormularioIniciativaComponent },
  { path: 'formulario-carga-riesgo', component: FormularioCargaRiesgoComponent },
  { path: 'formulario-nueva-iniciativa-ia', component: FormularioNuevaIniciativaIAComponent},
  { path: 'formulario-pre-produccion-ia', component: FormularioPreProduccionIaComponent},
  { path: 'iniciativas-en-curso', component: IniciativasEnCursoComponent},
  { path: 'estado-riesgos-por-area', component: EstadoRiesgosPorAreaComponent},

  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
