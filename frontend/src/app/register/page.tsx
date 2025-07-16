
import { RegisterForm } from '../../components/RegisterForm'
import { Card } from '../../components/ui/card'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Cadastro de Doador
        </h1>
        
        <RegisterForm />
        
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Faça login
          </Link>
        </p>
      </Card>
    </main>
  )
}