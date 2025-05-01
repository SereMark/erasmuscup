import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import eventsData from '../data/eventsData.json';
import EventsHero from '../components/events/EventsHero';
import EventCard from '../components/events/EventCard';
import OrganizeEventSection from '../components/events/OrganizeEventSection';

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [_, setShowScrollTop] = useState(false);
  
  // Get unique categories from events data
  const categories = useMemo(() => {
    const categorySet = new Set(eventsData.events.map(event => event.category));
    return ['all', ...categorySet];
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0 }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };
  
  // Helper for getting readable category name
  const getCategoryLabel = (category) => {
    if (category === 'all') return 'All Events';
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Filter events
  const upcomingEvents = eventsData.events.filter(event => event.status === 'upcoming');
  const filteredEvents = activeFilter === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === activeFilter);
  const hasUpcomingEvents = upcomingEvents.length > 0;
  
  // Get category colors
  const getCategoryColor = (category) => {
    switch (category) {
      case 'house-event': return 'brand';
      case 'super-gambit': return 'success';
      case 'gambit': return 'accent';
      case 'social': return 'info';
      default: return 'brand';
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="bg-dark-950"
    >
      <Helmet>
        <title>Events | Erasmus House Cup 2025</title>
        <meta
          name="description"
          content="Join the exclusive Erasmus House Cup 2025 events. Compete for your house, earn points, and experience the thrill of house competition."
        />
      </Helmet>
      
      <EventsHero data={eventsData.pageHeader} />
      
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {hasUpcomingEvents ? (
            <motion.div
              className="mb-16"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-sm font-medium mb-3">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400"></span>
                    </span>
                    Upcoming Events
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">Join The Excitement</h2>
                  <p className="text-dark-200 max-w-2xl">Participate in these events to earn points for your house and create unforgettable memories!</p>
                </div>
                
                <div className="inline-flex flex-wrap items-center p-1.5 bg-dark-800/90 backdrop-blur-sm rounded-lg self-start md:self-auto mt-4 md:mt-0 shadow-md">
                  {categories.map(category => (
                    <button 
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all m-0.5 ${
                        activeFilter === category 
                          ? `bg-${getCategoryColor(category)}-500 text-white shadow-sm` 
                          : 'text-dark-200 hover:text-white hover:bg-dark-700'
                      }`}
                      aria-pressed={activeFilter === category}
                    >
                      {getCategoryLabel(category)}
                    </button>
                  ))}
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                      <EventCard 
                        key={event.id} 
                        event={event}
                        featured={index === 0}
                      />
                    ))
                  ) : (
                    <motion.div 
                      className="text-center py-16 bg-dark-900/70 rounded-xl border border-dark-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-800/80 mb-4">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-dark-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">No {activeFilter !== 'all' ? getCategoryLabel(activeFilter) : ''} events found</h3>
                      <p className="text-dark-300 max-w-md mx-auto">
                        There are no events in this category right now. Check back soon or try a different filter.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              className="mb-16 text-center py-20"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-dark-800/80 border border-dark-700/50 mb-6 shadow-lg">
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-dark-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">No Upcoming Events</h2>
              <p className="text-dark-300 max-w-md mx-auto mb-6">
                There are no upcoming events planned at the moment. Why not be the person to organize one?
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full mx-auto"></div>
            </motion.div>
          )}
          
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <OrganizeEventSection data={eventsData.organizeEvent} />
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default EventsPage;