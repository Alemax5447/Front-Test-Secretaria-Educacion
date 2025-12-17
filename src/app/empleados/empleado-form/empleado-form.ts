
import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../service/api';

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



  constructor(private fb: FormBuilder, private api: Api, private cdr: ChangeDetectorRef) {
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
      const img = new Image();
      const reader = new FileReader();

      reader.onload = async (e) => {
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob(async (blob) => {
            if (blob) {
              const pngFile = new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.png', { type: 'image/png' });
              this.api.subirImagenINE(pngFile).subscribe({
                next: (response) => {
                  if (response && typeof response === 'object') {
                    this.form.patchValue(response);
                    this.successMsg = 'Datos extraídos correctamente de la credencial INE';
                    setTimeout(() => (this.successMsg = ''), 3000);
                  }
                },
                error: (err) => {
                  // Manejo robusto de errores según la estructura del backend
                  let msg = '';
                  const errorObj = err?.error;
                  if (errorObj) {
                    if (typeof errorObj === 'string') {
                      msg = errorObj;
                    } else if (typeof errorObj === 'object') {
                      if (errorObj.error) {
                        msg = errorObj.error;
                      } else if (errorObj.mensaje) {
                        msg = errorObj.mensaje;
                      }
                      if (errorObj.faltantes && Array.isArray(errorObj.faltantes) && errorObj.faltantes.length > 0) {
                        msg += (msg ? ' ' : '') + 'Faltan campos: ' + errorObj.faltantes.join(', ');
                      }
                      if (errorObj.detalle_bd) {
                        msg += (msg ? ' | ' : '') + 'Detalle BD: ' + errorObj.detalle_bd;
                      }
                      if (errorObj.detalle) {
                        msg += (msg ? ' | ' : '') + 'Detalle: ' + (typeof errorObj.detalle === 'string' ? errorObj.detalle : JSON.stringify(errorObj.detalle));
                      }
                      // Si no hay mensaje, mostrar el objeto como string
                      if (!msg) {
                        msg = JSON.stringify(errorObj);
                      }
                    }
                  }
                  if (!msg) {
                    msg = err?.message || 'Error al extraer datos';
                  }
                  this.error = msg;
                  this.cdr.detectChanges();
                },
                complete: () => {
                  this.extracting = false;
                },
              });
            } else {
              this.error = 'No se pudo convertir la imagen a PNG';
              this.extracting = false;
            }
          }, 'image/png');
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      this.error = 'Error al procesar la imagen';
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
