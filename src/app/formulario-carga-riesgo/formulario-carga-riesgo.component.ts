import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';

interface Epic {
  epicId: string;
  summary: string;
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
  iniciativaSeleccionada: { summary: string; epicId: string } | null = null;
  iniciativasEnCurso: { summary: string, epicId: string }[] = [];

  riesgosTemporales: {
    areaSeleccionada: string;
    titulo: string;
    descripcion: string;
    iniciativaSeleccionada: { summary: string; epicId: string } | null;
    tipo: string;
    editando?: boolean;
  }[] = [];

  constructor(
    private toastr: ToastrService,
    private jiraService: JiraService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cargarIniciativasDesdeBackend();
  }

  cargarIniciativasDesdeBackend() {
    this.http.get<{ message: string; data: Epic[] }>('http://localhost:3000/jira-api/getAllEpicInProgress').subscribe(
      (response) => {
        const epicas = response.data || [];

        this.iniciativasEnCurso = epicas.map(epic => ({
          epicId: epic.epicId,
          summary: epic.summary
        }));
      },
      (error) => {
        this.toastr.error('Hubo un error al cargar las iniciativas en curso');
        console.error('Error al cargar iniciativas:', error);
      }
    );
  }

  seleccionarIniciativa(epicId: string) {
    const iniciativa = this.iniciativasEnCurso.find(inc => inc.epicId === epicId);
    if (iniciativa) {
      this.iniciativaSeleccionada = iniciativa;
      console.log('Iniciativa seleccionada:', this.iniciativaSeleccionada);
    }
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

      console.log('EpicId encontrado:', epicId);

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
          console.log('Error al crear issue en Jira:', error);
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
    this.enviarVisible = true;

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
    console.log('Riesgo actualizado', this.riesgosTemporales[index]);
  }

  eliminarRiesgo(index: number) {
    this.riesgosTemporales.splice(index, 1);
    if (this.riesgosTemporales.length === 0) {
      this.tablaVisible = false;
    }
  }

  cancelarEdicion(riesgo: any) {
    riesgo.titulo = riesgo.original.titulo;
    riesgo.descripcion = riesgo.original.descripcion;
    riesgo.tipo = riesgo.original.tipo;
    riesgo.areaSeleccionada = riesgo.original.areaSeleccionada;

    riesgo.editando = false;
  }

  enviarFormulario(event: Event) {
    event.preventDefault();
    this.finalizarCargaRiesgos();
  }
}
