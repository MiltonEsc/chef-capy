import React from 'react';
import { Heart, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    Producto: [
      'Características 🌟',
      'Precios 💰',
      'Integraciones 🔗',
      'API 🛠️',
      'Seguridad 🛡️'
    ],
    Empresa: [
      'Acerca de 🏡',
      'Blog 📝',
      'Carreras 💼',
      'Prensa 📰',
      'Contacto 📞'
    ],
    Recursos: [
      'Documentación 📚',
      'Tutoriales 🎓',
      'Webinars 🎥',
      'Comunidad 👥',
      'Estado del servicio 💚'
    ],
    Legal: [
      'Privacidad 🔒',
      'Términos 📋',
      'Cookies 🍪',
      'Licencias 📄',
      'GDPR 🇪🇺'
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', emoji: '🐦' },
    { icon: Github, href: '#', label: 'GitHub', emoji: '🐙' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', emoji: '💼' },
    { icon: Mail, href: '#', label: 'Email', emoji: '💌' }
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-sage-800 via-sage-900 to-warm-900 text-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float">🌙</div>
        <div className="absolute top-20 right-20 text-5xl opacity-10 animate-gentle-bounce">⭐</div>
        <div className="absolute bottom-20 left-1/4 text-7xl opacity-10 animate-soft-pulse">✨</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-float">🌟</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-sage-400 to-sage-500 p-3 rounded-cozy shadow-lg">
                  <Heart className="h-8 w-8 text-white animate-soft-pulse" />
                </div>
                <span className="text-3xl font-bold">CozyApp</span>
                <span className="text-3xl animate-gentle-bounce">🏡</span>
              </div>
              
              <p className="text-sage-200 mb-8 max-w-sm text-lg leading-relaxed">
                Transformamos la manera en que los equipos trabajan juntos, 
                creando espacios digitales llenos de calidez y productividad.
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 cozy-glass rounded-cozy flex items-center justify-center hover:bg-sage-600/50 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      {social.emoji}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-white mb-6 text-xl">{category}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sage-200 hover:text-white transition-colors duration-300 text-lg hover:translate-x-1 transform inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t-2 border-sage-700 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sage-300 text-lg mb-4 md:mb-0">
            © 2025 CozyApp. Todos los derechos reservados con 💕
          </p>
          
          <div className="flex items-center space-x-3 text-lg text-sage-300">
            <span>Hecho con</span>
            <Heart className="h-5 w-5 text-coral-400 animate-soft-pulse" />
            <span>para equipos que sueñan</span>
            <span className="text-2xl animate-gentle-bounce">✨</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;