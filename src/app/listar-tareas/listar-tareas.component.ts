import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { TareasService } from '../servicios/tareas.service';
import { CrearTareasComponent } from '../crear-tareas/crear-tareas.component';

@Component({
  selector: 'app-listar-tareas',
  standalone: true,
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule
  ],
  templateUrl: './listar-tareas.component.html',
  styleUrls: ['./listar-tareas.component.scss']
})
export class ListarTareasComponent {
  tareas = this.tareasService.obtenerTareas();
  mostrarModal: boolean = false;

  constructor (
    private tareasService: TareasService,
    private dialog: MatDialog
  ) {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareas = this.tareasService.obtenerTareas();
  }

  cambiarEstadoTareaCompletada(tareaId: number) {
    this.tareasService.cambiarEstadoTareaCompletada(tareaId);
    this.tareas = this.tareasService.obtenerTareas();
  }

  filtrarTareasPorEstadoTarea(completada: boolean) {
    this.tareas = this.tareasService.filtrarTareas(completada);
  }

  mostrarTodasLasTareas() {
    this.cargarTareas();
  }
  
  abrirPopup() {
    const dialogRef = this.dialog.open(CrearTareasComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarTareas();
    });
  }
}