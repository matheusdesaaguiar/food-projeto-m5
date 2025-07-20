import axios from "axios";
import { email, z } from "zod";
import { loginSchema } from "../schemas/login";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

export async function loginDoador(data: z.infer<typeof loginSchema>) {
  try {
    const response = await api.post("/donors/login", {
      email: data.email,
      password: data.password,
    });

    if (!response.data.ok) {
      throw new Error("Login falhou"); 
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || ( error.response?.status === 401 ? "Credenciais inválidas" :  "Erro no servidor");
        throw new Error(message);
    }
    throw new Error("Erro desconhecido ao fazer login");
  }
}

export function storeToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}