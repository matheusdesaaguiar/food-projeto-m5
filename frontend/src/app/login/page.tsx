"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Eye, EyeOff, Leaf, Mail, Lock, Building2 } from "lucide-react"

import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Label } from "@src/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { Alert, AlertDescription } from "@src/components/ui/alert"
import { loginSchema, type LoginFormData, type DonorResponse } from "@src/app/schemas/login"
import { useRouter } from "next/navigation"


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [loggedDonor, setLoggedDonor] = useState<DonorResponse | null>(null)
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })


  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await axios.post("", data)

      if (response.data.success) {
        const donor = response.data.donor
        const token = response.data.token || donor?.id
        setMessage({ type: "success", text: response.data.message })
        setLoggedDonor(donor)
        localStorage.setItem("token", token)
        localStorage.setItem("donor", JSON.stringify(donor))
        router.push('/alimentos')
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage({
          type: "error",
          text: error.response.data.message || "Erro ao fazer login",
        })
      } else {
        setMessage({ type: "error", text: "Erro de conexão" })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 mt-[1.7rem]">
      <div className="w-full max-w-md">
        <Card className="border-accent/20 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-text-dark">Portal do Doador</CardTitle>
              <CardDescription className="text-text-dark/70">
                Entre com suas credenciais para acessar o sistema
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {message && (
              <Alert className={message.type === "error" ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50"}>
                <AlertDescription className={message.type === "error" ? "text-red-700" : "text-green-700"}>
                  {message.text}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-text-dark font-medium">
                  Email Corporativo
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-text-dark/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contato@empresa.com"
                    className="pl-10 border-accent/30 focus:border-primary focus:ring-primary text-text-dark"
                    {...register("email")}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-text-dark font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-text-dark/50" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="pl-10 pr-10 border-accent/30 focus:border-primary focus:ring-primary text-text-dark"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-text-dark/50 hover:text-text-dark"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
              </div>

              <Button
              type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 border-[2] border-primary transition-all duration-300"
                
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-text-dark/70">
                Não tem uma conta?{" "}
                <button className="text-primary hover:text-primary/80 font-medium">Cadastre sua empresa</button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
