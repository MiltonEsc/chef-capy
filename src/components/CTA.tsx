import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA = () => {
  const benefits = [
    'Configuración en menos de 5 minutos',
    'Soporte técnico 24/7 incluido',
    'Garantía de devolución de 30 días',
    'Actualizaciones automáticas gratuitas'
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
            ¿Listo para transformar tu
            <span className="gradient-text"> flujo de trabajo?</span>
          </h2>
          
          <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de equipos que ya han revolucionado su productividad. 
            Comienza tu prueba gratuita hoy mismo, sin compromisos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center text-left"
              >
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-secondary-700">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="btn-primary text-lg px-8 py-4 flex items-center group">
              Comenzar prueba gratuita
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="btn-secondary text-lg px-8 py-4">
              Hablar con ventas
            </button>
          </motion.div>

          <p className="text-sm text-secondary-500 mt-6">
            No se requiere tarjeta de crédito • Cancela en cualquier momento
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;