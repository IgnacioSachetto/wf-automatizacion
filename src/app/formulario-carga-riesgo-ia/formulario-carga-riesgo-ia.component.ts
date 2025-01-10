import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-carga-riesgo-ia',
  templateUrl: './formulario-carga-riesgo-ia.component.html',
  styleUrls: ['./formulario-carga-riesgo-ia.component.css']
})
export class FormularioCargaRiesgoIaComponent {
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  enviarFormulario(event: Event) {
    event.preventDefault();

    this.toastr.success('Riesgo registrado con éxito', '¡Éxito!', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });

    this.cdr.detectChanges();

    setTimeout(() => {
      this.formSubmitted.emit();
    }, 3000);
  }
}



