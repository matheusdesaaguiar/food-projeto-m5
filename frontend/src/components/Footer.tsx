"use client";

import LogoIcon from './icons/LogoIcon';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-primary/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Coluna do Logo e Descrição */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <LogoIcon />
              <span className="text-xl font-bold text-text-dark">
                Food<span className="text-primary">Rescue</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-text-dark/70">
              Transformando o desperdício em esperança. Junte-se à nossa comunidade para criar um futuro mais sustentável e solidário.
            </p>
          </div>

          {/* Colunas de Navegação */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold text-text-dark">Projeto</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#about" className="text-text-dark/70 hover:text-primary">Sobre Nós</a></li>
                <li><a href="#how-it-works" className="text-text-dark/70 hover:text-primary">Como Funciona</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-dark">Participe</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#join-us" className="text-text-dark/70 hover:text-primary">Seja um Doador</a></li>
                <li><a href="#join-us" className="text-text-dark/70 hover:text-primary">Seja um Beneficiário</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-dark">Recursos</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#cta" className="text-text-dark/70 hover:text-primary">Ver Alimentos</a></li>
                <li><a href="#cta" className="text-text-dark/70 hover:text-primary">Pontos de Coleta</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-dark">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-text-dark/70 hover:text-primary">Termos de Serviço</a></li>
                <li><a href="#" className="text-text-dark/70 hover:text-primary">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Linha de Copyright e Redes Sociais */}
        <div className="mt-12 border-t border-primary/20 pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-text-dark/60">
            &copy; {new Date().getFullYear()} Food Rescue.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;