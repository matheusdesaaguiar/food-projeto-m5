"use client";

import { motion } from 'framer-motion';
import AboutIllustration from './AboutIllustration';

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        
        {/* Coluna da Ilustração */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center"
        >
          <div className="h-auto w-full max-w-sm">
            <AboutIllustration />
          </div>
        </motion.div>

        {/* Coluna de Texto */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-4xl font-extrabold tracking-tight text-text-dark sm:text-5xl">
              O que é o <span className="text-primary">Aproveite+</span>?
            </h2>
            <p className="mt-6 text-lg leading-8 text-text-dark/80">
              No Brasil, toneladas de alimentos em perfeitas condições são desperdiçados todos os dias, enquanto milhões de pessoas enfrentam a insegurança alimentar. É um paradoxo que não podemos aceitar.
            </p>
            <p className="mt-4 text-lg leading-8 text-text-dark/80">
              O <strong className="font-semibold text-text-dark">Aproveite+</strong> nasceu como uma ponte tecnológica para resolver este problema. Somos uma plataforma sem fins lucrativos que conecta diretamente quem tem alimentos excedentes — como restaurantes, supermercados e produtores — com quem mais precisa, como ONGs e bancos de alimentos.
            </p>
            <p className="mt-4 text-lg leading-8 text-text-dark/80">
              Nossa missão é transformar o desperdício em esperança, criando uma comunidade forte, solidária e sustentável.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;