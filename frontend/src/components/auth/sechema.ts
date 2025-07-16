import { z } from 'zod'


const PASSWORD_MIN_LENGTH = 12
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/


export const LoginSchema = z.object({
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .max(100, 'E-mail muito longo'),
  password: z.string()
    .min(PASSWORD_MIN_LENGTH, `Senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`)
    .regex(PASSWORD_REGEX, {
      message: 'Senha deve conter maiúsculas, minúsculas, números e caracteres especiais'
    }),
  token: z.string().optional() // Para CSRF
})

export type LoginFormData = z.infer<typeof LoginSchema>