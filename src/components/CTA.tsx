import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA = () => {
  const benefits = [
    '🚀 Configuración en menos de 5 minutos',
    '🤗 Soporte cálido 24/7 incluido',
    '💚 Garantía de amor de 30 días',
    '✨ Actualizaciones mágicas gratuitas'
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-50 via-warm-50 to-sage-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-6xl opacity-30 animate-float">🌻</div>
        <div className="absolute top-40 right-10 text-5xl opacity-25 animate-gentle-bounce">🦋</div>
        <div className="absolute bottom-20 left-10 text-7xl opacity-20 animate-soft-pulse">🌈</div>
        <div className="absolute bottom-40 right-20 text-6xl opacity-30 animate-float">🌸</div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-sage-900 mb-8">
            ¿Listo para crear tu
            <span className="cozy-gradient-text block"> hogar digital perfecto? 🏡</span>
          </h2>
          
          <p className="text-2xl text-sage-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Únete a miles de equipos que ya han encontrado su lugar especial. 
            Comienza tu aventura acogedora hoy mismo, sin compromisos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center text-left cozy-card hover:scale-105 transition-all duration-300"
              >
                <CheckCircle className="h-6 w-6 text-sage-500 mr-4 flex-shrink-0" />
                <span className="text-sage-700 text-lg">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="btn-cozy-primary text-xl px-10 py-5 flex items-center group">
              Comenzar mi aventura 🌟
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="btn-cozy-secondary text-xl px-10 py-5">
              Hablar con nosotros 💬
            </button>
          </motion.div>

          <p className="text-lg text-sage-500 mt-8">
            No se requiere tarjeta de crédito • Cancela cuando quieras • Siempre con amor 💕
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;