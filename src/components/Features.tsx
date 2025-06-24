import React from 'react';
import { Shield, Coffee, Users, BarChart3, Globe, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: Shield,
      emoji: '🛡️',
      title: 'Seguridad Acogedora',
      description: 'Tu información está segura en nuestro hogar digital, protegida con el cariño que mereces.',
      color: 'from-sage-400 to-sage-500'
    },
    {
      icon: Coffee,
      emoji: '☕',
      title: 'Rendimiento Relajado',
      description: 'Velocidad que no te estresa. Todo fluye naturalmente, como una mañana perfecta.',
      color: 'from-warm-400 to-warm-500'
    },
    {
      icon: Users,
      emoji: '🤗',
      title: 'Colaboración Cálida',
      description: 'Trabajar en equipo nunca fue tan acogedor. Conecta con tu equipo de manera natural.',
      color: 'from-coral-400 to-coral-500'
    },
    {
      icon: BarChart3,
      emoji: '📊',
      title: 'Insights Amigables',
      description: 'Datos que hablan tu idioma, presentados de forma clara y sin complicaciones.',
      color: 'from-cream-400 to-cream-500'
    },
    {
      icon: Globe,
      emoji: '🌍',
      title: 'Alcance Global Cálido',
      description: 'Conectamos corazones alrededor del mundo con nuestra infraestructura amorosa.',
      color: 'from-sage-500 to-warm-500'
    },
    {
      icon: Smartphone,
      emoji: '📱',
      title: 'Experiencia Móvil Suave',
      description: 'Lleva la comodidad contigo. Diseño que se adapta a tu estilo de vida.',
      color: 'from-coral-500 to-warm-500'
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-sage-900 mb-6">
            Características que
            <span className="cozy-gradient-text block"> abrazan tu trabajo 🤗</span>
          </h2>
          <p className="text-2xl text-sage-600 max-w-4xl mx-auto leading-relaxed">
            Descubre las funcionalidades pensadas con amor que hacen de nuestra plataforma 
            el hogar digital perfecto para tu equipo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="cozy-card group hover:shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className={`cozy-feature-icon bg-gradient-to-br ${feature.color} shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-4xl ml-4 animate-gentle-bounce">{feature.emoji}</span>
              </div>
              
              <h3 className="text-2xl font-semibold text-sage-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-sage-600 leading-relaxed text-lg mb-6">
                {feature.description}
              </p>
              
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <button className="text-sage-600 font-medium hover:text-sage-800 transition-colors flex items-center">
                  Descubrir más 
                  <span className="ml-2 text-xl">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;