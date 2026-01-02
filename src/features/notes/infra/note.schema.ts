import z from "zod";


export const createNoteSchema = z.object({
    titulo:z.string().min(1,"Minimo 1 caracter").max(255,"Max 255 caracteres"),
    contenido:z.string().min(1,"Minimo 1 caracter").max(255,"Max 255 caracteres"),
    colaboradores: z.array(z.string().uuid("El id del colaborador debe ser un UUID válido")).optional(),
}).strict();

export const invitedUserId = z.object({
    user_id:z.string().uuid("El id del invitado debe ser válido")
})