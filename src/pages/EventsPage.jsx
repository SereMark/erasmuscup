import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const events = [
  {
    id: 1,
    title: "Lorem Ipsum Dolor Sit Amet",
    type: "house",
    date: "April 8, 2025",
    time: "6:00 PM",
    location: "Lorem Square",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
    imageUrl: "/assets/logos/house-cup-logo.png"
  },
  {
    id: 2,
    title: "Consectetur Adipiscing Elit",
    type: "gambit",
    date: "April 12, 2025",
    time: "8:00 PM",
    location: "Dolor Bar",
    description: "Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    imageUrl: "/assets/logos/house-cup-logo.png"
  },
  {
    id: 3,
    title: "Sed Do Eiusmod Tempor",
    type: "house",
    date: "April 15, 2025",
    time: "6:30 AM",
    location: "North Beach",
    description: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt.",
    imageUrl: "/assets/logos/house-cup-logo.png"
  },
  {
    id: 4,
    title: "Ut Enim Ad Minim Veniam",
    type: "super",
    date: "April 21, 2025",
    time: "3:00 PM",
    location: "City Center",
    description: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.",
    imageUrl: "/assets/logos/house-cup-logo.png"
  },
  {
    id: 5,
    title: "Quis Nostrud Exercitation Ullamco",
    type: "social",
    date: "April 27, 2025",
    time: "9:00 PM",
    location: "Apartment 7B",
    description: "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat.",
    imageUrl: "/assets/logos/house-cup-logo.png"
  },
  {
    id: 6,
    title: "Duis Aute Irure Dolor",
    type: "house",
    date: "May 2, 2025",
    time: "11:00 PM",
    location: "Secret Location",
    description: "Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt.",
    imageUrl: "/assets/logos/house-cup-logo.png"
  }
];

export default function EventsPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [activeMonth, setActiveMonth] = useState("April");

  useEffect(() => {
    if (activeFilter === "all") {
      setDisplayedEvents(events);
    } else {
      setDisplayedEvents(events.filter(event => event.type === activeFilter));
    }
  }, [activeFilter]);

  const calendarMonths = ["April", "May", "June"];

  const filterByMonth = (month) => {
    setActiveMonth(month);
  };

  return (
    <section className="min-h-screen bg-[#121212] text-white overflow-hidden">
      <div className="relative w-full h-[90vh] sm:h-screen overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="/assets/logos/house-cup-cover.png"
            alt="Events Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#2a0e57] to-black opacity-70" />
        </motion.div>

        <div className="relative flex items-center justify-center h-full px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl p-6 md:p-10 bg-black/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-2xl"
            >
              House Cup Events
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-xl md:text-2xl font-light mb-6 text-gray-200 leading-relaxed"
            >
              From weekly challenges to fun gatherings, check out our sample events below.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href="#upcoming" 
                className="group bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold px-6 py-3 rounded-full transition-transform duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
              >
                <span>Upcoming Events</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="#calendar" 
                className="group bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center hover:bg-white hover:text-black"
              >
                <span>View Calendar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center"
        >
          <div className="animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24 px-4 sm:px-6 py-12 sm:py-16">
        <section id="calendar" className="scroll-mt-16">
          <CalendarSection 
            activeMonth={activeMonth} 
            calendarMonths={calendarMonths} 
            filterByMonth={filterByMonth} 
          />
        </section>
        
        <section id="upcoming" className="scroll-mt-16">
          <UpcomingEventSection />
        </section>
        
        <EventCategoriesSection 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
        />
        
        <EventsList displayedEvents={displayedEvents} />
        
        <PastEventsHighlight />
      </div>
    </section>
  );
}

