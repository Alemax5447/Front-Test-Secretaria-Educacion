import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { EmpleadoFormComponent } from './empleados/empleado-form/empleado-form';
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    EmpleadoFormComponent,
    EmpleadosListComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  activeTab: 'register' | 'list' = 'register';
  refreshKey = 0;

  handleSuccess() {
    this.refreshKey++;
    this.activeTab = 'list';
  }
}
