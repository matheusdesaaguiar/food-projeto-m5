'use client' 
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@radix-ui/react-label'
import { Input } from '@src/components/ui/input'
import { Button } from '@src/components/ui/button'

// 1. Schema de validação com Zod
const formSchema = z.object({
  email: z.string().email('E-mail inválido').min(1, 'Campo obrigatório'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})



export default function LoginPage(){

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        email: ''; 
        password:'',
    },
})


//3. Submissão com Axios
const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
        const { data } = await axios.post('/api/auth/login',values)
        toast.success('login realizado!',{
            description: 'Redirecionando para o dashbord...',
        })
        //Redirecionar ou atualizar estado aqui 
    }catch(error) {
        //4. Tratamento de erros com Sonner
        if(axios.isAxiosError(error)){
            toast.error('Erro no login',{
               description: error.response?.data?.message || 'Credenciais inválidas',  
            })
        } else {
            toast.error('Erro desconhecido')

        }
    }
}

    return (
  <div className="mx-auto w-full max-w-md p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">Acesse sua conta</p>
      </div>

      {/* 5. Formulário com shadcn/ui */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>E-mail</Label>
                <FormControl>
                  <Input
                    placeholder="seu@email.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>Senha</Label>
                <FormControl>
                  <Input
                    placeholder="••••••"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Form>
    </div>

    )
}