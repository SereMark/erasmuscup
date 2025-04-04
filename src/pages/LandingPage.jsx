import React from "react"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <section className="p-6">
      {/* Hero Section */}
      <div className="w-full h-[70vh] relative overflow-hidden rounded-xl shadow-xl">
        {/* Dark gradient hero */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end" />
        
        {/* Hero Content */}
        <div className="w-full h-full flex flex-col items-center justify-center text-center relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-6 max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white drop-shadow-lg">
              House Cup 2025
            </h1>
            <p className="text-lg md:text-xl font-light mb-4 text-gray-200">
              The (totally not cult-like) competition that unites four Houses, their Crimes,
              their yard glasses, and the unstoppable plague of public nudity 
              <em>—all regulated by the House Cup Rules 2025.</em>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto mt-10 space-y-14">

        {/* Overview */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a] p-8 rounded-xl shadow-lg backdrop-blur-md text-gray-100"
        >
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <p className="text-lg mb-4">
            Welcome to a House-based competition where:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-gray-200">
            <li>
              Each House was formed after the <strong>16Personalities Test</strong> 
              (see Section 3(b)(1-8)).
            </li>
            <li>
              House Events run <strong>weekly</strong>, awarding <strong>25 to 100 </strong> 
              points based on final ranking (Section 6).
            </li>
            <li>
              Missing an event or racking up “House Crimes” can cause brutal point deductions 
              (Sections 5 & 7).
            </li>
            <li>
              <strong>Public Nudity</strong> is “discouraged” but can net you 30 points 
              if documented (once per half-semester).
            </li>
          </ul>
          <p className="mt-4 text-gray-200">
            By the time the <em>Strawberry Moon</em> rises, whichever House stands atop 
            the leaderboard wins the <strong>House Pokal</strong>.  
            The rest risk a public hanging—unless saved by a heroic <em>Yardie</em> (Sec. 18).
          </p>
        </motion.div>

        {/* The Four Houses */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-100">The Four Houses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Brew Crew */}
            <div
              className="rounded-lg p-6 transition-all hover:shadow-2xl hover:-translate-y-1 text-gray-100 flex flex-col"
              style={{ background: "linear-gradient(to bottom right, #d4af37, #228B22)" }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold drop-shadow-lg">Brew Crew</h3>
                <img 
                  src="/assets/logos/brew-crew-logo.png" 
                  alt="Brew Crew Logo" 
                  className="w-16 h-16" 
                />
              </div>
              <ul className="space-y-1 text-sm mt-4">
                <li><strong>Colors:</strong> Gold with Green trim</li>
                <li><strong>Animal:</strong> The Alligator – cold-blooded, cold-beered</li>
                <li><strong>Anthem:</strong> National Anthem of USSR</li>
                <li><strong>Motto:</strong> “Veni, Vidi, Bibi – we came, we saw, we drank.”</li>
                <li>
                  <strong>Values:</strong> Communism, Beer, zero penalty for <em>Murder</em>
                </li>
                <li><strong>Captain:</strong> Viky</li>
              </ul>
            </div>

            {/* House Hoo */}
            <div
              className="rounded-lg p-6 transition-all hover:shadow-2xl hover:-translate-y-1 text-gray-100 flex flex-col"
              style={{ background: "linear-gradient(to bottom right, #5e2e9a, #ffdb00)" }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold drop-shadow-lg">House Hoo</h3>
                <img 
                  src="/assets/logos/house-hoo-logo.png" 
                  alt="House Hoo Logo" 
                  className="w-16 h-16" 
                />
              </div>
              <ul className="space-y-1 text-sm mt-4">
                <li><strong>Colors:</strong> Purple & Yellow</li>
                <li><strong>Animal:</strong> Owl</li>
                <li><strong>Anthem:</strong> “Who Are You” by The Who</li>
                <li>
                  <strong>Motto:</strong> “Mentes acutæ, unguibus acutioribus.”
                </li>
                <li>
                  <strong>Values:</strong> Ambition, Cleverness, Sage, Strategy
                </li>
                <li><strong>Captain:</strong> Alex</li>
                <li><strong>Bursar:</strong> Maria</li>
              </ul>
            </div>

            {/* House Tiger */}
            <div
              className="rounded-lg p-6 transition-all hover:shadow-2xl hover:-translate-y-1 text-gray-100 flex flex-col"
              style={{ background: "linear-gradient(to bottom right, #ff8300, #a83232)" }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold drop-shadow-lg">House Tiger</h3>
                <img 
                  src="/assets/logos/house-tiger-logo.png" 
                  alt="House Tiger Logo" 
                  className="w-16 h-16" 
                />
              </div>
              <p className="text-sm mt-4">
                <strong>Info:</strong> Not Available  
                <br />
                (16Personalities quiz stuck loading?)
              </p>
            </div>

            {/* Deep Jungle */}
            <div
              className="rounded-lg p-6 transition-all hover:shadow-2xl hover:-translate-y-1 text-gray-100 flex flex-col"
              style={{ background: "linear-gradient(to bottom right, #0a3618, #d49a13)" }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold drop-shadow-lg">Deep Jungle</h3>
                <img 
                  src="/assets/logos/deep-jungle-logo.png" 
                  alt="Deep Jungle Logo" 
                  className="w-16 h-16" 
                />
              </div>
              <ul className="space-y-1 text-sm mt-4">
                <li><strong>Colors:</strong> Deep Green & Mustard</li>
                <li><strong>Animal:</strong> Raccoon</li>
                <li><strong>Anthem:</strong> “Once upon a time in Africa”</li>
                <li>
                  <strong>Motto:</strong> “Smart lemurs, clever play. Think first, then slay.”
                </li>
                <li>
                  <strong>Values:</strong> Intelligence, Success, Diversity, Muscular
                </li>
                <li><strong>Captain:</strong> Marco</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a] p-8 rounded-xl shadow-lg backdrop-blur-md text-gray-100"
        >
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 pl-2 text-gray-200">
            <li>Track House Points in real-time—scoreboard for your life choices.</li>
            <li>
              Weekly & surprise events (<strong>House Events</strong>, <strong>Gambits</strong>) 
              awarding points if you don’t cheat.
            </li>
            <li>
              <strong>Super Gambits</strong> (Sec. 12a) multiply your points—and your risk 
              of humiliation.
            </li>
            <li>House Judges, Bursars, & Captains keep things “fair” (Sec. 19).</li>
          </ul>
        </motion.div>

        {/* Rules */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a] p-8 rounded-xl shadow-lg backdrop-blur-md text-gray-100"
        >
          <h2 className="text-3xl font-bold mb-4">Rules At A Glance</h2>
          <ul className="list-disc list-inside space-y-2 pl-2 text-gray-200">
            <li>Win points in events; lose them to House Crimes or Buffalo/How’s That fiascos.</li>
            <li>Treason is real—overthrowing event organisers is pretty dumb.</li>
            <li>
              Public Nudity: “discouraged,” but 30 points if documented 
              (once each half-semester).
            </li>
            <li>Murder? No penalty. (Section 17 says it all.)</li>
          </ul>
          <p className="mt-4 text-sm">
            <em>
              If you’re confused, blame “Constructive Feedback”—which ironically is Treason 
              (Section 10).
            </em>
          </p>
        </motion.div>

        {/* Founding Principle */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a] p-8 rounded-xl shadow-lg backdrop-blur-md text-gray-100"
        >
          <h2 className="text-3xl font-bold mb-4">Founding Principle</h2>
          <p>
            By the final tally on the Strawberry Moon, 
            either you <strong>win</strong> the House Cup or face 
            <em> public hanging</em>. You might save your neck with a 
            <strong> Yardie</strong> (Sec. 18). 
            Such is democracy in 2025!
          </p>
        </motion.div>
      </div>
    </section>
  )
}