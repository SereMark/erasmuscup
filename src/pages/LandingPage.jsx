import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function LandingPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="min-h-screen bg-[#121212] text-white overflow-hidden">
      <div className="relative w-full h-screen overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="/assets/logos/house-cup-cover.png"
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#2a0e57] to-black opacity-70" />
        </motion.div>
        <div className="relative flex items-center justify-center h-full px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl p-8 md:p-10 bg-black/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-2xl"
            >
              House Cup 2025
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl font-light mb-8 text-gray-200 leading-relaxed"
            >
              Join us for a definitely-not-a-cult competition among eager Erasmus students,{" "}
              <em className="font-medium">lovingly guided by the House Cup Rules 2025.</em>
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-5 items-center justify-center"
            >
              <Link
                to="/leaderboard"
                className="group w-full sm:w-auto bg-gradient-to-r from-white to-gray-200 text-black font-bold px-8 py-4 rounded-full transition-transform duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
              >
                <span>Check Leaderboard</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                to="/housecup-rules"
                className="group w-full sm:w-auto bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center hover:bg-white hover:text-black"
              >
                <span>Read the Full Rules</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
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
      <InstagramSection />
      <div className="max-w-6xl mx-auto space-y-24 px-4 sm:px-6 py-16">
        <WelcomeSection />
        <HousesSection />
        <FeaturesSection />
        <FoundingPrincipleSection />
      </div>
    </section>
  );
}

function InstagramSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  const avatarGradients = [
    "bg-gradient-to-br from-pink-400 to-purple-300",
    "bg-gradient-to-br from-pink-500 to-purple-400",
    "bg-gradient-to-br from-pink-600 to-purple-500"
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16"
    >
      <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-1 rounded-2xl shadow-[0_20px_50px_rgba(131,56,236,0.5)]">
        <div className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-6 max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
                  Follow Our Wild Journey
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4"></div>
                <p className="text-base md:text-lg leading-relaxed text-gray-300">
                  Feast on behind-the-scenes stunts, impromptu "Buffaloed" fails, and the occasional "public nudity" competition.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-1"
              >
                <div className="flex -space-x-2">
                  {avatarGradients.map((gradient, index) => (
                    <div key={index} className={`w-8 h-8 rounded-full border-2 border-purple-600 ${gradient}`}></div>
                  ))}
                </div>
                <span className="ml-4 text-gray-400 text-sm">34+ followers</span>
              </motion.div>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                href="https://www.instagram.com/house_cup_erasmus/"
                className="group inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-[0_5px_20px_rgba(219,39,119,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@house_cup_erasmus</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -5 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 30, rotate: -5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-transparent rounded-3xl blur-xl opacity-40 transform rotate-3"></div>
              <div className="relative bg-transparent p-2 rounded-3xl transform hover:rotate-3 transition-transform duration-500">
                <img
                  src="/assets/logos/house-cup-logo.png"
                  alt="Instagram Preview"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WelcomeSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-900 opacity-10 rounded-3xl blur-2xl transform -rotate-1"></div>
      <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] p-8 sm:p-10 rounded-3xl border border-purple-900/30 shadow-2xl backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
            Welcome to the Madness!
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg leading-relaxed mb-8 text-gray-200"
        >
          Each Erasmus warrior is sorted into one of four Houses. Every weekly event (and random 
          <em className="text-purple-300"> Gambit</em>) can skyrocket your points or plunge your House into comedic peril.
          Watch out for <strong className="text-pink-300">Constructive Feedback</strong> because that's <strong className="text-pink-300">Treason</strong>.
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl font-semibold mb-4 text-purple-200"
        >
          Key Points:
        </motion.h3>
        <motion.ul
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="space-y-4 pl-4 mb-6"
        >
          <motion.li variants={staggerItemVariants} className="flex items-start">
            <span className="inline-block bg-purple-800 rounded-full p-1 mr-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <p className="text-base text-gray-300">
              No, it's not a cult <span className="text-gray-400">(section 2(3))</span>. We promise!
            </p>
          </motion.li>
          <motion.li variants={staggerItemVariants} className="flex items-start">
            <span className="inline-block bg-purple-800 rounded-full p-1 mr-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <p className="text-base text-gray-300">
              <em className="text-pink-300">Murder</em> is not punished <span className="text-gray-400">(section 17)</span>, but missing an event is a mortal sin that costs 50 points.
            </p>
          </motion.li>
          <motion.li variants={staggerItemVariants} className="flex items-start">
            <span className="inline-block bg-purple-800 rounded-full p-1 mr-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <p className="text-base text-gray-300">
              If your House flunks, you'll have one last chance to do a <em className="text-pink-300">Yardie</em> (beer-chug) or face <em className="text-pink-300">public hanging</em> <span className="text-gray-400">(section 18)</span>.
            </p>
          </motion.li>
          <motion.li variants={staggerItemVariants} className="flex items-start">
            <span className="inline-block bg-purple-800 rounded-full p-1 mr-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <p className="text-base text-gray-300">
              Public Nudity can net you 30 points. Ten or more in the buff at once is worth 1000. We're not joking <span className="text-gray-400">(section 16)</span>.
            </p>
          </motion.li>
        </motion.ul>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-base leading-relaxed text-gray-300 p-4 bg-black/30 border border-purple-900/20 rounded-xl">
            Sound insane enough? Peek at the <Link to="/housecup-rules" className="font-bold text-purple-300 underline hover:text-pink-300 transition-colors">Full Rules</Link> to discover how getting "Buffaloed" can drain your points and "Constructive Feedback" can get you executed.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function HousesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const houses = [
    {
      name: "Brew Crew",
      colors: "Gold & Green",
      animal: "Alligator",
      motto: "Veni, Vidi, Bibi.",
      caption: "(We came, we saw, we drank.)",
      captain: "Viky",
      logo: "/assets/logos/brew-crew-logo.png",
      gradient: "from-[#d4af37] to-[#228B22]",
      delay: 0.1
    },
    {
      name: "The Hoo",
      colors: "Purple & Yellow",
      animal: "Owl",
      motto: "Sharp minds sharper claws.",
      caption: "",
      captain: "Alex",
      logo: "/assets/logos/house-hoo-logo.png",
      gradient: "from-[#5e2e9a] to-[#ffdb00]",
      delay: 0.2
    },
    {
      name: "Red Storm",
      colors: "Red & Black",
      animal: "Tiger",
      motto: "Roar like a Tiger, chill like a Panda.",
      caption: "",
      captain: "Elise",
      logo: "/assets/logos/house-tiger-logo.png",
      gradient: "from-[#000000] to-[#ff0000]",
      delay: 0.3
    },
    {
      name: "Deep Jungle",
      colors: "Deep Green & Mustard",
      animal: "Raccoon",
      motto: "Think first, then slay.",
      caption: "",
      captain: "Marco",
      logo: "/assets/logos/deep-jungle-logo.png",
      gradient: "from-[#0a3618] to-[#d49a13]",
      delay: 0.4
    }
  ];
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative z-10"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
          Meet The Four Houses
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto mb-6"></div>
        <p className="text-base sm:text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed">
          Our Founders sorted themselves via 16Personalities Test (section 3).
          Now, you do it on-site. If you skip events, your House suffers (section 5).
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {houses.map((house) => (
          <motion.div
            key={house.name}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: house.delay }}
            className="group h-full relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${house.gradient} opacity-20 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-700 -rotate-2`}></div>
            <div className="relative h-full bg-[#1c1c1c] rounded-2xl p-8 border border-white/10 backdrop-blur-md overflow-hidden transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-20 rounded-bl-full"></div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-br drop-shadow-lg">
                    <span className={`bg-gradient-to-r ${house.gradient}`} style={{ WebkitBackgroundClip: 'text' }}>
                      {house.name}
                    </span>
                  </h3>
                  <div className={`h-1 w-16 bg-gradient-to-r ${house.gradient} rounded-full mb-4`}></div>
                </div>
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${house.gradient} opacity-30 rounded-full blur-md transform group-hover:scale-110 transition-all duration-500`}></div>
                  <motion.img
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    src={house.logo}
                    alt={`${house.name} Logo`}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                </div>
              </div>
              <div className="relative z-10 mt-6">
                <ul className="space-y-2.5">
                  <li className="flex items-center text-gray-200">
                    <div className="w-8 text-gray-400"><strong>⬤⬤</strong></div>
                    <span><strong>Colors:</strong> {house.colors}</span>
                  </li>
                  <li className="flex items-center text-gray-200">
                    <div className="w-8 text-gray-400"><strong>⮑</strong></div>
                    <span><strong>Animal:</strong> {house.animal}</span>
                  </li>
                  <li className="flex items-center text-gray-200">
                    <div className="w-8 text-gray-400"><strong>❝</strong></div>
                    <div>
                      <strong>Motto:</strong> "{house.motto}" 
                      {house.caption && <span className="text-gray-400 text-sm block mt-0.5">{house.caption}</span>}
                    </div>
                  </li>
                  <li className="flex items-center text-gray-200">
                    <div className="w-8 text-gray-400"><strong>★</strong></div>
                    <span><strong>Captain:</strong> {house.captain}</span>
                  </li>
                </ul>
              </div>
              <div className={`absolute bottom-0 right-0 h-40 w-40 bg-gradient-to-tl ${house.gradient} opacity-10 rounded-tl-full transform translate-y-1/4 translate-x-1/4 group-hover:scale-125 transition-all duration-700`}></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FeaturesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const features = [
    {
      title: "Mandatory Weekly House Events",
      description: "Miss one, lose 50 points.",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      delay: 0.1
    },
    {
      title: "Gambits & Super Gambits",
      description: "Score extra points, or get penalized if you cheat thrice before midnight.",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      delay: 0.2
    },
    {
      title: "Team Pride",
      description: "Earn bonus points by wearing House colors or screaming louder than the other Houses.",
      icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
      delay: 0.3
    },
    {
      title: "Armistices",
      description: "Make alliances with 2 or 3 Houses to share points, but not with all 4 (that's suspicious).",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      delay: 0.4
    },
    {
      title: "Public Nudity Quests",
      description: "30 points each, 1000 for a big group. Bring sunscreen?",
      icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9",
      delay: 0.5
    }
  ];
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-pink-800 opacity-10 rounded-3xl blur-2xl transform rotate-2"></div>
      <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] p-8 sm:p-10 rounded-3xl border border-purple-900/30 shadow-2xl backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
            Key Features & Events
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="flex p-5 rounded-2xl bg-black/30 backdrop-blur-sm border border-purple-900/20 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_5px_15px_rgba(147,51,234,0.1)] group"
            >
              <div className="mr-4 p-3 rounded-xl bg-gradient-to-br from-pink-600/20 to-purple-700/20 border border-pink-700/20 text-pink-400 group-hover:text-pink-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-gray-100">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FoundingPrincipleSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-800 opacity-10 rounded-3xl blur-2xl transform -rotate-2"></div>
      <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#2a2a2a] p-8 sm:p-10 rounded-3xl border border-indigo-900/30 shadow-2xl backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
            The Founding Principle
          </h2>
        </motion.div>
        <div className="relative">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-800/10 rounded-full blur-3xl"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 bg-black/30 p-6 rounded-2xl border border-indigo-900/20 mb-6"
          >
            <p className="text-base sm:text-lg leading-relaxed text-gray-200">
              On the sacred night of the <strong className="text-indigo-300">Strawberry Moon</strong>, whichever House sits 
              atop the leaderboard seizes the <strong className="text-indigo-300">House Pokal</strong>. Everyone else has a 
              week to conquer a <em className="text-purple-300">Yardie</em> (a yard of beer) or accept comedic doom.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10"
          >
            <p className="text-base sm:text-lg leading-relaxed text-gray-300">
              Yes, there's no penalty for murder—but skip an event or commit Treason, 
              and you'll learn the real meaning of "house loyalty." Good luck.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}