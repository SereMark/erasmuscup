import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollAnimation, useStaggerAnimation } from '../../utils/animationUtils';

const WelcomeSection = ({ data }) => {
  const { title, descriptionHtml, highlights, footerHtml } = data;
  
  // Animation refs
  const sectionRef = useScrollAnimation({
    animation: 'fadeIn',
    delay: 0.2,
  });
  
  const highlightsRef = useStaggerAnimation({
    childSelector: '.highlight-item',
    animation: 'slideUp',
    stagger: 0.1,
    delay: 0.3,
  });

  return (
    <section ref={sectionRef} className="bg-dark-900 py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="gradient-text mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl">{title}</h2>
              <div 
                className="text-dark-100 text-base md:text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <motion.div 
            ref={highlightsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="highlight-item relative glass-card p-4 md:p-6 shadow-lg"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div 
                      className="mb-2 text-base md:text-lg"
                      dangerouslySetInnerHTML={{ __html: highlight.text }}
                    />
                    <Link 
                      to={`/rules#${highlight.ruleReference}`}
                      className="inline-flex items-center text-xs md:text-sm text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      <span>See Rule {highlight.ruleReference}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-3 w-3 md:h-4 md:w-4 ml-1" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 border-t-[12px] md:border-t-[20px] border-r-[12px] md:border-r-[20px] border-t-brand-500/20 border-r-transparent"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div 
              className="text-dark-200 text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: footerHtml }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;