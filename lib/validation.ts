import { z } from "zod";

export const userFormValidation = z.object({
  name: z
    .string()
    .min(2, "O nome de usuario deve conter pelo menos 2 caracteres")
    .max(80, "O nome de usuario deve conter mais de 80 caracteres"),
  email: z.string().email("Email Invalido"),
  phone: z
    .string()
    .refine((phone) => /^\+\d[1-9]\d{1,14}$/.test(phone), "Numero Invalido"),
});
