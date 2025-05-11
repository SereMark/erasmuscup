import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import eventsData from '../data/eventsData.json';
import EventsHero from '../components/events/EventsHero';
import EventCard from '../components/events/EventCard';
import OrganizeEventSection from '../components/events/OrganizeEventSection';

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // date, points, alphabetical
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Get unique categories from events data
  const categories = useMemo(() => {
    const categorySet = new Set(eventsData.events.map(event => event.category));
    return ['all', ...Array.from(categorySet)];
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger stats animation when components are visible
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateStats(true);
    }, 500);
    return () => clearTimeout(timer);
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

  const statVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { duration: 1, ease: "easeOut" }
    }
  };
  
  // Helper for getting readable category name
  const getCategoryLabel = (category) => {
    if (category === 'all') return 'All Events';
    switch (category) {
      case 'house-event': return 'House Events';
      case 'gambit': return 'Gambit Challenges';
      case 'super-gambit': return 'Super Gambits';
      case 'social': return 'Social Events';
      default: return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  };
  
  // Filter events
  const upcomingEvents = eventsData.events.filter(event => event.status === 'upcoming');
  const filteredEvents = activeFilter === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === activeFilter);
  const hasUpcomingEvents = upcomingEvents.length > 0;

  // Sort events based on selected sorting option
  const sortedEvents = useMemo(() => {
    if (sortBy === 'date') {
      return [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'points') {
      return [...filteredEvents].sort((a, b) => (b.housePoints || 0) - (a.housePoints || 0));
    } else if (sortBy === 'alphabetical') {
      return [...filteredEvents].sort((a, b) => a.title.localeCompare(b.title));
    }
    return filteredEvents;
  }, [filteredEvents, sortBy]);
  
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

  // Calculate total points across all categories
  const totalPointsAllCategories = useMemo(() => 
    upcomingEvents.reduce((sum, event) => sum + (event.housePoints || 0), 0),
    [upcomingEvents]
  );

  // Toggle filter menu for mobile view
  const toggleFilterMenu = useCallback(() => {
    setFilterMenuOpen(prev => !prev);
  }, []);
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="bg-dark-950 min-h-screen"
    >
      <Helmet>
        <title>Events | Erasmus House Cup 2025</title>
        <meta
          name="description"
          content="Join the exclusive Erasmus House Cup 2025 events. Compete for your house, earn points, and experience the thrill of house competition."
        />
      </Helmet>
      
      <EventsHero data={eventsData.pageHeader} />
      
      <section id="events-list" className="py-16 lg:py-20">
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
                
                {/* Mobile Filter Toggle */}
                <div className="md:hidden mt-4">
                  <button 
                    className="w-full py-3 px-4 bg-dark-800 rounded-lg text-white flex items-center justify-between"
                    onClick={toggleFilterMenu}
                    aria-expanded={filterMenuOpen}
                    aria-controls="filter-controls"
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filter & Sort 
                      {activeFilter !== 'all' && 
                        <span className="ml-2 px-2 py-0.5 text-xs bg-dark-700 rounded-full">
                          {getCategoryLabel(activeFilter)}
                        </span>
                      }
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 transition-transform duration-300 ${filterMenuOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                <AnimatePresence>
                  {(filterMenuOpen || window.innerWidth >= 768) && (
                    <motion.div 
                      id="filter-controls"
                      className="flex flex-col gap-3 w-full md:w-auto"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Sort Options */}
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 text-dark-300 text-sm mt-4 md:mt-0">
                        <span className="font-medium px-1">Sort by:</span>
                        <div className="bg-dark-800/70 rounded-lg p-1 flex w-full md:w-auto">
                          <button 
                            onClick={() => setSortBy('date')}
                            className={`px-3 py-1.5 rounded flex-1 md:flex-none transition-colors ${sortBy === 'date' ? 'bg-dark-700 text-white' : 'hover:bg-dark-750 hover:text-white'}`}
                            aria-pressed={sortBy === 'date'}
                          >
                            <span className="flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Date
                            </span>
                          </button>
                          <button 
                            onClick={() => setSortBy('points')}
                            className={`px-3 py-1.5 rounded flex-1 md:flex-none transition-colors ${sortBy === 'points' ? 'bg-dark-700 text-white' : 'hover:bg-dark-750 hover:text-white'}`}
                            aria-pressed={sortBy === 'points'}
                          >
                            <span className="flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                              Points
                            </span>
                          </button>
                          <button 
                            onClick={() => setSortBy('alphabetical')}
                            className={`px-3 py-1.5 rounded flex-1 md:flex-none transition-colors ${sortBy === 'alphabetical' ? 'bg-dark-700 text-white' : 'hover:bg-dark-750 hover:text-white'}`}
                            aria-pressed={sortBy === 'alphabetical'}
                          >
                            <span className="flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                              </svg>
                              A-Z
                            </span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Category Filter */}
                      <div className="space-y-2 w-full md:w-auto">
                        <span className="font-medium text-dark-300 text-sm px-1">Filter by Category:</span>
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center p-1.5 bg-dark-800/90 backdrop-blur-sm rounded-lg self-start md:self-auto shadow-md gap-1 w-full">
                          {categories.map(category => (
                            <button 
                              key={category}
                              onClick={() => {
                                setActiveFilter(category);
                                if (window.innerWidth < 768) setFilterMenuOpen(false);
                              }}
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter + sortBy}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {sortedEvents.length > 0 ? (
                    <>
                      {/* Stats bar showing points per category */}
                      <motion.div 
                        className="bg-dark-800/70 rounded-xl p-5 mb-8 border border-dark-700/60 overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.5, delay: 0.2 }
                          }
                        }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <h3 className="text-lg font-medium text-white">Points at Stake by Category</h3>
                          <div className="mt-2 sm:mt-0 text-brand-300 font-semibold text-sm bg-dark-850 px-3 py-1 rounded-lg inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Total: {totalPointsAllCategories} House Points
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {categories.filter(cat => cat !== 'all').map(category => {
                            const categoryEvents = upcomingEvents.filter(event => event.category === category);
                            const totalPoints = categoryEvents.reduce((sum, event) => sum + (event.housePoints || 0), 0);
                            const percentOfTotal = totalPointsAllCategories > 0 
                              ? (totalPoints / totalPointsAllCategories * 100)
                              : 0;
                            
                            return (
                              <motion.div 
                                key={category} 
                                className="bg-dark-850 rounded-lg p-4 border border-dark-750 hover:border-dark-600 transition-all group"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setActiveFilter(category)}
                                style={{ cursor: 'pointer' }}
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="text-dark-100 font-medium group-hover:text-white transition-colors">
                                    {getCategoryLabel(category)}
                                    <span className="ml-1 text-sm text-dark-400">({categoryEvents.length})</span>
                                  </h4>
                                  <span className={`text-${getCategoryColor(category)}-400 font-semibold`}>
                                    {totalPoints} pts
                                  </span>
                                </div>
                                <div className="w-full bg-dark-700 h-2.5 rounded-full overflow-hidden">
                                  <motion.div 
                                    className={`bg-${getCategoryColor(category)}-500 h-full rounded-full`}
                                    initial="hidden"
                                    animate={animateStats ? "visible" : "hidden"}
                                    variants={statVariants}
                                    custom={percentOfTotal}
                                    style={{ width: `${percentOfTotal}%` }}
                                  ></motion.div>
                                </div>
                                <div className="mt-2 text-xs text-dark-400">
                                  {percentOfTotal.toFixed(0)}% of total points
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                      
                      {/* Events Results Count */}
                      <div className="text-dark-300 text-sm mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Showing {sortedEvents.length} {sortedEvents.length === 1 ? 'event' : 'events'}
                        {activeFilter !== 'all' && ` in ${getCategoryLabel(activeFilter)}`}
                      </div>
                      
                      {/* Events list */}
                      <div className="space-y-8">
                        {sortedEvents.map((event, index) => (
                          <EventCard 
                            key={event.id} 
                            event={event}
                            featured={index === 0}
                          />
                        ))}
                      </div>
                    </>
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
                      <button
                        onClick={() => setActiveFilter('all')}
                        className="mt-6 px-4 py-2 bg-dark-800 text-white rounded-lg hover:bg-dark-700 transition-colors"
                      >
                        Show All Events
                      </button>
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