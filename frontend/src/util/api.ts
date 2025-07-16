import axios from "axios";
import { getCookie } from 'cookies-next'


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    withCredentials: true
})

//interceptores de segurança 
api.interceptors.request.use((config)=>{
    const csrfToken = getCookie('XSRF-TOKEN')
    if(csrfToken){
        config.headers['X-XSRF-TOKEN'] = csrfToken
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            // Redirecionar para login se não autorizado 
            window.location.href ='/login?sessionExpired=true'
        }

   const message = error.response?.data?.message || 
      'Erro na comunicação com o servidor'
      // Log seguro (não expõe detalhes )

      console.error('API Errpr:',{
        status: error.response?.status,
        message,
        path: error.config?.url
      })

       return Promise.reject(new Error(message))
    }
)


export default api
