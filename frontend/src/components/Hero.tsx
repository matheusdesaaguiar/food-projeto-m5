"use client";

import { motion } from 'framer-motion';
import HeroIllustration from './HeroIllustration';

const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen min-h-[700px] w-full">
      <div className="container mx-auto grid h-full grid-cols-1 items-center px-6 md:grid-cols-2">
        
        {/* Coluna de Texto */}
        <div className="text-center md:text-left">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-semibold text-primary"
          >
            Combatendo o Desperdício de Alimentos
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-5xl font-extrabold tracking-tight text-text-dark lg:text-7xl"
          >
            Food <span className="text-primary">Rescue</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mx-auto mt-6 max-w-lg text-lg text-text-dark/80 md:mx-0"
          >
            Conectamos quem tem de sobra com quem precisa de ajuda. Junte-se a nós e transforme excedentes em esperança.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:items-start"
          >
            <button className="w-full rounded-lg bg-primary px-8 py-3 font-bold text-dark shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:text-white sm:w-auto">
              Seja um Doador
            </button>
            <button className="w-full font-semibold text-text-dark transition-colors hover:text-primary sm:w-auto">
              Saiba Mais ↓
            </button>
          </motion.div>
        </div>

        {/* Coluna da Ilustração */}
        <div className="relative hidden h-full w-full items-center justify-center md:flex">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
            className="h-auto w-[80%] max-w-md"
          >
            <HeroIllustration />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;