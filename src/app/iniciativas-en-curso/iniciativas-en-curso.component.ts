import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JiraService } from '../services/api-jira.service';

interface Epic {
  epicId: string;
  summary: string;
  assignee: string | null;
  duedate: string | null;
  url: string;
}

@Component({
  selector: 'app-iniciativas-en-curso',
  templateUrl: './iniciativas-en-curso.component.html',
  styleUrls: ['./iniciativas-en-curso.component.css']
})
export class IniciativasEnCursoComponent implements OnInit {
  iniciativas: Epic[] = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private jiraService: JiraService
  ) {}

  ngOnInit(): void {
    this.cargarIniciativas();
  }

  cargarIniciativas() {
    this.http.get<{ message: string; data: Epic[] }>('http://localhost:3000/jira-api/getAllEpicInProgressWithData').subscribe(
      (response) => {
        const epicas = response.data || [];

        this.iniciativas = epicas.map(epic => ({
          epicId: epic.epicId,
          summary: epic.summary,
          assignee: epic.assignee,
          duedate: epic.duedate,
          url: epic.url
        }));
      },
      (error) => {
        this.toastr.error('Hubo un error al cargar las iniciativas en curso');
        console.error('Error al cargar iniciativas:', error);
      }
    );
  }
}
