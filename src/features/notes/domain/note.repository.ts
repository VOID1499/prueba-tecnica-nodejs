// domain/note.repository.ts
import type { Note } from "../../../../prisma/generated/client.js";
import { NoteResponse } from "../../../shared/interfaces/note.interface.js";
import type { NoteEntity } from "./note.entity.js";


export interface CreateNoteDto {
  titulo: string;
  contenido: string;
  propietario: string;        
  colaboradores: string[] | null;    
}

export interface UpdateNoteDto {
  titulo?: string;
  contenido?: string;
  colaboradores?: string[] | null;
}


export interface NoteRepository {

  create(data: CreateNoteDto): Promise<NoteEntity>;

  findById(noteId: string): Promise<NoteResponse | null>;

  findByUser(userId: string): Promise<any[]>;

  update(noteId: string, data: UpdateNoteDto): Promise<any | null>;

  delete(noteId: string): Promise<void>;

  addCollaborator(noteId: string, userId: string): Promise<void>;

}
