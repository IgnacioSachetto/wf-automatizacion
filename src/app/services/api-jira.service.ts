import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JiraService {
  private jiraApiUrl = 'http://localhost:3000/jira-api';  // URL completa incluyendo el puerto 3000

  constructor(private http: HttpClient) {}

  // Método para crear una tarea en Jira
  crearTareaEnJira( ): Observable<any> {
    const payload = {
      "fields": {
        "issuetype": {
          "id": '10038'  // ID del tipo de tarea (por ejemplo, Epic o Task)
        },
        "project": {
          "id": '10017'  // ID de tu proyecto
        },
        "summary": "nACHO",  // El título de la tarea
        "description": "nacho descri",  // Descripción de la tarea
      }
    };

    // Enviar la solicitud al backend que está en /jira-api
    return this.http.post(this.jiraApiUrl, payload).pipe(
      catchError((error) => {
        console.error('Error al crear tarea en Jira:', error);
        throw error;  // Re-lanzar el error
      })
    );
  }
}
