import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';
import { ExcelService } from '../services/excel.service';

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
  iniciativaSeleccionada: string = '';
  iniciativasEnCurso: string[] = [];

  riesgosTemporales: { areaSeleccionada: string, titulo: string, descripcion: string, iniciativa: string, tipo: string, editando?: boolean }[] = [];

  private excelURL: string = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAUCdcrxaFkPOWeHCNvsSyC6fMRLP49B2smkue0CQQSatzBWYz_QQK379bv4HfLauNM51jhUMf99y9/pubhtml';

  constructor(
    private toastr: ToastrService,
    private jiraService: JiraService,
    private excelService: ExcelService
  ) {}

  ngOnInit() {
    this.cargarIniciativasDesdeExcel();
  }

  cargarIniciativasDesdeExcel() {
    this.excelService.cargarExcelDesdeURL(this.excelURL).then((datos) => {
      this.iniciativasEnCurso = datos
        .slice(1)
        .filter((fila) => fila[0] && fila[1])
        .map((fila) => fila[1]);
    });
  }

  finalizarCargaRiesgos() {
    if (this.riesgosTemporales.length === 0) {
      this.toastr.error('No hay elementos para cargar.', 'Error');
      return;
    }

    this.riesgosTemporales.forEach(riesgo => {
      // Aplica el prefijo solo cuando se envíe a Jira
      const prefijo = riesgo.tipo === 'riesgo' ? '[RIESGO]' : '[RECOMENDACIÓN]';
      const tituloConPrefijo = `${prefijo} ${riesgo.titulo}`;

      this.jiraService.crearIssueEnJira(tituloConPrefijo, riesgo.descripcion, '10038').subscribe(
        () => {
          this.toastr.success('Elemento registrado exitosamente en Jira', 'Éxito');
        },
        (error) => {
          this.toastr.error('No se pudo registrar el elemento.', 'Error');
        }
      );
    });

    // Limpiar riesgos temporales después de enviarlos a Jira
    this.riesgosTemporales = [];
    this.formSubmitted.emit();
  }

  agregarRiesgo() {
    this.riesgosTemporales.push({
      areaSeleccionada: this.areaSeleccionada,
      titulo: this.tituloRiesgo,
      descripcion: this.descripcionRiesgo,
      iniciativa: this.iniciativaSeleccionada,
      tipo: this.tipoSeleccionado,
      editando: false,
    });

    // Reseteo los campos del formulario
    this.areaSeleccionada = '';
    this.tituloRiesgo = '';
    this.descripcionRiesgo = '';
    this.tipoSeleccionado = '';
    this.iniciativaSeleccionada = '';

    if (this.riesgosTemporales.length > 0) {
      this.tablaVisible = true;
    }
    this.enviarVisible = true;

    this.toastr.success('Riesgo agregado correctamente!');
  }



  editarCampo(riesgo: any) {
    // Guardamos los valores originales para poder restaurarlos si es necesario
    riesgo.original = {
      titulo: riesgo.titulo,
      descripcion: riesgo.descripcion,
      tipo: riesgo.tipo,
      areaSeleccionada: riesgo.areaSeleccionada
    };

    // Activamos el modo de edición
    riesgo.editando = true;
  }
  // Función para guardar los cambios
  guardarCampo(riesgo: any, index: number) {
    // Aquí podemos enviar los datos al servidor si es necesario

    // Desactivamos el modo de edición
    riesgo.editando = false;

    // Actualizamos el valor de la fila con los datos nuevos
    this.riesgosTemporales[index] = { ...riesgo };

    console.log('Riesgo actualizado', this.riesgosTemporales[index]);
  }

  cancelarEdicion(riesgo: any) {
    // Restauramos los valores originales
    riesgo.titulo = riesgo.original.titulo;
    riesgo.descripcion = riesgo.original.descripcion;
    riesgo.tipo = riesgo.original.tipo;
    riesgo.areaSeleccionada = riesgo.original.areaSeleccionada;

    // Desactivamos el modo de edición
    riesgo.editando = false;
  }

  enviarFormulario(event: Event) {
    event.preventDefault();
    this.finalizarCargaRiesgos();
  }

}
