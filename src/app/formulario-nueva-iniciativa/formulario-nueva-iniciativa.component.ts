// formulario-nueva-iniciativa.component.ts
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-iniciativa',
  templateUrl: './formulario-nueva-iniciativa.component.html',
  styleUrls: ['./formulario-nueva-iniciativa.component.css']
})
export class FormularioIniciativaComponent {
  @Output() formSubmitted = new EventEmitter<void>();  // Emite un evento cuando se envía el formulario

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  // Recibe el evento como argumento
  enviarFormulario(event: Event) {
    event.preventDefault();  // Evita que se recargue la página al enviar el formulario

    // Mostrar el toast
    this.toastr.success('Formulario enviado con éxito', '¡Éxito!', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });

    // Forzar la detección de cambios para que el toast se muestre correctamente
    this.cdr.detectChanges();

    // Emitir evento para que AppComponent sepa que el formulario fue enviado
    setTimeout(() => {
      this.formSubmitted.emit(); // Esto le notificará al componente principal
    }, 3000);
  }
}
