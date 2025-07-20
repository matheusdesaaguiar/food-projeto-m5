import { type NextRequest, NextResponse } from "next/server"
import { loginSchema, type Donor, type DonorResponse } from "@src/lib/validations/auth"  
import { z } from "zod"
import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
})

function verifyPassword(plainPassword: string, hashedPassword: string): boolean {
  return plainPassword === hashedPassword
}

function sanitizeDonor(donor: Donor): DonorResponse {
  const { password, ...donorWithoutPassword } = donor
  return donorWithoutPassword
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)
    const response = await api.post("/donors/login", validatedData)
    const donor: Donor | null = response.data.donor

    if (!donor) {
      return NextResponse.json(
        {
          success: false,
          message: "Email não encontrado",
        },
        { status: 401 },
      )
    }
    const isPasswordValid = verifyPassword(validatedData.password, donor.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Senha incorreta",
        },
        { status: 401 },
      )
    }
    return NextResponse.json({
      success: true,
      message: "Login realizado com sucesso!",
      donor: sanitizeDonor(donor),
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos",
          errors: error.issues,
        },
        { status: 400 },
      )
    }

    console.error("Erro no login:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 },
    )
  }
}
