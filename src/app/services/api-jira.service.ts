import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JiraService {
  private jiraApiUrl = 'http://localhost:3000/jira-api';

  constructor(private http: HttpClient) {}

  crearIssueEnJira(nombre: string, descripcion: string, issueTypeId: string): Observable<any> {
    const payload = {
      summary: nombre,
      description: descripcion,
      issueTypeId: issueTypeId,
    };

    return this.http.post(this.jiraApiUrl, payload).pipe(
      catchError((error) => {
        console.error('Error al crear issue en Jira:', error);
        throw error;
      })
    );
  }
}
