import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(4, 'Nome deve ter pelo menos 4 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  phone: z.string()
    .min(11, 'Telefone inválido')
    .regex(/^\d{11}$/, 'Use apenas números com DDD'),
  address: z.string().min(5, 'Endereço muito curto'),
  cnpj: z.string()
    .length(14, 'CNPJ deve ter 14 dígitos')
    .regex(/^\d{14}$/, 'Use apenas números'),
})