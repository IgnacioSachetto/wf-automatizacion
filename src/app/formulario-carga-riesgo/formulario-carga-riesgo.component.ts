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
    tipoSeleccionado: string = ''; // Nueva variable para almacenar el tipo seleccionado
    iniciativaSeleccionada: string = '';
    iniciativasEnCurso: string[] = [];

    riesgosTemporales: { areaSeleccionada: string, titulo: string, descripcion: string, iniciativa: string, tipo: string }[] = [];

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
          .filter((fila) => fila[2] === 'En Curso')
          .map((fila) => fila[1])
          .filter((valor) => valor);
      }).catch((error) => {
        console.error('Error al cargar el Excel:', error);
        this.toastr.error('No se pudo cargar la lista de iniciativas.', 'Error');
      });
    }

    agregarRiesgo() {
      if (!this.tituloRiesgo || !this.descripcionRiesgo || !this.iniciativaSeleccionada || !this.tipoSeleccionado) {
        this.toastr.error('Por favor complete todos los campos.', 'Error');
        return;
      }


      this.riesgosTemporales.push({ areaSeleccionada: this.areaSeleccionada,
        titulo:  this.tituloRiesgo,
        descripcion: this.descripcionRiesgo,
        iniciativa: this.iniciativaSeleccionada,
        tipo: this.tipoSeleccionado, // Guardamos el tipo por si es necesario
      });

      this.tituloRiesgo = '';
      this.descripcionRiesgo = '';
      this.iniciativaSeleccionada = '';
      this.tipoSeleccionado = '';
      this.toastr.success('Elemento agregado temporalmente', 'Éxito');
      this.tablaVisible = true;
      this.enviarVisible = true;
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




    enviarFormulario(event: Event) {
      event.preventDefault();
      this.finalizarCargaRiesgos();
    }
  }


