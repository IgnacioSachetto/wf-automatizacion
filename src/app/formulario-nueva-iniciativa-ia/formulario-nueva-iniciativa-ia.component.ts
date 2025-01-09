import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario-nueva-iniciativa-ia',
  templateUrl: './formulario-nueva-iniciativa-ia.component.html',
  styleUrls: ['./formulario-nueva-iniciativa-ia.component.css']
})
export class FormularioNuevaIniciativaIaComponent {
  mostrarPreguntaProveedor: boolean = false;

  onTipoIniciativaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const tipoIniciativa = selectElement.value;

    if (tipoIniciativa === 'externo') {
      this.mostrarPreguntaProveedor = true;
    } else {
      this.mostrarPreguntaProveedor = false;
    }
  }

}
