"use client";

import LogoIcon from './icons/LogoIcon';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo e Nome do Projeto */}
        <Link href="/" className="flex items-center gap-3">
          <LogoIcon />
          <span className="text-xl font-bold text-text-dark">
            Food <span className="text-primary">Rescue</span>
          </span>
        </Link>

        {/* Botões de Ação */}
        <div className="flex items-center gap-4">
          <Link href="/alimentos" className="hidden sm:block font-semibold text-text-dark transition-colors hover:text-green-600">
            Alimentos
          </Link>
          <Link href="/login" className="hidden sm:block font-semibold text-text-dark transition-colors hover:text-green-600">
            Login
          </Link>

          <Link href="/register" className="rounded-lg bg-primary px-5 py-2.5 font-bold text-dark shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-105">
            Registro
          </Link>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
};

export default Header;