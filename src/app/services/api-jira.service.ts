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

  crearEpicEnJira(formulario: any): Observable<any> {
    const payload = {
      formulario
        };

    return this.http.post(`${this.jiraApiUrl}/createEpic`, payload).pipe(
      catchError((error) => {
        console.error('Error al crear Epic en Jira:', error);
        throw error;
      })
    );
  }



  crearRiskEnJira(
    nombre: string,
    descripcion: string,
    issueTypeId: string,
    areaSeleccionada: string,
    epicId?: string,
  ): Observable<any> {
    const payload = {
      summary: nombre,
      description: descripcion,
      issueTypeId: issueTypeId,
      areaSeleccionada: areaSeleccionada,
      epicId: epicId
    };

    return this.http.post(`${this.jiraApiUrl}/createRisk`, payload).pipe(
      catchError((error) => {
        console.error('Error al crear Risk en Jira:', error);
        throw error;
      })
    );
  }


iniciativaSinRiesgosPorArea(areaSeleccionada: string, epicId?: string): Observable<any> {
  console.log("llegue al serivce")
  const payload = {
    areaSeleccionada: areaSeleccionada,
    epicId: epicId
  };

  return this.http.post(`${this.jiraApiUrl}/iniciativaSinRiesgosPorArea`, payload).pipe(
    catchError((error) => {
      console.error('Error al verificar iniciativa sin riesgos:', error);
      throw error;
    })
  );
}
}
