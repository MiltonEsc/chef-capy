import React from 'react';
import { Shield, Zap, Users, BarChart3, Globe, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Seguridad Avanzada',
      description: 'Protección de datos de nivel empresarial con cifrado end-to-end y autenticación multifactor.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Rendimiento Ultrarrápido',
      description: 'Optimizado para velocidad con tiempos de carga inferiores a 100ms y arquitectura escalable.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Colaboración en Tiempo Real',
      description: 'Trabaja en equipo sin fricciones con sincronización instantánea y herramientas colaborativas.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Inteligentes',
      description: 'Insights accionables con dashboards interactivos y reportes automatizados personalizables.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Alcance Global',
      description: 'Infraestructura distribuida globalmente con CDN optimizado para máximo rendimiento.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Smartphone,
      title: 'Experiencia Móvil',
      description: 'Diseño responsive perfecto con aplicaciones nativas para iOS y Android disponibles.',
      color: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Características que
            <span className="gradient-text"> marcan la diferencia</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Descubre las funcionalidades avanzadas que hacen de nuestra plataforma 
            la elección preferida de miles de equipos en todo el mundo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:shadow-2xl"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-secondary-600 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                  Saber más →
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