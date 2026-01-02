// infra/note/repository/mock-note.repository.ts
import { randomUUID } from "node:crypto";
import type { CreateNoteDto , UpdateNoteDto ,NoteRepository } from "../../domain/note.repository.js";
import type { NoteEntity } from "../../domain/note.entity.js";
import { NoteValue } from "../../domain/note.value.js";

export class MockNoteRepository implements NoteRepository {
  private notes: NoteEntity[] = [];

  async create(data: CreateNoteDto): Promise<NoteEntity> {
    const note = new NoteValue(
      randomUUID(),
      data.titulo,
      data.contenido,
      data.propietario,
      data.colaboradores,
      new Date(),
      null
    );

    this.notes.push(note);
    return note;
  }

  async findByUser(userId: string): Promise<NoteEntity[]> {
    return this.notes.filter(
      note =>
        note.propietario === userId ||
        note.colaboradores?.includes(userId)
    );
  }

  async findById(id: string): Promise<NoteEntity | null> {
    return this.notes.find(note => note.id === id) ?? null;
  }

  async update(
    id: string,
    data: UpdateNoteDto
  ): Promise<NoteEntity | null> {
    const note = await this.findById(id);
    if (!note) return null;

    Object.assign(note, {
      ...data,
      updateAt: new Date(),
    });

    return note;
  }

  async delete(noteId:string): Promise<boolean> {
    const index = this.notes.findIndex(note => note.id === noteId);
    if (index === -1) return false;

    this.notes.splice(index, 1);
    return true;
  }
}
