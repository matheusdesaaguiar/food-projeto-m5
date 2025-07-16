import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@src/lib/crypto'
// Interface para o tipo da sessão
interface SessionData {
  userId: string;
  expires: Date | string;
  // Adicione outros campos que sua sessão possa ter
}
export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value
  const errorResponse = (message: string) => {
    const response = NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(message)}`, request.url))
    response.cookies.delete('session_token')
    return response
  }

  // Rotas protegidas
  const protectedPaths = ['/dashboard', '/profile']
  const isProtected = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtected) {
    if (!sessionToken) {
      return errorResponse('Sessão não encontrada')
    }

    try {
      const session = await decrypt<SessionData>(sessionToken)
      
      if (new Date(session.expires) < new Date()) {
        return errorResponse('Sessão expirada')
      }

      // Você pode adicionar a sessão ao request se necessário
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-session-data', JSON.stringify(session))
      
      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })

    } catch (error) {
      console.error('Erro na verificação da sessão:', error)
      return errorResponse('Sessão inválida')
    }
  }

  return NextResponse.next()
}