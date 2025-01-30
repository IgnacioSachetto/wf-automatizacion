import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';

interface Epic {
  epicId: string;
  summary: string;
  status: string;
}

interface Iniciativa {
  summary: string;
  epicId: string;
  status: string;
  taskId?: string;
  parentSummary?: string;
  assignee?: string;
  duedate?: string;
  urlts?: string;
}


@Component({
  selector: 'app-formulario-carga-riesgo',
  templateUrl: './formulario-carga-riesgo.component.html',
  styleUrls: ['./formulario-carga-riesgo.component.css'],
})
export class FormularioCargaRiesgoComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<void>();
  tablaVisible: boolean = true;
  enviarVisible: boolean = false;
  areaSeleccionada: string = '';
  tituloRiesgo: string = '';
  descripcionRiesgo: string = '';
  tipoSeleccionado: string = '';
  iniciativaSeleccionada: { summary: string; epicId: string, status: string } | null = null;
  iniciativasEnCurso: { summary: string, epicId: string, status: string }[] = [];
  riesgosTemporales: {
    areaSeleccionada: string;
    titulo: string;
    descripcion: string;
    iniciativaSeleccionada: { summary: string; epicId: string, status: string } | null;
    tipo: string;
    editando?: boolean;
  }[] = [];
  revisadoSinRiesgos: boolean = false;
  iniciativas: Iniciativa[] = [];
  iniciativaSeleccionadaDesdeRiesgo: Iniciativa | null = null;




  constructor(
    private toastr: ToastrService,
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
              console.log('Iniciativa seleccionada:', this.iniciativaSeleccionadaDesdeRiesgo);
              this.iniciativaSeleccionada = this.iniciativaSeleccionadaDesdeRiesgo;
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
      this.http.get<{ message: string; data: Epic[] }>('http://localhost:3000/jira-api/getAllEpicInProgress').subscribe(
        (response) => {
          const epicas = response.data || [];
          this.iniciativasEnCurso = epicas.map(epic => ({
            epicId: epic.epicId,
            summary: epic.summary,
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





  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  isVisible: boolean = false;
  isVisibleEnviar: boolean = false;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.isVisibleEnviar = !this.isVisibleEnviar;
  }



  seleccionarIniciativa(epicId: string) {
    const iniciativa = this.iniciativasEnCurso.find(inc => inc.epicId === epicId);
    if (iniciativa) {
      this.iniciativaSeleccionada = iniciativa;
    }
  }



  enviarFormulario(event: Event) {
    event.preventDefault();

    this.toastr.info('Cargando iniciativas...', 'Información', { timeOut: 1500 });

    if (this.revisadoSinRiesgos === false && this.riesgosTemporales.length === 0) {
      if (!this.iniciativaSeleccionada) {
        this.toastr.error('Debe seleccionar una iniciativa antes de continuar.');
        return;
      }

      if (!this.areaSeleccionada || this.areaSeleccionada.trim() === '') {
        this.toastr.error('Debe seleccionar un área antes de continuar.');
        return;
      }


      this.enviarDatosSinRiesgos();
    } else if (this.riesgosTemporales.length > 0) {
      this.finalizarCargaRiesgos();
    }
  }


  enviarDatosSinRiesgos() {
    const epic = this.iniciativasEnCurso.find(iniciativa => iniciativa.summary === this.iniciativaSeleccionada?.summary);
    const epicId = epic ? epic.epicId : '';

    if (!epicId) {
        this.toastr.error('No se encontró un EpicId correspondiente.', 'Error');
        return;
    }

    this.jiraService.iniciativaSinRiesgosPorArea(this.areaSeleccionada, epicId).subscribe(
        () => {
            this.toastr.success("Sin riesgos levantado por el area", 'Éxito');
            setTimeout(() => {
              this.router.navigate(['/pantalla-intermedia-producto']);
            }, 2000);        },
        (error) => {
            console.error('Error al enviar datos sin riesgos:', error);
            this.toastr.error('Hubo un problema al enviar los datos sin riesgos.', 'Error');
        }
    );
}


  finalizarCargaRiesgos() {
    if (this.riesgosTemporales.length === 0) {
      this.toastr.error('No hay elementos para cargar.', 'Error');
      return;
    }

    this.riesgosTemporales.forEach(riesgo => {
      const prefijo = riesgo.tipo === 'riesgo' ? '[RIESGO]' : '[RECOMENDACIÓN]';
      const tituloConPrefijo = `${prefijo} ${riesgo.titulo}`;
      const epic = this.iniciativasEnCurso.find(iniciativa => iniciativa.summary === riesgo.iniciativaSeleccionada?.summary);
      const epicId = epic ? epic.epicId : '';

      this.jiraService.crearRiskEnJira(
        tituloConPrefijo,
        riesgo.descripcion,
        '10038',
        riesgo.areaSeleccionada,
        epicId
      ).subscribe(
        () => {
          this.toastr.success('Formulario enviado correctamente!', 'Éxito');
          setTimeout(() => {
            this.router.navigate(['/pantalla-intermedia-producto']);
          }, 2000);
        },
        (error) => {
          this.toastr.error('No se pudo registrar el elemento.', 'Error');
        }
      );
    });

    this.riesgosTemporales = [];
    this.formSubmitted.emit();
  }

  agregarRiesgo() {
    if (!this.iniciativaSeleccionada) {
      this.toastr.error('Debe seleccionar una iniciativa antes de agregar un riesgo.');
      return;
    }

    if (!this.areaSeleccionada || this.areaSeleccionada.trim() === '') {
      this.toastr.error('Debe seleccionar un área antes de agregar un riesgo.');
      return;
    }

    if (!this.tituloRiesgo || this.tituloRiesgo.trim() === '') {
      this.toastr.error('Debe ingresar un título para el riesgo.');
      return;
    }

    if (!this.descripcionRiesgo || this.descripcionRiesgo.trim() === '') {
      this.toastr.error('Debe ingresar una descripción para el riesgo.');
      return;
    }

    if (!this.tipoSeleccionado || this.tipoSeleccionado.trim() === '') {
      this.toastr.error('Debe seleccionar un tipo de riesgo.');
      return;
    }

    this.riesgosTemporales.push({
      areaSeleccionada: this.areaSeleccionada,
      titulo: this.tituloRiesgo,
      descripcion: this.descripcionRiesgo,
      iniciativaSeleccionada: this.iniciativaSeleccionada,
      tipo: this.tipoSeleccionado,
      editando: false,
    });

    this.areaSeleccionada = '';
    this.tituloRiesgo = '';
    this.descripcionRiesgo = '';
    this.tipoSeleccionado = '';
    this.iniciativaSeleccionada = null;

    if (this.riesgosTemporales.length > 0) {
      this.tablaVisible = true;
    }
    this.isVisibleEnviar = true;

    this.toastr.success('Riesgo agregado correctamente!');
  }

  editarCampo(riesgo: any) {
    riesgo.original = {
      titulo: riesgo.titulo,
      descripcion: riesgo.descripcion,
      tipo: riesgo.tipo,
      areaSeleccionada: riesgo.areaSeleccionada
    };

    riesgo.editando = true;
  }

  guardarCampo(riesgo: any, index: number) {
    riesgo.editando = false;
    this.riesgosTemporales[index] = { ...riesgo };
  }

  eliminarRiesgo(index: number) {
    this.riesgosTemporales.splice(index, 1);

    if (this.riesgosTemporales.length === 0) {
      this.tablaVisible = false;
      this.isVisibleEnviar = false;
    }
  }

  cancelarEdicion(riesgo: any) {
    riesgo.titulo = riesgo.original.titulo;
    riesgo.descripcion = riesgo.original.descripcion;
    riesgo.tipo = riesgo.original.tipo;
    riesgo.areaSeleccionada = riesgo.original.areaSeleccionada;

    riesgo.editando = false;
  }
}
