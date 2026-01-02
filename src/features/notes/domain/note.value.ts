import { randomUUID } from "node:crypto";
import type { NoteEntity } from "./note.entity.js";

export class NoteValue implements NoteEntity {
  constructor(
    public id: string = randomUUID(),
    public titulo: string,
    public contenido: string,
    public propietario: string,
    public colaboradores: string[] | null = null,
    public createdAt: Date = new Date(),
    public updatedAt: Date | null = null
  ) {}
}