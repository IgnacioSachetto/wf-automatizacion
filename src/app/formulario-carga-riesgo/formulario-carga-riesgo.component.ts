// formulario-nueva-iniciativa.component.ts
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';

@Component({
  selector: 'app-formulario-carga-riesgo',
  templateUrl: './formulario-carga-riesgo.component.html',
  styleUrls: ['./formulario-carga-riesgo.component.css']
})
export class FormularioCargaRiesgoComponent {
@Output() formSubmitted = new EventEmitter<void>();  // Emite un evento cuando se envía el formulario

tituloRiesgo: string = ''; // Título de la tarea
descripcionRiesgo: string = ''; // Descripción de la tarea

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private jiraService: JiraService

  ) {}

  enviarFormulario(event: Event) {
    event.preventDefault();

    // Validar los campos
    if (!this.tituloRiesgo || !this.descripcionRiesgo) {
      this.toastr.error('Por favor complete todos los campos antes de enviar.', 'Error');
      return;  // Detener la ejecución si los campos están vacíos
    }

    console.log('Nombre del riesgo:', this.tituloRiesgo);
    console.log('Descripción del riesgo:', this.descripcionRiesgo);
    this.toastr.success('Riesgo registrado con éxito', '¡Éxito!', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });

    this.cdr.detectChanges();

    setTimeout(() => {
      this.jiraService.crearIssueEnJira(this.tituloRiesgo, this.descripcionRiesgo, '10038').subscribe(
        (response) => {
          console.log('Tarea creada correctamente:', response);
          this.toastr.success('Tarea creada en Jira', '¡Éxito!');
          this.formSubmitted.emit();
        },
        (error) => {
          console.error('Error al crear tarea en Jira:', error);
          this.toastr.error('Error al crear la tarea en Jira', 'Error');
        }
      );
    }, 3000);  // Simulación de retardo
  }

}
