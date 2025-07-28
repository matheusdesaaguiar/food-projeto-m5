"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Eye, EyeOff, Leaf, Mail, Lock, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Label } from "@src/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { Alert, AlertDescription } from "@src/components/ui/alert"
import { loginSchema, type LoginFormData } from "@src/app/schemas/login"
import { useRouter } from "next/navigation"
import { useDonor } from "@src/contexts/DonorContext"
import Link from "next/link"
import { loginDoador, storeToken } from "@src/app/api/login"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const donorContext = useDonor()

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
      const response = await loginDoador(data);

      if (response.data.success) {
        const donor = response.data.donor
        const token = response.data.token || donor?.id
        setMessage({ type: "success", text: response.data.message })
        
        await new Promise(resolve => setTimeout(resolve, 800))
        storeToken(token)
        donorContext.login(donor, token)
        router.push("/alimentos");
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

  // Efeito para limpar mensagem após 5 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8"
    >
      <div className="w-full max-w-md">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className="border-accent/20 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-gray-900/80">
            <CardHeader className="space-y-4 text-center">
              <motion.div
                animate={{
                  rotate: isHovered ? [0, 10, -10, 0] : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center"
              >
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <div>
                <CardTitle className="text-2xl font-bold text-text-dark dark:text-white">
                  Portal do Doador
                </CardTitle>
                <CardDescription className="text-text-dark/70 dark:text-gray-300">
                  Entre com suas credenciais para acessar o sistema
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert
                      className={
                        message.type === "error"
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-green-500 bg-green-50 dark:bg-green-900/20"
                      }
                    >
                      <AlertDescription
                        className={
                          message.type === "error"
                            ? "text-red-700 dark:text-red-300"
                            : "text-green-700 dark:text-green-300"
                        }
                      >
                        {message.text}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-text-dark dark:text-gray-300 font-medium">
                    Email Corporativo
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-text-dark/50 dark:text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="contato@empresa.com"
                      className="pl-10 border-accent/30 focus:border-primary focus:ring-primary text-text-dark dark:text-white dark:bg-gray-800 dark:border-gray-700"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-text-dark dark:text-gray-300 font-medium">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-text-dark/50 dark:text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      className="pl-10 pr-10 border-accent/30 focus:border-primary focus:ring-primary text-text-dark dark:text-white dark:bg-gray-800 dark:border-gray-700"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-text-dark/50 hover:text-text-dark dark:hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 border-2 border-primary transition-all duration-300 dark:hover:bg-primary/80"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Entrando...</span>
                      </div>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <p className="text-sm text-text-dark/70 dark:text-gray-400">
                  Não tem uma conta?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:text-primary/80 font-medium dark:hover:text-primary/60"
                  >
                    Cadastre já!
                  </Link>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}