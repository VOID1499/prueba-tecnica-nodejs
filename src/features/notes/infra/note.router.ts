import { Router } from "express";
import { NoteUseCase } from "../application/noteUseCase.js";
import { NoteController } from "./note.controller.js";
import { authenticated } from "../../../shared/middlewares/authMiddleware.js";
import { PrismaNoteRepository } from "./repository/prismaRepository.js";
import PrismaClient from "../../../db/prismaClient.js"
import { validateSchema } from "../../../shared/middlewares/validateSchema.js";
import { createNoteSchema ,invitedUserId } from "./note.schema.js";

export const router = Router();

const prismaRepository = new PrismaNoteRepository(PrismaClient);
const authUseCase = new NoteUseCase(prismaRepository);

const noteController = new NoteController(authUseCase);

router.post("/", authenticated,validateSchema(createNoteSchema) , noteController.createNote);     // Crear nota
router.get("/", authenticated, noteController.listNotes);       // Listar notas del usuario
router.get("/:id", authenticated,  noteController.findNote); // Obtener nota por id
router.put("/:id", authenticated, validateSchema(createNoteSchema) ,noteController.updateNote);   // Actualizar nota
router.delete("/:id", authenticated, noteController.deleteNote); // Eliminar nota
router.post("/:id/share",authenticated, validateSchema(invitedUserId),  noteController.sharedNote); // Añdir un colaborador de nota


