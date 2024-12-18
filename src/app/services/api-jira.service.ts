import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JiraService {
  private jiraApiUrl = 'http://localhost:3000/jira-api'; // URL del backend

  constructor(private http: HttpClient) {}

  // Método genérico para crear issues en Jira
  crearIssueEnJira(nombre: string, descripcion: string, issueTypeId: string): Observable<any> {
    // Ajustar el payload para coincidir con lo que el backend espera
    const payload = {
      summary: nombre, // Título del issue
      description: descripcion, // Descripción del issue
      issueTypeId: issueTypeId, // ID dinámico del tipo de issue
    };

    // Enviar la solicitud al backend
    return this.http.post(this.jiraApiUrl, payload).pipe(
      catchError((error) => {
        console.error('Error al crear issue en Jira:', error);
        throw error; // Re-lanzar el error
      })
    );
  }
}