function CalendarSection({ activeMonth, calendarMonths, filterByMonth }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeInVariants} className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 opacity-50 rounded-3xl blur-xl transform -rotate-1"></div>
      <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] p-6 sm:p-10 rounded-3xl border border-indigo-900/30 shadow-2xl backdrop-blur-lg">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Event Calendar 2025
        </motion.h2>
        
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
          {calendarMonths.map((month) => (
            <button
              key={month}
              onClick={() => filterByMonth(month)}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                activeMonth === month
                  ? "bg-purple-700 text-white"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
        
        <div className="bg-black/20 rounded-xl p-4 sm:p-6 border border-purple-900/20">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-xs sm:text-sm text-center font-medium text-purple-300 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <motion.div variants={staggerContainerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid grid-cols-7 gap-1 sm:gap-2">
            {Array.from({ length: 30 }, (_, i) => {
              const hasEvent = [3, 8, 12, 15, 21, 27].includes(i + 1);
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`aspect-square rounded-lg p-1 sm:p-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    hasEvent
                      ? "bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/40 hover:border-purple-500"
                      : "bg-gray-800/30 hover:bg-gray-800/50"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium">{i + 1}</span>
                  {hasEvent && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-1" />}
                </motion.div>
              );
            })}
          </motion.div>
          
          <div className="mt-4 text-xs text-gray-400 text-center">
            * Click on a day with events (purple) to see details
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function UpcomingEventSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const featuredEvent = {
    title: "Lorem Ipsum Featured Event",
    date: "April 12, 2025",
    time: "8:00 PM",
    location: "Dolor Venue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  };
  
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeInVariants} className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 opacity-30 rounded-3xl blur-xl transform rotate-1"></div>
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] rounded-3xl border border-purple-900/30 shadow-2xl backdrop-blur-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-700/20 to-indigo-700/20 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-700/20 to-purple-700/20 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/4"></div>
        
        <div className="relative p-6 sm:p-10">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Next Upcoming Event
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10">
            <div className="lg:col-span-3 space-y-4">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
              >
                {featuredEvent.title}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg text-gray-300 leading-relaxed"
              >
                {featuredEvent.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4 mt-6"
              >
                <div className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{featuredEvent.date}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{featuredEvent.time}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{featuredEvent.location}</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6"
              >
                <a
                  href="#"
                  className="group inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-900/30"
                >
                  <span>Add to Calendar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-2 aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-black/30 border border-purple-900/20"
            >
              <img 
                src="/assets/logos/house-cup-logo.png" 
                alt="Event highlight" 
                className="w-full h-full object-cover object-center opacity-80"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EventCategoriesSection({ activeFilter, setActiveFilter }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const categories = [
    { id: "all", name: "All Events", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { id: "house", name: "House Events", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "gambit", name: "Gambits", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { id: "super", name: "Super Gambits", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { id: "social", name: "Social Events", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
  ];
  
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeInVariants} className="relative">
      <div className="bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400"
        >
          Categories
        </motion.h2>
        
        <motion.div variants={staggerContainerVariants} className="flex flex-wrap gap-3 sm:gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              onClick={() => setActiveFilter(category.id)}
              className={`flex items-center px-4 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
              </svg>
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function EventsList({ displayedEvents }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeInVariants}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300"
      >
        Upcoming Events
      </motion.h2>
      
      <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function EventCard({ event }) {
  return (
    <motion.div variants={itemVariants} className="group bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] p-1 rounded-xl shadow-lg border border-gray-800 hover:border-purple-900/50 transition-all duration-500 h-full">
      <div className="bg-[#1a1a1a]/80 backdrop-blur-sm p-5 rounded-xl h-full flex flex-col">
        <div className="h-48 rounded-lg overflow-hidden mb-4 bg-black/30">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-white">{event.title}</h3>
            <EventTypeTag type={event.type} />
          </div>
          
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{event.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-xs text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{event.date}</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center text-xs text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        
        <button className="group inline-flex items-center justify-center w-full bg-gray-800 hover:bg-purple-800 text-gray-300 hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-300">
          <span>View Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

function EventTypeTag({ type }) {
  const tagStyles = {
    house: "bg-blue-900/30 text-blue-300 border-blue-700/30",
    gambit: "bg-purple-900/30 text-purple-300 border-purple-700/30",
    super: "bg-pink-900/30 text-pink-300 border-pink-700/30",
    social: "bg-green-900/30 text-green-300 border-green-700/30"
  };
  
  const tagNames = {
    house: "House Event",
    gambit: "Gambit",
    super: "Super Gambit",
    social: "Social"
  };
  
  return (
    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${tagStyles[type] || "bg-gray-800 text-gray-400 border-gray-700"}`}>
      {tagNames[type] || "Event"}
    </div>
  );
}

function PastEventsHighlight() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const pastEvents = [
    {
      title: "Lorem Ipsum Opening Ceremony",
      date: "March 21, 2025",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      points: "+100 for all Houses"
    },
    {
      title: "Lorem Ipsum First Highlight",
      date: "March 28, 2025",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      points: "-10 for a selected group"
    }
  ];
  
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeInVariants} className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-[#2a2a2a] opacity-50 rounded-3xl blur-xl transform rotate-1"></div>
      <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] p-6 sm:p-10 rounded-3xl border border-gray-700 shadow-2xl backdrop-blur-lg">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400"
        >
          Past Events
        </motion.h2>
        
        <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastEvents.map((event, index) => (
            <motion.div key={index} variants={itemVariants} className="p-5 rounded-2xl bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2 text-white">{event.title}</h3>
              <div className="text-xs text-gray-400 mb-3">{event.date}</div>
              <p className="text-sm text-gray-300 mb-3">{event.description}</p>
              <div className="text-sm font-medium text-purple-300">{event.points}</div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-8 text-center">
          <Link
            to="/leaderboard"
            className="group inline-flex items-center bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-300"
          >
            <span>View Leaderboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}