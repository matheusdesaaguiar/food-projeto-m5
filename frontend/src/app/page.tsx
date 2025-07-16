// import { Link } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Bem-vindo ao Food Projeto M5</h1>
      <Link href="/register" className="mt-4 text-blue-500 hover:underline">Cadastrar-se</Link>
      <p className="mt-4 text-lg">Explore nossas funcionalidades!</p>
    </main>
  );
}
