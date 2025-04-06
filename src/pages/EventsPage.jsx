import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function EventsPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="min-h-screen bg-[#121212] text-white overflow-hidden">
      <div className="relative w-full h-screen overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="/assets/logos/house-cup-cover.png"
            alt="Events Background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-black to-gray-900 opacity-80" />
        </motion.div>

        <div className="relative flex items-center justify-center h-full px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl p-8 md:p-10 bg-black/60 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-2xl"
            >
              🚧 Events Under Construction 🚧
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl font-light mb-8 text-gray-200 leading-relaxed"
            >
              We're working hard to bring you exciting competitions and challenges soon. Check back later for updates!
            </motion.p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <div className="animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto space-y-24 px-4 sm:px-6 py-16">
        <EventHighlights />
      </div>
    </section>
  );
}

function EventHighlights() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const events = [
    {
      title: "Something 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      delay: 0.1
    },
    {
      title: "Something 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      delay: 0.2
    },
    {
      title: "Something 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      delay: 0.3
    }
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] p-8 sm:p-10 rounded-3xl border border-gray-700 shadow-2xl backdrop-blur-lg"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300"
      >
        Event Highlights
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: event.delay }}
            className="p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-gray-800 hover:border-gray-500 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">{event.title}</h3>
            <p className="text-sm text-gray-300">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
