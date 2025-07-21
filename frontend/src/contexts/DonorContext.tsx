"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type DonorResponse = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  cnpj?: string
}

type DonorContextType = {
  donor: DonorResponse | null
  login: (donor: DonorResponse, token: string) => void
  logout: () => void
}

const DonorContext = createContext<DonorContextType | undefined>(undefined)

export const DonorProvider = ({ children }: { children: React.ReactNode }) => {
  const [donor, setDonor] = useState<DonorResponse | null>(null)

  useEffect(() => {
    // Carrega o doador do localStorage, se existir
    const storedDonor = localStorage.getItem("donor")
    if (storedDonor) {
      setDonor(JSON.parse(storedDonor))
    }
  }, [])

  const login = (donorData: DonorResponse, token: string) => {
    setDonor(donorData)
    localStorage.setItem("donor", JSON.stringify(donorData))
    localStorage.setItem("token", token)
  }

  const logout = () => {
    setDonor(null)
    localStorage.removeItem("donor")
    localStorage.removeItem("token")
  }

  return (
    <DonorContext.Provider value={{ donor, login, logout }}>
      {children}
    </DonorContext.Provider>
  )
}

export const useDonor = (): DonorContextType => {
  const context = useContext(DonorContext)
  if (!context) {
    throw new Error("useDonor deve ser usado dentro de DonorProvider")
  }
  return context
}
