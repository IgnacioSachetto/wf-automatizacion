import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';

@Component({
  selector: 'app-formulario-iniciativa',
  templateUrl: './formulario-nueva-iniciativa.component.html',
  styleUrls: ['./formulario-nueva-iniciativa.component.css']
})
export class FormularioIniciativaComponent {
  @Output() formSubmitted = new EventEmitter<void>();

  nombreProducto: string = '';
  descripcionProducto: string = '';

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private jiraService: JiraService,
    private router: Router
  ) {}

  enviarFormulario(event: Event) {
    event.preventDefault();

    this.toastr.success('Formulario enviado con éxito', '¡Éxito!', {
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    });

    this.cdr.detectChanges();

    setTimeout(() => {
      this.jiraService.crearIssueEnJira(this.nombreProducto, this.descripcionProducto, '10039').subscribe(
        (response) => {
          this.toastr.success('Iniciativa registrada en el WF', '¡Éxito!');
          this.formSubmitted.emit();

          this.router.navigate(['/pantalla-intermedia-producto']);
        },
        (error) => {
          console.error('Error al crear tarea en Jira:', error);
          this.toastr.error('Error al registrar la iniciativa', 'Error');
        }
      );
    }, 3000);
  }
}
