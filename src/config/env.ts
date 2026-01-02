import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(1, "JWT_SECRET es requerido"),
  DATABASE_URL:z.string()
});

export const env = envSchema.parse(process.env);
