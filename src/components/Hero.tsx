import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-sage-100 to-warm-100 border-2 border-sage-200 rounded-full px-6 py-3 mb-8 shadow-lg">
              <Sparkles className="h-5 w-5 text-sage-600 mr-3 animate-wiggle" />
              <span className="text-sage-700 font-medium">
                ✨ Nuevo: Experiencia más acogedora disponible
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-sage-900 mb-8 leading-tight">
              Crea tu espacio
              <span className="cozy-gradient-text block">
                digital perfecto 🏡
              </span>
            </h1>
            
            <p className="text-2xl text-sage-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Descubre una nueva forma de trabajar en un ambiente cálido y acogedor. 
              Diseñado para equipos que valoran la comodidad y los resultados extraordinarios.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <button className="btn-cozy-primary flex items-center group text-xl">
              Comenzar gratis 🌟
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="btn-cozy-secondary flex items-center group text-xl">
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Ver demo 🎬
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="relative rounded-extra-cozy overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-sage-400 via-sage-500 to-sage-600 p-12 text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-3">99.9% 💚</div>
                    <div className="text-sage-100 text-lg">Tiempo de actividad</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-3">50K+ 👥</div>
                    <div className="text-sage-100 text-lg">Usuarios felices</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-3">24/7 🤗</div>
                    <div className="text-sage-100 text-lg">Soporte amigable</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-cream-50 to-white p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { emoji: '🌱', name: 'Crecimiento' },
                    { emoji: '☕', name: 'Comodidad' },
                    { emoji: '🎨', name: 'Creatividad' },
                    { emoji: '🤝', name: 'Colaboración' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="cozy-card text-center hover:scale-105 transition-all duration-500"
                      whileHover={{ rotate: 2 }}
                    >
                      <div className="text-4xl mb-3 animate-gentle-bounce">{item.emoji}</div>
                      <div className="text-sage-700 font-medium">{item.name}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Elementos flotantes decorativos */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -left-6 text-6xl opacity-80"
            >
              🌸
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 text-6xl opacity-80"
            >
              🍃
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-1/2 -left-12 text-5xl opacity-70"
            >
              ☁️
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;