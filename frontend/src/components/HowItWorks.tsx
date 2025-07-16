"use client";

import { motion } from 'framer-motion';
import { RegisterIcon } from './icons/RegisterIcon';
import { DonateIcon } from './icons/DonateIcon';
import { ConnectIcon } from './icons/ConnectIcon';


const steps = [
  {
    icon: RegisterIcon,
    title: "1. Cadastro Rápido",
    description: "Seja um doador ou uma entidade, o seu registo é simples e seguro. Em poucos minutos, você faz parte da nossa rede de solidariedade."
  },
  {
    icon: DonateIcon,
    title: "2. Registe a Doação",
    description: "Doadores podem facilmente listar os alimentos disponíveis, e as entidades podem navegar pelas doações para encontrar o que precisam."
  },
  {
    icon: ConnectIcon,
    title: "3. Combine a Coleta",
    description: "Nossa plataforma facilita o contacto para que a coleta seja combinada de forma eficiente, garantindo que o alimento chegue fresco a quem precisa."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        
        {/* Título da Secção */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-text-dark sm:text-5xl">
            Simples, Rápido e Eficaz
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-dark/80">
            O processo para fazer a diferença é mais fácil do que imagina. Veja como funciona em três passos:
          </p>
        </div>

        {/* Grelha de Passos */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-text-dark">{step.title}</h3>
              <p className="mt-4 text-base text-text-dark/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;