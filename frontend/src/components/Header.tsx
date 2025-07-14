"use client";

import LogoIcon from './LogoIcon';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo e Nome do Projeto */}
        <Link href="/" className="flex items-center gap-3">
          <LogoIcon />
          <span className="text-xl font-bold text-text-dark">
            Aproveite<span className="text-primary">+</span>
          </span>
        </Link>

        {/* Botões de Ação */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block font-semibold text-text-dark transition-colors hover:text-primary">
            Login
          </button>
          <button className="rounded-lg bg-primary px-5 py-2.5 font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-green-600 hover:scale-105">
            Registro
          </button>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
};

export default Header;