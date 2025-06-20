import React from 'react';
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    Producto: [
      'Características',
      'Precios',
      'Integraciones',
      'API',
      'Seguridad'
    ],
    Empresa: [
      'Acerca de',
      'Blog',
      'Carreras',
      'Prensa',
      'Contacto'
    ],
    Recursos: [
      'Documentación',
      'Tutoriales',
      'Webinars',
      'Comunidad',
      'Estado del servicio'
    ],
    Legal: [
      'Privacidad',
      'Términos',
      'Cookies',
      'Licencias',
      'GDPR'
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer id="contact" className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-primary-600 to-primary-400 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">ModernApp</span>
              </div>
              
              <p className="text-secondary-300 mb-6 max-w-sm">
                Transformamos la manera en que los equipos trabajan juntos, 
                proporcionando herramientas innovadoras para el éxito digital.
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
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
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
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
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-secondary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-secondary-400 text-sm mb-4 md:mb-0">
            © 2025 ModernApp. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-secondary-400">
            <span>Hecho con ❤️ para equipos modernos</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;