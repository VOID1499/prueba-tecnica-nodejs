import { UserVisible } from "./user.interfaces";


export interface NoteResponse {
  id: string;
  titulo: string;
  contenido: string;
  propietario: UserVisible;
  colaboradores: UserVisible[];
  createdAt: Date;
  updatedAt: Date;
}