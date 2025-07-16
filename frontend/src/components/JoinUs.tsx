"use client";

import { motion } from "framer-motion";
import { DonorIcon } from "./icons/DonorIcon";
import { BeneficiaryIcon } from "./icons/BeneficiaryIcon";

const JoinUs = () => {
  return (
    <section id="join-us" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        
        {/* Título da Secção */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-text-dark sm:text-5xl">
            Faça Parte da Mudança
          </h2>
          <p className="mt-4 text-lg text-text-dark/80">
            Seja um herói no combate ao desperdício. Escolha como você quer ajudar.
          </p>
        </div>

        {/* Grelha com os dois perfis */}
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
          
          {/* Card: Para Doadores */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col rounded-2xl bg-white p-8 shadow-xl"
          >
            <div className="flex-shrink-0">
              <DonorIcon className="h-10 w-10 text-primary" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-text-dark">Para Doadores</h3>
                <p className="mt-4 text-base text-text-dark/70">
                  O seu negócio gera excedentes alimentares? Supermercados, restaurantes e produtores podem transformar o que seria desperdício em impacto social positivo. O processo é simples e transparente.
                </p>
              </div>
              <div className="mt-8">
                <button className="w-full rounded-lg bg-primary px-8 py-3 font-bold text-dark transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:text-white">
                  Quero Doar
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card: Para Beneficiários */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col rounded-2xl bg-white p-8 shadow-xl"
          >
            <div className="flex-shrink-0">
              <BeneficiaryIcon className="h-10 w-10 text-primary" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-text-dark">Para Beneficiários</h3>
                <p className="mt-4 text-base text-text-dark/70">
                  A sua organização ajuda a alimentar pessoas em situação de vulnerabilidade? ONGs e bancos de alimentos podem aceder a doações de qualidade para fortalecer o seu trabalho.
                </p>
              </div>
              <div className="mt-8">
                <button className="w-full rounded-lg bg-accent px-8 py-3 font-bold text-dark transition-all duration-300 hover:scale-105 hover:bg-lime-600 hover:text-white">
                  Quero Receber
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default JoinUs;