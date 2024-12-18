import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';

@Component({
  selector: 'app-formulario-iniciativa',
  templateUrl: './formulario-nueva-iniciativa.component.html',
  styleUrls: ['./formulario-nueva-iniciativa.component.css']
})
export class FormularioIniciativaComponent {
  @Output() formSubmitted = new EventEmitter<void>(); // Emite un evento cuando se envía el formulario

  nombreProducto: string = ''; // Título de la tarea
  descripcionProducto: string = ''; // Descripción de la tarea

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private jiraService: JiraService
  ) {}

  enviarFormulario(event: Event) {
    event.preventDefault(); // Evita recargar la página

    // Mostrar mensaje de éxito
    this.toastr.success('Formulario enviado con éxito', '¡Éxito!', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });

    this.cdr.detectChanges(); // Forzar la detección de cambios

    // Llamar al servicio para crear una tarea en Jira
    setTimeout(() => {
      this.jiraService.crearIssueEnJira(this.nombreProducto, this.descripcionProducto, '10039').subscribe(
        (response) => {
          console.log('Tarea creada correctamente:', response);
          this.toastr.success('Tarea creada en Jira', '¡Éxito!');
          this.formSubmitted.emit(); // Emitir evento al componente principal
        },
        (error) => {
          console.error('Error al crear tarea en Jira:', error);
          this.toastr.error('Error al crear la tarea en Jira', 'Error');
        }
      );
    }, 3000); // Simulación de retardo
  }
}
