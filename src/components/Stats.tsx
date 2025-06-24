import React from 'react';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    {
      icon: Users,
      emoji: '👥',
      number: '50,000+',
      label: 'Usuarios Felices',
      description: 'Sonriendo con nuestra plataforma cada día',
      color: 'from-sage-400 to-sage-500'
    },
    {
      icon: Globe,
      emoji: '🌍',
      number: '120+',
      label: 'Países Acogedores',
      description: 'Creando hogares digitales en todo el mundo',
      color: 'from-warm-400 to-warm-500'
    },
    {
      icon: TrendingUp,
      emoji: '💚',
      number: '99.9%',
      label: 'Tiempo de Amor',
      description: 'Siempre aquí cuando nos necesitas',
      color: 'from-coral-400 to-coral-500'
    },
    {
      icon: Award,
      emoji: '⭐',
      number: '4.9/5',
      label: 'Satisfacción Cálida',
      description: 'Corazones contentos con nuestro servicio',
      color: 'from-cream-400 to-cream-500'
    }
  ];

  return (
    <section id="stats" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-500 via-sage-600 to-warm-600 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">🌸</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 animate-gentle-bounce">🍃</div>
        <div className="absolute bottom-20 left-1/4 text-7xl opacity-15 animate-soft-pulse">☁️</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-float">🌺</div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Números que abrazan el corazón 💕
          </h2>
          <p className="text-2xl text-sage-100 max-w-4xl mx-auto leading-relaxed">
            Nuestro crecimiento y el amor de nuestros usuarios reflejan 
            el compromiso con crear experiencias que realmente importan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="cozy-glass rounded-extra-cozy p-10 hover:bg-white/30 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                <div className="flex justify-center items-center mb-6">
                  <div className={`w-20 h-20 rounded-cozy bg-gradient-to-br ${stat.color} p-5 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-5xl ml-4 animate-gentle-bounce">{stat.emoji}</span>
                </div>
                
                <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-500">
                  {stat.number}
                </div>
                
                <div className="text-2xl font-semibold text-sage-100 mb-3">
                  {stat.label}
                </div>
                
                <p className="text-sage-200 text-lg leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;