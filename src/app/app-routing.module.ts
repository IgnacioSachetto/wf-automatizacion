import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioCargaRiesgoComponent } from './formulario-carga-riesgo/formulario-carga-riesgo.component';
import { FormularioIniciativaComponent } from './formulario-nueva-iniciativa/formulario-nueva-iniciativa.component';
import { PantallaIntermediaIaComponent } from './pantalla-intermedia-ia/pantalla-intermedia-ia.component';
import { PantallaIntermediaProductoComponent } from './pantalla-intermedia-producto/pantalla-intermedia-producto.component';


const routes: Routes = [
  { path: 'pantalla-intermedia-producto', component: PantallaIntermediaProductoComponent },
  { path: 'pantalla-intermedia-ia', component: PantallaIntermediaIaComponent },
  { path: 'formulario-nueva-iniciativa', component: FormularioIniciativaComponent },
  { path: 'formulario-carga-riesgo', component: FormularioCargaRiesgoComponent },

  { path: '', redirectTo: '', pathMatch: 'full' }, // No redirige a ninguna pantalla, se queda en blanco
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
