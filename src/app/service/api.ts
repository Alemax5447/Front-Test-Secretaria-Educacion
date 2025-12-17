import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrlDelete = 'http://localhost:8000/api/empleados/delete';
  private apiUrlGet = 'http://localhost:8000/api/empleados';
  private apiUrlCreate = 'http://localhost:8000/api/empleados/create';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlGet);
  }

  subirImagenINE(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.post(this.apiUrlCreate, formData);
  }
    // ...existing code...
  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlDelete}/${id}`);
  }
}
