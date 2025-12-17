import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../service/api';

export interface Empleado {
  id_empleado: number;
  nombre: string;
  apellidos: string;
  curp: string;
  estado: string;
  municipio: string;
  localidad: string;
  created_at: string;
}

@Component({
  selector: 'app-empleados-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados-list.html',
  styleUrl: './empleados-list.css',
})
export class EmpleadosListComponent {
  empleados: Empleado[] = [];
  loading = true;
  error = '';
  searchTerm = '';
  estadoFilter = '';
  municipioFilter = '';

  constructor(private api: Api) {}

  ngOnInit() {
    this.loadEmpleados();
  }

  loadEmpleados() {
    this.loading = true;
    this.error = '';
    this.api.getEmpleados().subscribe({
      next: (response: any) => {
        // Si la respuesta tiene 'data', úsala; si no, usa el array directo
        this.empleados = Array.isArray(response) ? response : response?.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error =
          err?.error?.error ||
          err?.error?.message ||
          (typeof err?.error === 'string' ? err.error : '') ||
          err?.message ||
          'Error al cargar empleados';
        this.loading = false;
      },
    });
  }

  eliminarEmpleado(id: number) {
      if (!confirm('¿Seguro que deseas eliminar este empleado?')) return;
      this.loading = true;
      this.api.deleteEmpleado(id).subscribe({
        next: () => {
          this.loadEmpleados();
        },
        error: (err) => {
          this.error =
            err?.error?.error ||
            err?.error?.message ||
            (typeof err?.error === 'string' ? err.error : '') ||
            err?.message ||
            'Error al eliminar empleado';
          this.loading = false;
        },
      });
    }

  get filteredEmpleados() {
    return this.empleados
      .filter((emp) =>
        (emp.nombre + ' ' + emp.apellidos + ' ' + emp.curp)
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      )
      .filter((emp) =>
        this.estadoFilter ? emp.estado === this.estadoFilter : true
      )
      .filter((emp) =>
        this.municipioFilter ? emp.municipio === this.municipioFilter : true
      );
  }

  get estados() {
    return Array.from(new Set(this.empleados.map((e) => e.estado)));
  }

  get municipios() {
    return Array.from(new Set(this.empleados.map((e) => e.municipio)));
  }
}
