import { NextResponse } from "next/server"
import { LoginSchema } from "@src/components/auth/sechema"
import { getCookie, setCookie } from "cookies-next"
import { ZodError } from "zod"
import { encrypt } from "@src/lib/crypto"
import rateLimit from "@src/lib/rate-limit"


export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    
    // Verificação de rate limit
    const limitReached = await rateLimit(ip)
    if (limitReached) {
      return NextResponse.json(
        { message: 'Muitas requisições' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validatedData = LoginSchema.parse(body)

    // Verificação de CSRF Token
    if (!validatedData.token || validatedData.token !== getCookie('XSRF-TOKEN')) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 403 }
      )
    }

    // Autenticação do usuário
    const user = await authenticateUser(validatedData)
    
    if (!user) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Geração de token seguro
    const sessionToken = encrypt({
      userId: user.id,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 horas
    })

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })

    // Configurações seguras do cookie
    setCookie('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 horas
    })

    return response

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Dados inválidos', errors: error.issues },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { message: 'Erro na autenticação' },
      { status: 500 }
    )
  }
}

async function authenticateUser(data: { email: string, password: string }) {
  return mockUsers.find(u => u.email === data.email)
}

const mockUsers = [
  {
    id: 'user_secure_id_123',
    email: 'usuario@exemplo.com',
    name: 'Usuário Seguro',
    passwordHash: '$2b$10$N9qo8uLOickgx2ZMRZoMy...'
  }
]