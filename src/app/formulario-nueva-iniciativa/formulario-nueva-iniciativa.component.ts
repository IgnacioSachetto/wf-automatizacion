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

  nuevaIniciativa = {
    nombreProducto: '',
    descripcionProducto: '',
    vertical: '',
    compañia: '',
    nombreReferenteProducto: '',
    referenteUX: '',
    referenteIT: '',
    compania: '',
    fechaEstimadaImplementacion: '',
  };

  cargandoToast: any;

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private jiraService: JiraService,
    private router: Router
  ) {}

  enviarFormulario(event: Event) {
    event.preventDefault();

    this.cdr.detectChanges();

    this.cargandoToast = this.toastr.info('Espere por favor...', 'Cargando!', {
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      timeOut: 0,
      extendedTimeOut: 0
    });

    this.jiraService.crearEpicEnJira(this.nuevaIniciativa).subscribe(
      (response) => {
        this.toastr.clear();
        this.toastr.success('Iniciativa registrada en el WF', '¡Éxito!');
        this.formSubmitted.emit();
        this.router.navigate(['/pantalla-intermedia-producto']);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al crear tarea en Jira:', error);
        this.toastr.error('Error al registrar la iniciativa', 'Error');
        this.cdr.detectChanges();
      }
    );
  }
}
