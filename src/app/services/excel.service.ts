import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  cargarExcelDesdeURL(url: string): Promise<any[]> {
    return fetch(url)
      .then((response) => response.text()) // Usamos .text() para obtener el archivo como texto
      .then((csvText) => {
        // Convierte el contenido CSV en un formato que podamos procesar
        const datos = XLSX.utils.sheet_to_json(XLSX.read(csvText, {type: 'string'}).Sheets['Sheet1'], { header: 1 });
        console.log('Contenido procesado del Excel:', datos);
        return datos;
      })
      .catch((error) => {
        console.error('Error al cargar el Excel:', error);
        throw error;
      });
  }


}
