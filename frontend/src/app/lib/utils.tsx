export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";
export const API_URL = "http://localhost:8000"
import { z } from "zod"

export const authFormSchema = (formType: string) => z.object({
    email: z.string()
        .email("Invalid email address") // Walidacja adresu email
        .min(5, "Email is too short") // Minimalna długość emaila
        .max(100, "Email is too long"), // Maksymalna długość emaila

    password: z.string()
        .min(8, "Password must be at least 8 characters long") // Minimalna długość hasła
        .max(128, "Password is too long") // Maksymalna długość hasła
        .regex(/[a-z]/, "Password must contain at least one lowercase letter") // Mała litera
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Duża litera
        .regex(/[0-9]/, "Password must contain at least one number") // Cyfra
        .regex(/[\W_]/, "Password must contain at least one special character"), // Znak specjalny

    username: formType === 'login' ? 
        z.string().optional() : // Username jest opcjonalny w przypadku logowania
        z.string()
            .min(4, "Username must be at least 4 characters long") // Minimalna długość username
            .max(32, "Username must be at most 32 characters long") // Maksymalna długość username
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores") // Tylko litery, cyfry, podkreślniki
            .trim(), // Usuwa białe znaki z początku i końca
});