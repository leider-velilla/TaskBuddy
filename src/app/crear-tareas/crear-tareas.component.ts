import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { TareasService } from '../servicios/tareas.service';
import { Persona } from '../models/tarea.model';

@Component({
  selector: 'app-crear-tareas',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './crear-tareas.component.html',
  styleUrls: ['./crear-tareas.component.scss']
})
export class CrearTareasComponent {
  formularioTareas!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private tareaService: TareasService,
  ){
    this.formularioTareas = this.fb.group({
      titulo: ['', [Validators.required]],
      fechaLimite: ['', [Validators.required, this.validarFechaLimite]],
      personasAsignadas: this.fb.array([])
    });
  }

  get personasAsignadas(): FormArray {
    return this.formularioTareas.get('personasAsignadas') as FormArray;
  }

  agregarPersonaAsignada() {
    this.personasAsignadas.push(this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5), this.duplicateNameValidator.bind(this)]],
      edad: ['', [Validators.required, Validators.min(19)]],
      habilidades: this.fb.array([this.fb.control('', Validators.required)])
    }));
  }

  duplicateNameValidator(control: FormControl) {
    const nombre = control.value;
    const nombres = this.personasAsignadas.controls.map(personaAsignada => personaAsignada.get('nombre')?.value);
    const estaDuplicado = nombres.filter(n => n === nombre).length > 1;
    return estaDuplicado ? { nombreDuplicado: true } : null;
  }

  eliminarPersonaAsignada(index: number) {
    this.personasAsignadas.removeAt(index);
  }

  agregarHabilidad(indexPersonaAsignada: number) {
    const habilidades = this.obtenerControlHabilidad(indexPersonaAsignada);
    habilidades.push(this.fb.control('', Validators.required));
  }

  obtenerControlHabilidad(personaIndex: number): FormArray {
    return this.personasAsignadas.at(personaIndex).get('habilidades') as FormArray;
  }

  eliminarHabilidad(indexPersonaAsignada: number, indexHabilidad: number) {
    const habilidades = this.obtenerControlHabilidad(indexPersonaAsignada);
    habilidades.removeAt(indexHabilidad);
  }

  validarFechaLimite(control: FormControl) {
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(control.value);

    if (!control.value) {
      return null;
    }

    fechaActual.setHours(0, 0, 0, 0);
    
    return fechaSeleccionada >= fechaActual ? null : { fechaInvalida: true };
  }

  onSubmit() {
    if (this.formularioTareas.invalid) {
      this.formularioTareas.markAllAsTouched();
      return;
    }

    const { titulo, fechaLimite, personasAsignadas } = this.formularioTareas.value;
    const tareaID = this.tareaService.agregarTarea(titulo, fechaLimite);

    personasAsignadas.forEach((personaAsignada: Persona) => {
      this.tareaService.agregarPersonaAsiganda(tareaID, personaAsignada);
    });

    this.formularioTareas.reset({
      titulo: '',
      fechaLimite: '',
      personasAsignadas: []
    });
    this.formularioTareas.updateValueAndValidity();
    this.marcarFormularioComoIntacto(this.formularioTareas);
  }

  marcarFormularioComoIntacto(formGroup: FormGroup | FormArray) {
    formGroup.markAsUntouched();
    formGroup.markAsPristine();
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.marcarFormularioComoIntacto(control); // Aplica de manera recursiva en todos los subgrupos
      } else {
        control?.markAsUntouched();
        control?.markAsPristine();
      }
    });
  }
}