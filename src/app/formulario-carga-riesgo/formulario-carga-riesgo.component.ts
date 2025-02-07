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
  responsableRiesgo: string = '';
  descripcionRiesgo: string = '';
  tipoSeleccionado: string = '';
  iniciativaSeleccionada: { summary: string; epicId: string, status: string } | null = null;
  iniciativasEnCurso: { summary: string, epicId: string, status: string }[] = [];
  iniciativasCanalContable: { epicId: string }[] = [];
  riesgosTemporales: {
    areaSeleccionada: string;
    titulo: string;
    responsableRiesgo: string;
    descripcion: string;
    iniciativaSeleccionada: { summary: string; epicId: string, status: string } | null;
    tipo: string;
    editando?: boolean;
  }[] = [];
  revisadoSinRiesgos: boolean = false;
  iniciativas: Iniciativa[] = [];
  iniciativaSeleccionadaDesdeRiesgo: Iniciativa | null = null;
  epicConCanalContable: string[] = [];
  mensajeAlerta: string = '';
  tipoAlerta: string = '';
  areaOtro?: string;
  isVisibleOtro: boolean = false;
  areaSecundariaSeleccionada: string = '';

  constructor(
    private toastr: ToastrService,
    private jiraService: JiraService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.obtenerEpicasConCanalContable();

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
              this.onIniciativaSeleccionada();

              if (this.iniciativasEnCurso.some(iniciativa => iniciativa.epicId === this.iniciativaSeleccionada?.epicId)) {
                console.log('Iniciativa cargada automaticamente');
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



  obtenerEpicasConCanalContable(): void {
    this.http.get<{ message: string; data: Epic[] }>('http://localhost:3000/jira-api/getAllEpicWithCanalContable')
      .subscribe(
        (response) => {
          const epicas = response.data || [];
          this.iniciativasCanalContable = epicas.map(epic => ({ epicId: epic.epicId }));
        },
        (error) => {
          this.toastr.error('Hubo un error al cargar las iniciativas con canal contable');
        }
      );
  }

  onIniciativaSeleccionada(): void {
    const tieneCanalContable = this.iniciativasCanalContable.some(epic => epic.epicId === this.iniciativaSeleccionada!.epicId);

    if (tieneCanalContable) {
      this.mensajeAlerta = 'Este riesgo corresponde a una iniciativa que necesita canal contable. No se procederá con la creación hasta que se mitigue.';
    }
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
  isVisibleSinRiesgos: boolean = true;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.isVisibleEnviar = !this.isVisibleEnviar;
    this.isVisibleSinRiesgos = !this.isVisibleSinRiesgos;

  }



  seleccionarIniciativa(epicId: string) {
    const iniciativa = this.iniciativasEnCurso.find(inc => inc.epicId === epicId);
    if (iniciativa) {
      this.iniciativaSeleccionada = iniciativa;
    }
  }



  enviarFormulario(event: Event) {
    event.preventDefault();

    this.toastr.info('Registrando Riesgos...', 'Espere', { timeOut: 1500 });



    const crearTareasPromises = this.riesgosTemporales.map(riesgo => {
      return new Promise<void>((resolve, reject) => {

        if (riesgo.iniciativaSeleccionada?.epicId) {

          const areaSecundaria = this.areaOtro?.trim();

          if (areaSecundaria) {
            this.http.get<{ message: string; data: string[] }>('http://localhost:3000/jira-api/getTasksInEpic', {
              params: { epicId: riesgo.iniciativaSeleccionada?.epicId }
            }).subscribe(
              (response) => {
                console.log(`Áreas asociadas a la épica ${riesgo.iniciativaSeleccionada?.epicId}:`, response.data);

                if (response.data.includes(areaSecundaria)) {
                  console.log(`El área ${areaSecundaria} está en la lista de áreas asociadas a la épica.`);
                  resolve();
                } else {
                  console.log(`El área ${areaSecundaria} NO está en la lista de áreas asociadas a la épica.`);

                  this.jiraService.crearTareaEnJira(areaSecundaria, riesgo.iniciativaSeleccionada?.epicId).subscribe(
                    () => {
                      resolve();
                    },
                    (error) => {
                      console.error('Error al enviar datos sin riesgos:', error);
                      this.toastr.error('Hubo un problema al enviar los datos sin riesgos.', 'Error');
                      reject(error);
                    }
                  );
                }
              },
              (error) => {
                console.error('Error al obtener tareas de la épica', error);
                reject(error);
              }
            );
          } else {
            console.log('Área secundaria no seleccionada o vacía. Saltando la creación de tareas.');
            resolve();
          }
        } else {
          resolve();
        }
      });
    });

    Promise.all(crearTareasPromises)
      .then(() => {
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
      })
      .catch((error) => {
        console.error('Hubo un error al crear las tareas en Jira:', error);
        this.toastr.error('Hubo un problema al crear las tareas en Jira.', 'Error');
      });
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
        }, 2000);
      },
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
      console.log('Enviando riesgo a Jira:', {
        tituloConPrefijo,
        descripcion: riesgo.descripcion,
        areaSeleccionada: riesgo.areaSeleccionada,
        responsableRiesgo: riesgo.responsableRiesgo,
        epicId: epicId
      });
            this.jiraService.crearRiskEnJira(
        tituloConPrefijo,
        riesgo.descripcion,
        '10038',
        riesgo.areaSeleccionada,
        riesgo.responsableRiesgo,
        epicId
      ).subscribe(
        () => {
          this.toastr.success('Riesgo registrado correctamente!', 'Éxito');
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

  onAreaSeleccionada() {
    if (this.areaSeleccionada === 'area-secundaria') {
      this.isVisibleOtro = true;
    } else {
      this.isVisibleOtro = false;
      this.areaOtro = '';
    }
  }



  agregarRiesgo() {
    const riesgosMismaIniciativaYArea = this.riesgosTemporales.filter(riesgo =>
      riesgo.iniciativaSeleccionada?.epicId === this.iniciativaSeleccionada?.epicId &&
      riesgo.areaSeleccionada === this.areaSeleccionada
    );

    if (riesgosMismaIniciativaYArea.length >= 2) {
      this.toastr.warning('No puedes agregar más de 2 riesgos para la misma iniciativa y área.');
      return;
    }

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

    if (!this.responsableRiesgo || this.responsableRiesgo.trim() === '') {
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

    const areaParaRiesgo = (this.areaSeleccionada === 'area-secundaria' && this.areaOtro) ? this.areaOtro : this.areaSeleccionada;

    this.riesgosTemporales.push({
      areaSeleccionada: areaParaRiesgo,
      titulo: this.tituloRiesgo,
      responsableRiesgo: this.responsableRiesgo,
      descripcion: this.descripcionRiesgo,
      iniciativaSeleccionada: this.iniciativaSeleccionada,
      tipo: this.tipoSeleccionado,
      editando: false,
    });

    this.areaSeleccionada = '';
    this.tituloRiesgo = '';
    this.responsableRiesgo = '';
    this.descripcionRiesgo = '';
    this.tipoSeleccionado = '';
    this.iniciativaSeleccionada = null;

    if (this.riesgosTemporales.length > 0) {
      this.tablaVisible = true;
    }
    this.isVisibleEnviar = true;
    this.isVisibleSinRiesgos = false;

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
      this.isVisibleSinRiesgos = true;
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
