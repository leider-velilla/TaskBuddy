import { Injectable } from '@angular/core';
import { Tarea, Persona } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private tareas: Tarea[] = [];
  private currentId = 1;

  obtenerTareas() {
    return this.tareas;
  }

  agregarTarea(titulo: string, fechaLimite: string) {
    const nuevaTarea: Tarea = {
      id: this.currentId++,
      titulo,
      fechaLimite,
      tareaCompletada: false,
      personasAsignadas: [],
    };
    this.tareas.push(nuevaTarea);
    return nuevaTarea.id;
  }

  cambiarEstadoTareaCompletada(id: number) {
    const tarea = this.tareas.find(tarea => tarea.id === id);
    if (tarea) {
      tarea.tareaCompletada = !tarea.tareaCompletada;
    }
  }

  agregarPersonaAsiganda(tareaId: number, persona: Persona) {
    const tarea = this.tareas.find(tarea => tarea.id === tareaId);
    if (tarea) {
      tarea.personasAsignadas.push(persona);
    }
  }

  eliminarPersonaAsignada(tareaId: number, nombrePersona: string) {
    const tarea = this.tareas.find(tarea => tarea.id === tareaId);
    if (tarea) {
      tarea.personasAsignadas = tarea.personasAsignadas.filter(personaAsignada => personaAsignada.nombre !== nombrePersona);
    }
  }

  filtrarTareas(completada: boolean) {
    return this.tareas.filter(tarea => tarea.tareaCompletada === completada);
  }
}