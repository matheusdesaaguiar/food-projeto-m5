"use client";

import { motion } from "framer-motion";

const CallToActions = () => {
  return (
    <section id="cta" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        {/* Container principal */}
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-24 text-center shadow-2xl sm:px-16">
          
          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="relative z-10" // Garante que o conteúdo fique acima dos gradientes
          >
            <h2 className="text-4xl font-extrabold tracking-tight text-dark sm:text-5xl">
              Pronto para Explorar?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-dark">
              Veja os alimentos disponíveis para doação na sua região ou encontre o ponto de coleta mais próximo de si.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-lg bg-white px-8 py-3 font-bold text-primary shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white">
                Ver Alimentos Doados
              </button>
              <button className="font-semibold primary transition-colors hover:text-green-600">
                Encontrar Pontos de Coleta →
              </button>
            </div>
          </motion.div>

          {/* EFEITO DE BRILHO (AURORA) */}
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 transform-gpu blur-3xl"
          >
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-accent to-primary opacity-20"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CallToActions;
