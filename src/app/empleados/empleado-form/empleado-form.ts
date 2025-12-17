
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado-form.html',
  styleUrl: './empleado-form.css',
})
export class EmpleadoFormComponent {
  @Output() success = new EventEmitter<void>();

  form: FormGroup;
  loading = false;
  extracting = false;
  error = '';
  successMsg = '';



  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      curp: ['', [Validators.required, Validators.maxLength(18)]],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
    });
  }

  async handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.extracting = true;
    this.error = '';
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          // Simulación de extracción de datos INE
          const extractedData = await this.extractINEData(base64String);
          this.form.patchValue(extractedData);
          this.successMsg = 'Datos extraídos correctamente de la credencial INE';
          setTimeout(() => (this.successMsg = ''), 3000);
        } catch (err: any) {
          this.error = err?.message || 'Error al extraer datos';
        } finally {
          this.extracting = false;
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      this.error = 'Error al leer la imagen';
      this.extracting = false;
    }
  }

  async handleSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    try {
      // Simulación de registro de empleado
      // Reemplaza esto por tu servicio real
      await this.createEmpleado(this.form.value);
      this.successMsg = 'Empleado registrado exitosamente';
      this.form.reset();
      setTimeout(() => {
        this.successMsg = '';
        this.success.emit();
      }, 2000);
    } catch (err: any) {
      this.error = err?.message || 'Error al registrar empleado';
    } finally {
      this.loading = false;
    }
  }

  // Simulación de API
  async extractINEData(_base64: string): Promise<any> {
    // Simula un retardo y datos extraídos
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            nombre: 'Juan',
            apellidos: 'Pérez',
            curp: 'CURP123456789012',
            estado: 'CDMX',
            municipio: 'Benito Juárez',
            localidad: 'Del Valle',
          }),
        1500
      )
    );
  }

  async createEmpleado(_data: any): Promise<void> {
    // Simula un retardo
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
