import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  cargarExcelDesdeURL(url: string): Promise<any[]> {
    return fetch(url)
      .then((response) => response.text())
      .then((csvText) => {
        const datos = XLSX.utils.sheet_to_json(XLSX.read(csvText, {type: 'string'}).Sheets['Sheet1'], { header: 1 });
        return datos;
      })
      .catch((error) => {
        console.error('Error al cargar el Excel:', error);
        throw error;
      });
  }


}
