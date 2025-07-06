import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';

@Component({
  selector: 'app-formulario-monitoreo-ia',
  templateUrl: './formulario-monitoreo-ia.component.html',
  styleUrls: ['./formulario-monitoreo-ia.component.css']
})
export class FormularioMonitoreoIaComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<void>();

  iniciativaSeleccionada: { summary: string; epicId: string, status: string, description: string } | null = null;

  iniciativasEnCurso: any[] = [];
  areaSeleccionada = '';
  cargandoToast: any;

  datosIA = {
    email: '',
    iniciativaSeleccionada: '', // va el epicId
    iniciativaSeleccionadaNombre: '', // va el summary
    roles: '',
    comiteIA: '',
    evalLegalEtica: '',
    fichaTecnica: '',

    validacionTecnica: '',
    variablesSensibles: '',
    tratamientoDatos: '',

    catalogoIA: '',
    docTecnicoFuncional: '',
    accesoPentest: '',
    checkProduccion: '',

    planMonitoreo: '',
    registroUso: '',
    incidentes: '',
    versionado: '',

    criteriosVigencia: '',
    registroRevision: '',
    eliminacionSegura: '',
    evidenciaBaja: ''
  };

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private jiraService: JiraService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const summaryParam = params['iniciativa'];
      this.areaSeleccionada = params['area'] || '';

      this.iniciativaSeleccionada = null;

      this.cargarIniciativasDesdeBackend().then(() => {
        if (summaryParam) {
          this.iniciativaSeleccionada = this.iniciativasEnCurso.find(
            iniciativa => iniciativa.summary === summaryParam
          ) || null;
        }
      });
    });
  }

  cargarIniciativasDesdeBackend(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<{ message: string; data: any[] }>('http://localhost:3000/jira-api/getAllEpicInProgressIA').subscribe(
        (response) => {
          this.iniciativasEnCurso = response.data || [];
          resolve();
        },
        (error) => {
          this.toastr.error('Error al cargar iniciativas');
          reject();
        }
      );
    });
  }

  enviarFormularioMonitoreoIA(event: Event) {
    event.preventDefault();

    if (this.iniciativaSeleccionada) {
      this.datosIA.iniciativaSeleccionada = this.iniciativaSeleccionada.epicId;
      this.datosIA.iniciativaSeleccionadaNombre = this.iniciativaSeleccionada.summary;
    }

    this.cargandoToast = this.toastr.info('Enviando formulario...', 'Espere', {
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      timeOut: 0,
      extendedTimeOut: 0
    });

    this.jiraService.crearEpicMonitoreoEnJira(this.datosIA).subscribe(
      (response) => {
        this.toastr.clear();
        this.toastr.success('Formulario enviado con éxito', '¡Éxito!');
        this.formSubmitted.emit();
        this.router.navigate(['/pantalla-intermedia-ia']);
        this.cdr.detectChanges();
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error('Error al enviar el formulario', 'Error');
        console.error(error);
        this.cdr.detectChanges();
      }
    );
  }

  procesarDescripcion(descripcion: string): string[] {
    return descripcion ? descripcion.split('\n') : [];
  }
}
