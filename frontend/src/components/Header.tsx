"use client";

import LogoIcon from './icons/LogoIcon';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        {/* Logo e Nome do Projeto */}
        <Link href="/" className="flex items-center gap-3">
          <LogoIcon />
          <span className="text-xl font-bold text-text-dark">
            Food <span className="text-primary">Rescue</span>
          </span>
        </Link>

        {/* Botões de Ação - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/alimentos" className="font-semibold text-text-dark transition-colors hover:text-green-600">
            Alimentos
          </Link>
          <Link href="/login" className="font-semibold text-text-dark transition-colors hover:text-green-600">
            Login
          </Link>

          <Link href="/register" className="rounded-lg bg-primary px-5 py-2.5 font-bold text-dark shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-105">
            Registro
          </Link>
        </div>

        {/* Botão Mobile */}
        <button 
          className="md:hidden p-2 text-text-dark"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-background/95 backdrop-blur-md md:hidden shadow-lg">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-4">
              <Link 
                href="/alimentos" 
                className="font-semibold text-text-dark py-2 transition-colors hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Alimentos
              </Link>
              <Link 
                href="/login" 
                className="font-semibold text-text-dark py-2 transition-colors hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="rounded-lg bg-primary px-5 py-2.5 font-bold text-dark text-center shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-green-600 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Registro
              </Link>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        )}
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
};

export default Header;