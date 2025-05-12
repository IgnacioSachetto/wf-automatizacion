import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';

@Component({
  selector: 'app-formulario-ia',
  templateUrl: './formulario-nueva-iniciativa-ia.component.html',
  styleUrls: ['./formulario-nueva-iniciativa-ia.component.css']
})
export class FormularioNuevaIniciativaIAComponent {
  @Output() formSubmitted = new EventEmitter<void>();

  nuevaIniciativaIA = {
    email: '',
    tituloIniciativa: '',
    documentacionProyecto: '',
    fechaImplementacion: '',
    interesadosIniciativa: '',
    almacenamientoDatos: '',
    detalleDatosCriticos: '',
    tipoIniciativa: '',
    tipoUsuarios: '',
    proveedoresServicio: '',
    ddjjProveedor: '',
    proveedoresAdicionales: '',
    proteccionDatosProveedor: '',
    riesgoSubliminal: '',
    riesgoVulnerabilidad: '',
    identificacionBiometrica: ''
  };

  cargandoToast: any;
  mostrarPreguntaProveedor = false;
  mostrarDetalleDatosCriticos = false; // <-- esta es la propiedad que faltaba

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private jiraService: JiraService,
    private router: Router
  ) {}

  verificarDatosCriticos() {
    this.mostrarDetalleDatosCriticos = this.nuevaIniciativaIA.almacenamientoDatos === 'si';
  }

  verificarTipoIniciativa() {
    this.mostrarPreguntaProveedor = this.nuevaIniciativaIA.tipoIniciativa === 'Externo';

    if (!this.mostrarPreguntaProveedor) {
      this.nuevaIniciativaIA.proveedoresServicio = '';
      this.nuevaIniciativaIA.ddjjProveedor = '';
    }
  }

  validarFormulario(): { valido: boolean; mensajes: string[] } {
    const mensajes: string[] = [];
    let valido = true;

    if (!this.nuevaIniciativaIA.email.trim()) {
      mensajes.push('El correo electrónico del referente es obligatorio.');
      valido = false;
    }

    if (!this.nuevaIniciativaIA.tituloIniciativa.trim()) {
      mensajes.push('El título de la iniciativa es obligatorio.');
      valido = false;
    }

    if (!this.nuevaIniciativaIA.documentacionProyecto.trim()) {
      mensajes.push('La documentación del proyecto es obligatoria.');
      valido = false;
    }

    if (!this.nuevaIniciativaIA.fechaImplementacion) {
      mensajes.push('La fecha de implementación es obligatoria.');
      valido = false;
    }

    if (!this.nuevaIniciativaIA.interesadosIniciativa.trim()) {
      mensajes.push('Los interesados en la iniciativa son obligatorios.');
      valido = false;
    }

    if (this.nuevaIniciativaIA.almacenamientoDatos === '') {
      mensajes.push('Es necesario indicar si el modelo almacena datos críticos.');
      valido = false;
    }

    if (!this.nuevaIniciativaIA.tipoIniciativa.trim()) {
      mensajes.push('El tipo de iniciativa es obligatorio.');
      valido = false;
    }

    if (this.mostrarPreguntaProveedor && !this.nuevaIniciativaIA.proveedoresServicio.trim()) {
      mensajes.push('La lista de proveedores requeridos es obligatoria.');
      valido = false;
    }



    if (this.nuevaIniciativaIA.riesgoSubliminal === '') {
      mensajes.push('Es necesario indicar si el modelo incluye riesgos subliminales.');
      valido = false;
    }

    if (this.nuevaIniciativaIA.riesgoVulnerabilidad === '') {
      mensajes.push('Es necesario indicar si el modelo afecta a personas vulnerables.');
      valido = false;
    }

    if (this.nuevaIniciativaIA.identificacionBiometrica === '') {
      mensajes.push('Es necesario indicar si el modelo incluye identificación biométrica.');
      valido = false;
    }

    return { valido, mensajes };
  }

  enviarFormularioIA(event: Event) {
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

    this.jiraService.crearEpicIAEnJira(this.nuevaIniciativaIA).subscribe(
      (response) => {
        this.toastr.clear();
        this.toastr.success('Formulario IA registrado con éxito', '¡Éxito!');
        this.formSubmitted.emit();
        this.router.navigate(['/pantalla-intermedia-ia']);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al crear la tarea de IA en Jira:', error);
        this.toastr.error('Error al registrar la IA', 'Error');
        this.cdr.detectChanges();
      }
    );
  }
}
