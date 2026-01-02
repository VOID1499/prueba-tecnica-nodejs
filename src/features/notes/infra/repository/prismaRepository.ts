// infra/note/repository/prisma-note.repository.ts
import type { CreateNoteDto, UpdateNoteDto, NoteRepository } from "../../domain/note.repository.js";
import type { NoteEntity } from "../../domain/note.entity.js";
import type { Note,NoteCollaborator ,PrismaClient } from "../../../../../prisma/generated/client.js";

import { NoteValue } from "../../domain/note.value.js";
import { NoteResponse } from "../../../../shared/interfaces/note.interface.js";
import { error } from "node:console";


export class PrismaNoteRepository implements NoteRepository {
  
    constructor(private prisma: PrismaClient) {}


  async create(data: CreateNoteDto): Promise<NoteEntity> {
    const note = await this.prisma.note.create({
      data: {
        titulo: data.titulo,
        contenido: data.contenido,
        propietarioId: data.propietario,
        collaborators: {
          create: data.colaboradores?.map(userId => ({
            user: { connect: { id: userId } }
          }))
        }
      },
      include: { collaborators: true },
    });

    console.log(note)
    return new NoteValue(note.id,note.titulo,note.contenido,note.propietarioId)
  }

  
  async findByUser(userId: string): Promise<Note[]> {
  const notes = await this.prisma.note.findMany({
    where: {
      OR: [
        { propietarioId: userId },
        { collaborators: { some: { userId } } },
      ],
    },
    /*
    include: {
      collaborators: {
        include: { user: false } //users colaboradores
      }
    },
    */
  });

  /*
   
  const notesMap: any[] = notes.map(noteDb => ({
    id: noteDb.id,
    titulo: noteDb.titulo,
    contenido: noteDb.contenido,
    propietario: noteDb.propietarioId,
    colaboradores: noteDb.collaborators.map(c => ({
      id: c.user.id,
      name: c.user.name,
      email: c.user.email,
    })), 
    createdAt: noteDb.createdAt,
    updatedAt: noteDb.updatedAt,
  }));
  */
  
  return notes;
}


  async findById(id: string): Promise<NoteResponse | null> {
    //buscar nota
  const note = await this.prisma.note.findUnique({
    where: { id },
    include: {
      collaborators: {
        include: { user: true } //users colaboradores
      }
    },
  });
  
  if (!note) return null;

  //buscar propietario
  const propietario = await this.prisma.user.findUnique({
    where: { id: note.propietarioId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!propietario) return null;


  //objeto final
  const data = {
    id: note.id,
    titulo: note.titulo,
    contenido: note.contenido,
    propietario: {
      id: propietario.id,
      nombre: propietario.name,
      email: propietario.email,
    },
    colaboradores: note.collaborators.map(colab => ({
      id: colab.user.id,
      nombre: colab.user.name,
      email:colab.user.email
    })),
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };

  return data;
}


  async update(id: string, data: UpdateNoteDto): Promise<NoteResponse> {
    const note = await this.prisma.note.update({
      where: { id },
      data: {
        titulo: data.titulo,
        contenido: data.contenido,
        updatedAt: new Date(),
      },
      include: {
        collaborators: {
          include: { user: true },
        },
        propietario: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      id: note.id,
      titulo: note.titulo,
      contenido: note.contenido,
      propietario: {
        id:note.propietario.id,
        nombre:note.propietario.id,
        email:note.propietario.email,
      },
      colaboradores: note.collaborators.map(c => ({
        id: c.user.id,
        nombre: c.user.name,
        email: c.user.email,
      })),
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }



  async delete(id: string):Promise<void> {
    try {
      await this.prisma.note.delete({ where: { id } });
    } catch {
      console.log(error)
      throw Error("Error al eliminar nota")
    }
  }

  //añade la relacion en la tabla de colaboraciones de notas
  async addCollaborator(noteId: string, userId: string): Promise<void> {

    console.log(noteId,userId)
    await this.prisma.noteCollaborator.create({
      data: {
        noteId,
        userId,
      },
    });
  }
}
