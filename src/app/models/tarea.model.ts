export interface Habilidad {
    nombre: string;
}

export interface Persona {
    nombre: string;
    edad: number;
    habilidades: string[];
}

export interface Tarea {
    id: number;
    titulo: string;
    tareaCompletada: boolean;
    personasAsignadas: Persona[];
    fechaLimite: string;
}