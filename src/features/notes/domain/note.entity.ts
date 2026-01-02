export interface NoteEntity {
  id: string;
  titulo: string;
  contenido: string;
  propietario: string;
  colaboradores: string[] | null;
  createdAt: Date;
  updatedAt: Date | null;
}


export interface UserVisible {
  id: string;
  nombre: string;
  email: string;
}