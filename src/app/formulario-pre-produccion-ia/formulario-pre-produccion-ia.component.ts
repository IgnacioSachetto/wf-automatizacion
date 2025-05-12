import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';

interface Epic {
  epicId: string;
  summary: string;
  status: string;
  description: string;
}

interface Iniciativa {
  summary: string;
  epicId: string;
  status: string;
  description: string;
  taskId?: string;
  parentSummary?: string;
  assignee?: string;
  duedate?: string;
  urlts?: string;
}

@Component({
  selector: 'app-formulario-pre-produccion-ia',
  templateUrl: './formulario-pre-produccion-ia.component.html',
  styleUrls: ['./formulario-pre-produccion-ia.component.css']
})
export class FormularioPreProduccionIaComponent {
  @Output() formSubmitted = new EventEmitter<void>();

  iniciativaSeleccionada: { summary: string; epicId: string, status: string, description: string } | null = null;
  iniciativasEnCurso: { summary: string, epicId: string, status: string, description: string }[] = [];
  iniciativaSeleccionadaDesdeRiesgo: Iniciativa | null = null;
  areaSeleccionada: string = '';

  nuevaIniciativaIA = {
    email: '',
    tituloIniciativa: '',
    iniciativaSeleccionada: '',
    iniciativaSeleccionadaNombre: '',
    tipoDesarrollo: '',
    documentacionProyecto: '',
    fechaImplementacion: '',
    interesadosIniciativa: '',
    almacenamientoDatos: '',
    tipoIniciativa: '', // 'interno' o 'externo'

    // Preguntas para Desarrollo Interno
    certificaciones: '',
    medidasSeguridad: '',
    continuidadNegocio: '',
    impactoCritico: '',
    monitoreoTiempoReal: '',
    actualizacionModelo: '',
    accesoAutorizado: '',
    gestionCambios: '',
    monitoreoInterno: '',

    // Preguntas para Desarrollo Externo
    ddjjProveedor: '',
    ubicacionDatosProveedor: '',
    politicaProveedor: '',
    proveedoresAdicionales: '',
    monitoreoProveedor: '',
    continuidadExterno: '',
    impactoExterno: ''
  };

  cargandoToast: any;
  mostrarPreguntaProveedor = false;

  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private jiraService: JiraService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [key: string]: string }) => {
      const summaryParam = params['iniciativa'];
      this.areaSeleccionada = params['area'] || '';

      this.iniciativaSeleccionada = null;

      this.cargarIniciativasDesdeBackend().then(() => {
        if (this.iniciativasEnCurso && this.iniciativasEnCurso.length > 0) {
          if (summaryParam) {
            this.iniciativaSeleccionadaDesdeRiesgo = this.iniciativasEnCurso.find(
              iniciativa => iniciativa.summary === summaryParam
            ) || null;

            if (this.iniciativaSeleccionadaDesdeRiesgo) {
              this.iniciativaSeleccionada = this.iniciativaSeleccionadaDesdeRiesgo;

              if (this.iniciativasEnCurso.some(iniciativa => iniciativa.epicId === this.iniciativaSeleccionada?.epicId)) {
                console.log('Iniciativa cargada automáticamente');
              }
            } else {
              console.log('No se encontró la iniciativa con el summary:', summaryParam);
            }
          } else {
            console.log('No se pasó un parámetro de iniciativa, el select quedará vacío.');
          }
        } else {
          console.log('Las iniciativas aún no están cargadas.');
        }
      });
    });
  }

  cargarIniciativasDesdeBackend(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<{ message: string; data: Epic[] }>('http://localhost:3000/jira-api/getAllEpicInProgressIA').subscribe(
        (response) => {
          const epicas = response.data || [];
          this.iniciativasEnCurso = epicas.map(epic => ({
            epicId: epic.epicId,
            summary: epic.summary,
            description: epic.description,
            status: epic.status
          }));

          resolve();
        },
        (error) => {
          this.toastr.error('Hubo un error al cargar las iniciativas en curso');
          console.error('Error al cargar iniciativas:', error);
          reject();
        }
      );
    });
  }

  procesarDescripcion(descripcion: string): string[] {
    if (!descripcion) return [];

    // Dividir la descripción en líneas por salto de línea
    let partes = descripcion.split('\n');

    // Si tienes una lógica especial de formateo, por ejemplo, separar títulos de la descripción,
    // puedes usar expresiones regulares o dividir por otras palabras clave.
    return partes;
  }

  onTipoIniciativaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const tipoIniciativa = selectElement.value;

    // Controla la visibilidad de las preguntas relacionadas con proveedores
    if (tipoIniciativa === 'externo' || tipoIniciativa === 'ambas') {
      this.mostrarPreguntaProveedor = true;
    } else {
      this.mostrarPreguntaProveedor = false;
    }
  }


  enviarFormularioPreProduccionIA(event: Event) {
    event.preventDefault();

    if (this.iniciativaSeleccionada) {
      this.nuevaIniciativaIA.iniciativaSeleccionada = this.iniciativaSeleccionada.epicId;
      this.nuevaIniciativaIA.iniciativaSeleccionadaNombre = this.iniciativaSeleccionada.summary;
    }

    this.cargandoToast = this.toastr.info('Espere por favor...', 'Cargando!', {
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      timeOut: 0,
      extendedTimeOut: 0
    });

    this.jiraService.crearEpicPreCicloEnJira(this.nuevaIniciativaIA).subscribe(


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
