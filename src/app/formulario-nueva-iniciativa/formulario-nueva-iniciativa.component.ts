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
    necesitaCanalContable: '',
  };

  cargandoToast: any;

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private jiraService: JiraService,
    private router: Router
  ) {}

  validarFormulario(): { valido: boolean; mensajes: string[] } {
    const mensajes: string[] = [];
    let valido = true;

    if (!this.nuevaIniciativa.nombreProducto.trim()) {
      mensajes.push('El nombre del producto es obligatorio.');
      valido = false;
    }

    if (!this.nuevaIniciativa.vertical.trim()) {
      mensajes.push('La vertical es obligatoria.');
      valido = false;
    }

    if (!this.validarEmail(this.nuevaIniciativa.nombreReferenteProducto)) {
      mensajes.push('El correo del referente del producto no es válido.');
      valido = false;
    }

    if (
      this.nuevaIniciativa.referenteUX.trim() &&
      !this.validarEmail(this.nuevaIniciativa.referenteUX)
    ) {
      mensajes.push('El correo del referente de UX no es válido.');
      valido = false;
    }

    if (
      this.nuevaIniciativa.referenteIT.trim() &&
      !this.validarEmail(this.nuevaIniciativa.referenteIT)
    ) {
      mensajes.push('El correo del referente de IT no es válido.');
      valido = false;
    }

    if (!this.nuevaIniciativa.compania.trim()) {
      mensajes.push('La compañía es obligatoria.');
      valido = false;
    }

    if (!this.nuevaIniciativa.fechaEstimadaImplementacion) {
      mensajes.push('La fecha estimada de implementación es obligatoria.');
      valido = false;
    }

    return { valido, mensajes };
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  enviarFormulario(event: Event) {
    event.preventDefault();

    const { valido, mensajes } = this.validarFormulario();
    if (!valido) {
      mensajes.forEach((mensaje) => {
        this.toastr.warning(mensaje, 'Advertencia');
      });
      return;
    }

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
