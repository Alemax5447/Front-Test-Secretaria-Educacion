import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empleados-list',
  standalone: true,
  templateUrl: './empleados-list.html',
  styleUrl: './empleados-list.css'
})
export class EmpleadosListComponent {
  @Input() refreshKey!: number;
}
