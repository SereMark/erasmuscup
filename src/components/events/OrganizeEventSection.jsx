import React, { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * Perfected OrganizeEventSection component
 * Clean and engaging design to motivate students to create their own events
 */
const OrganizeEventSection = ({ data }) => {
  const { title, description, whatsappInfo, customStyles, benefits, eventIdeas, ctaText } = data;
  
  // Get color from custom styles or default
  const accentColor = customStyles?.accentColor || 'brand-500';
  const color = accentColor.split('-')[0];
  const backgroundImage = customStyles?.backgroundImage;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };

  const handleWhatsAppClick = () => {
    alert(`To propose an event: ${whatsappInfo}`);
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl shadow-xl border border-dark-800/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <>
            <div className="absolute inset-0 bg-dark-950/80 z-10"></div>
            <img 
              src={backgroundImage} 
              alt="Background" 
              className="w-full h-full object-cover opacity-30"
            />
          </>
        ) : (
          <div className={`absolute inset-0 bg-${color}-900/20`}></div>
        )}
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-brand-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-accent-500/5 blur-3xl"></div>
        
        {/* Dot pattern with low opacity */}
        <div className="absolute inset-0 dot-pattern opacity-5 z-10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 p-8 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Icon side */}
          <div className="md:col-span-2 lg:col-span-1 flex justify-center">
            <motion.div
              variants={itemVariants}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-${color}-900/30 flex items-center justify-center border border-${color}-500/30 shadow-lg`}
              whileHover={{ scale: 1.05, boxShadow: `0 0 15px rgba(145, 70, 255, 0.3)` }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-8 w-8 sm:h-10 sm:w-10 text-${color}-400`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </motion.div>
          </div>
          
          {/* Content side */}
          <div className="md:col-span-10 lg:col-span-11">
            <motion.div variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">{title}</h3>
              <p className="text-dark-200 mb-6 max-w-3xl text-base sm:text-lg">{description}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <motion.div variants={itemVariants} className="mb-6">
                  <h4 className={`text-base font-semibold text-${color}-400 mb-3 flex items-center`}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Why organize an event?
                  </h4>
                  <ul className="grid sm:grid-cols-1 gap-3 text-base text-dark-200">
                    {benefits && benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className={`text-${color}-500 mr-2 mt-1 flex-shrink-0`}>✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                {/* Event ideas */}
                {eventIdeas && eventIdeas.length > 0 && (
                  <motion.div variants={itemVariants} className="mb-6 lg:mb-0">
                    <h4 className={`text-base font-semibold text-${color}-400 mb-3 flex items-center`}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Event Ideas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {eventIdeas.map((idea, index) => (
                        <motion.span 
                          key={index}
                          variants={itemVariants}
                          whileHover={{ scale: 1.05, backgroundColor: `rgba(145, 70, 255, 0.2)` }}
                          className={`px-3 py-1.5 rounded-lg text-sm bg-${color}-900/40 text-${color}-300 border border-${color}-700/30 transition-colors duration-200`}
                        >
                          {idea}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="flex flex-col justify-center">
                <motion.div variants={itemVariants}>
                  {/* WhatsApp info panel */}
                  <div className="p-5 rounded-lg bg-dark-800/80 border border-dark-700/60 mb-5 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-900/20 rounded-full p-2 flex-shrink-0">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          className="h-6 w-6 text-green-500"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-1">How to get started</h4>
                        <p className="text-dark-200 text-sm mb-2">{whatsappInfo}</p>
                        <p className="text-sm text-dark-300">Event proposals are reviewed within 24 hours</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <motion.button
                    onClick={handleWhatsAppClick}
                    className={`w-full bg-${color}-600 hover:bg-${color}-700 text-white rounded-lg px-6 py-3.5 flex items-center justify-center font-medium transition-all hover:-translate-y-1 shadow-lg hover:shadow-${color}-900/30`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2">{ctaText || "Propose Your Event"}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(OrganizeEventSection);