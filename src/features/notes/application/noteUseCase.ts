// application/note.usecase.ts
import type { NoteRepository } from "../domain/note.repository";
import type { CreateNoteDto ,UpdateNoteDto } from "../domain/note.repository";



export class NoteUseCase {

  

  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(data: CreateNoteDto) {
    return this.noteRepository.create(data);
  }

  async listUserNotes(userId: string) {
    return await this.noteRepository.findByUser(userId);
  }

  async getNote(noteId: string, userId: string) {

    //buscar la nota por id
    const note = await this.noteRepository.findById(noteId);
    if (!note) return null;
    
    //verificar si la nota es del usuario o es parte de los colaboradores
    const isOwner = note.propietario.id === userId;

    const isCollaborator = note.colaboradores.some(
      colab => colab.id === userId
    );

    if (!isOwner && !isCollaborator) {
      throw new Error("Forbidden");
    }


    return note;
  }


  async updateNote(noteId: string, userId: string, data: UpdateNoteDto) {

    const note = await this.noteRepository.findById(noteId);
    if (!note) return null;
    
    const isOwner = note.propietario.id === userId;
    const isCollaborator = note.colaboradores.some(
      colab => colab.id === userId
    );

    if (!isOwner && !isCollaborator) {
      throw new Error("Forbidden");
    }

    await this.noteRepository.update(noteId,data);

    return null;
  }

  async deleteNote(noteId: string, userId: string): Promise<boolean | null> {
    const note = await this.noteRepository.findById(noteId);

    console.log(note)

    if (!note) return null;
    if (note.propietario.id !== userId) return false;

    await this.noteRepository.delete(noteId); 
    return true;
  }


  async shareNote(noteId: string, ownerId: string, invitedUserId: string) {
    const note = await this.noteRepository.findById(noteId);
    if (!note) throw new Error("Nota no encontrada");

    // Solo el propietario puede invitar
    if (note.propietario.id !== ownerId) {
      throw new Error("No autorizado");
    }

    // Evitar duplicados
    const alreadyCollaborator = note.colaboradores.some(
      c => c.id === invitedUserId
    );
    if (alreadyCollaborator) {
      throw new Error("El usuario ya es colaborador");
    }

    await this.noteRepository.addCollaborator(noteId,invitedUserId)
  }

}
