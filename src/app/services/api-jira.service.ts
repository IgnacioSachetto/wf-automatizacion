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


  crearEpicIAEnJira(formulario: any): Observable<any> {
    const payload = {
      formulario
    };

    return this.http.post(`${this.jiraApiUrl}/createEpicIA`, payload).pipe(
      catchError((error) => {
        console.error('Error al crear Epic en Jira:', error);
        throw error;
      })
    );
  }

  crearEpicPreCicloEnJira(formulario: any): Observable<any> {
    const payload = {
      formulario
    };
    console.log("llege")
    return this.http.post(`${this.jiraApiUrl}/createJiraEpicPreCicloIA`, payload).pipe(
      catchError((error) => {
        console.error('Error al crear Epic en Jira:', error);
        throw error;
      })
    );
  }

  crearRiskEnJiraIA(
    nombre: string,
    descripcion: string,
    issueTypeId: string,
    areaSeleccionada: string,
    responsableRiesgo: string,
    epicId?: string,
  ): Observable<any> {
    const payload = {
      summary: nombre,
      description: descripcion,
      issueTypeId: issueTypeId,
      areaSeleccionada: areaSeleccionada,
      responsableRiesgo: responsableRiesgo,
      epicId: epicId
    };

    if (!nombre || !descripcion || !issueTypeId || !areaSeleccionada || !responsableRiesgo) {
      console.error('Faltan campos obligatorios');
      throw new Error('Todos los campos son obligatorios');
    }

    console.log("este " + JSON.stringify(payload));

    return this.http.post(`${this.jiraApiUrl}/createRiskIA`, payload).pipe(
      catchError((error) => {
        console.error('Error al crear Risk en Jira:', error);
        throw error;
      })
    );}


  crearRiskEnJira(
    nombre: string,
    descripcion: string,
    issueTypeId: string,
    areaSeleccionada: string,
    responsableRiesgo: string,
    epicId?: string,
  ): Observable<any> {
    const payload = {
      summary: nombre,
      description: descripcion,
      issueTypeId: issueTypeId,
      areaSeleccionada: areaSeleccionada,
      responsableRiesgo: responsableRiesgo,
      epicId: epicId
    };

    if (!nombre || !descripcion || !issueTypeId || !areaSeleccionada || !responsableRiesgo) {
      console.error('Faltan campos obligatorios');
      throw new Error('Todos los campos son obligatorios');
    }

    console.log("este " + JSON.stringify(payload));

    return this.http.post(`${this.jiraApiUrl}/createRisk`, payload).pipe(
      catchError((error) => {
        console.error('Error al crear Risk en Jira:', error);
        throw error;
      })
    );

  }



  iniciativaSinRiesgosPorArea(areaSeleccionada: string, responsableRiesgo : string, epicId?: string): Observable<any> {

    console.log(responsableRiesgo);
    const payload = {
      areaSeleccionada: areaSeleccionada,
      responsableRiesgo: responsableRiesgo,
      epicId: epicId
    };

    return this.http.post(`${this.jiraApiUrl}/iniciativaSinRiesgosPorArea`, payload).pipe(
      catchError((error) => {
        console.error('Error al verificar iniciativa sin riesgos:', error);
        throw error;
      })
    );
  }

  crearTareaEnJira(
    areaSecundaria: string,
    epicId?: string
  ): Observable<any> {
    const payload = {
      areaSecundaria,
      epicId
    };

    return this.http.post(`${this.jiraApiUrl}/createTask`, payload).pipe(
      catchError((error) => {
        console.error('Error al crear tarea en Jira:', error);
        throw error;
      })
    );
  }

  crearTareaIAEnJira(
    areaSecundaria: string,
    epicId?: string
  ): Observable<any> {
    const payload = {
      areaSecundaria,
      epicId
    };

    return this.http.post(`${this.jiraApiUrl}/createTask`, payload).pipe(
      catchError((error) => {
        console.error('Error al crear tarea en Jira:', error);
        throw error;
      })
    );
  }
}
