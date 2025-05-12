import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';

interface Epic {
  taskId: string;
  summary: string;
  parentSummary: string | null;
  assignee: string | null;
  duedate: string | null;
  status: string | null;
  url: string;
}

@Component({
  selector: 'app-estado-riesgos-por-area-ia',
  templateUrl: './estado-riesgos-por-area-ia.component.html',
  styleUrls: ['./estado-riesgos-por-area-ia.component.css']
})
export class EstadoRiesgosPorAreaIaComponent  {
  iniciativas: Epic[] = [];
  areaSeleccionada: string = '';
  iniciativaSeleccionadaDesdeRiesgo: Epic | null = null;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private jiraService: JiraService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  navigateToFormularioCargaRiesgos(parentSummary: string | null, area: string): void {

    this.router.navigate(['/formulario-carga-riesgos'], {
      queryParams: { iniciativa: parentSummary, area: area }
    });
  }

  navigateToFormularioCargaRiesgosGeneral(parentSummary: string | null, area: string): void {

    this.router.navigate(['/formulario-carga-riesgos'], {
      queryParams: { area: area }
    });
  }

  cargarIniciativas() {
    this.toastr.info('Cargando Riesgos Pendientes...', 'Información', { timeOut: 1000 });

    this.http.get<{ message: string; data: any[] }>(`http://localhost:3000/jira-api/getAllEpicWithoutRisks?areaSeleccionada=${encodeURIComponent(this.areaSeleccionada)}`)
      .subscribe(
        (response) => {
          const epicas = response.data || [];

          this.iniciativas = epicas.map(epic => ({
            taskId: epic.taskId,
            summary: epic.summary,
            parentSummary: epic.parentSummary,
            assignee: epic.assignee,
            duedate: epic.duedate,
            status: epic.status,
            url: epic.url
          }));
        },
        (error) => {
          this.toastr.error('Hubo un error al cargar las iniciativas por área');
          console.error('Error al cargar iniciativas:', error);
        }
      );
  }
}
