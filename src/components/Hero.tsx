import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-primary-50 border border-primary-200 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-primary-600 mr-2" />
              <span className="text-primary-700 text-sm font-medium">
                Nuevo: Funciones avanzadas disponibles
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
              Transforma tu
              <span className="gradient-text block">
                experiencia digital
              </span>
            </h1>
            
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre una nueva forma de trabajar con nuestra plataforma innovadora. 
              Diseñada para equipos modernos que buscan eficiencia y resultados excepcionales.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button className="btn-primary flex items-center group">
              Comenzar gratis
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="btn-secondary flex items-center group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Ver demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-primary-600 to-primary-400 p-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">99.9%</div>
                    <div className="text-primary-100">Tiempo de actividad</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50K+</div>
                    <div className="text-primary-100">Usuarios activos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-primary-100">Soporte técnico</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-secondary-50 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary-500 rounded"></div>
                      </div>
                      <div className="text-sm text-secondary-600">Función {i}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full opacity-20"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-secondary-400 to-secondary-300 rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;