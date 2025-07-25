import axios from 'axios'
import { z } from 'zod'
import { registerSchema } from '../schemas/register'

const api = axios.create({
  baseURL: "https://food-rescue-kfb4.onrender.com",
})

export async function registerDoador(data: z.infer<typeof registerSchema>) {
  try {
    const response = await api.post('/donors/register', {
      ...data,
      // Transformações específicas se necessário
      phone: data.phone.replace(/\D/g, ''),
      cnpj: data.cnpj.replace(/\D/g, ''),
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro no cadastro')
    }
    throw new Error('Erro desconhecido')
  }
}