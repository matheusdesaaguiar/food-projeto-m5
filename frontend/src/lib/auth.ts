import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        // Exemplo: autenticação mock
        if (
          credentials?.email === "user@email.com" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1",
            name: "Usuário Teste",
            email: "user@email.com"
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  }
};