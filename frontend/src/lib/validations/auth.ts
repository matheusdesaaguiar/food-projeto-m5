import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email deve ter um formato válido"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Tipo para o modelo Donor
export interface Donor {
  id: number
  name: string
  email: string
  password: string
  phone: string
  address: string
  cnpj: string
  createdAt?: Date
  updatedAt?: Date
}

// Tipo para resposta de login (sem senha)
export interface DonorResponse {
  id: number
  name: string
  email: string
  phone: string
  address: string
  cnpj: string
  createdAt?: Date
  updatedAt?: Date
}
