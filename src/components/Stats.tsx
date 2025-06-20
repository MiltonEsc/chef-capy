import React from 'react';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    {
      icon: Users,
      number: '50,000+',
      label: 'Usuarios Activos',
      description: 'Confiando en nuestra plataforma diariamente',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      number: '120+',
      label: 'Países',
      description: 'Presencia global en todos los continentes',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      number: '99.9%',
      label: 'Tiempo de Actividad',
      description: 'Disponibilidad garantizada 24/7',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      number: '4.9/5',
      label: 'Satisfacción',
      description: 'Calificación promedio de nuestros usuarios',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-500">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Números que hablan por sí solos
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Nuestro crecimiento y la confianza de nuestros usuarios reflejan 
            el compromiso con la excelencia y la innovación constante.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="glass-effect rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} p-4 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                
                <div className="text-xl font-semibold text-primary-100 mb-2">
                  {stat.label}
                </div>
                
                <p className="text-primary-200 text-sm">
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