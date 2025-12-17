
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Empleado {
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

  ngOnInit() {
    this.loadEmpleados();
  }

  async loadEmpleados() {
    this.loading = true;
    this.error = '';
    try {
      // Simulación de datos
      const data: Empleado[] = [
        {
          id_empleado: 1,
          nombre: 'Juan',
          apellidos: 'Pérez',
          curp: 'CURP123456789012',
          estado: 'CDMX',
          municipio: 'Benito Juárez',
          localidad: 'Del Valle',
          created_at: '2025-12-01T10:00:00Z',
        },
        {
          id_empleado: 2,
          nombre: 'Ana',
          apellidos: 'López',
          curp: 'CURP987654321098',
          estado: 'EdoMex',
          municipio: 'Naucalpan',
          localidad: 'Centro',
          created_at: '2025-12-10T12:30:00Z',
        },
        {
          id_empleado: 3,
          nombre: 'Luis',
          apellidos: 'Martínez',
          curp: 'CURP456789123456',
          estado: 'CDMX',
          municipio: 'Coyoacán',
          localidad: 'Copilco',
          created_at: '2025-12-15T09:15:00Z',
        },
      ];
      // Simula retardo
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.empleados = data;
    } catch (err: any) {
      this.error = err?.message || 'Error al cargar empleados';
    } finally {
      this.loading = false;
    }
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
