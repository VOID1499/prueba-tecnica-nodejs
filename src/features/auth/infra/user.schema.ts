import z from "zod";


export const userRegisterSchema = z.object({
    name:z.string().min(1,"Minimo 1 caracter").max(255,"Max 255 caracteres"),
    email: z.string().email('Correo inválido'),
    password:z.string().min(1,"Minimo 1 caracter")
}).strict();;




export const userLoginSchema = z.object({
    email: z.string().email('Correo inválido'),
    password:z.string().min(1,"Minimo 1 caracter")
}).strict();;

