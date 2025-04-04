import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

export default function LandingPage() {
  const [showNextEvent, setShowNextEvent] = useState(true)

  return (
    <section className="p-4 sm:p-6">
      <div className="relative w-full h-[70vh] overflow-hidden rounded-xl shadow-xl mb-10">
        <img
          src="/assets/logos/house-cup-cover.png"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end opacity-90" />

        <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white drop-shadow-lg">
              House Cup 2025
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light mb-6 text-gray-200 leading-relaxed">
              Join us for a definitely-not-a-cult competition among eager Erasmus students,
              <em> lovingly guided by the House Cup Rules 2025.</em>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                to="/leaderboard"
                className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                Check the Leaderboard
              </Link>
              <Link
                to="/housecup-rules"
                className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                Read the Full Rules
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-10 bg-gradient-to-r from-pink-500 to-purple-600 p-8 rounded-xl shadow-xl flex flex-col sm:flex-row items-center sm:justify-between text-white"
      >
        <div className="mb-6 sm:mb-0 space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Follow Us on Instagram</h2>
          <p className="text-sm sm:text-base max-w-md leading-relaxed">
            Feast on behind-the-scenes stunts, impromptu “Buffaloed” fails, and the occasional “public nudity” competition.
          </p>
          <a
            href="https://www.instagram.com/house_cup_erasmus/"
            className="inline-block bg-white text-pink-600 font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Instagram
          </a>
        </div>

        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src="/assets/logos/house-cup-logo.png"
          alt="Instagram Logo"
          className="w-24 h-24 object-contain"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto space-y-14">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a] p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-md text-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Welcome!</h2>
          <p className="text-base sm:text-lg leading-relaxed mb-6">
            Each Erasmus warrior is sorted into one of four Houses. Every weekly event (and random 
            <em> Gambit</em>) can skyrocket your points or plunge your House into comedic peril.
            Watch out for <strong>Constructive Feedback</strong> because that’s <strong>Treason</strong>.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-200 mb-4">
            Key Points:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-gray-200 text-sm sm:text-base mb-4">
            <li>
              No, it’s not a cult (section 2(3)). We promise!
            </li>
            <li>
              <em>Murder</em> is not punished (section 17), but missing an event is a mortal sin 
              that costs 50 points.
            </li>
            <li>
              If your House flunks, you’ll have one last chance to do a <em>Yardie</em> (beer-chug) 
              or face <em>public hanging</em> (section 18).
            </li>
            <li>
              Public Nudity can net you 30 points. Ten or more in the buff at once is worth 1000. 
              We’re not joking (section 16).
            </li>
          </ul>
          <p className="text-sm sm:text-base leading-relaxed text-gray-200">
            Sound insane enough? Peek at the <strong>Full Rules</strong> to discover how getting 
            “Buffaloed” can drain your points and “Constructive Feedback” can get you executed.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-100">Meet The Four Houses</h2>
          <p className="text-sm sm:text-base mb-6 text-gray-100 leading-relaxed">
            Our Founders sorted themselves via 16Personalities Test (section 3).
            Now, you do it on-site. If you skip events, your House suffers (section 5).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="rounded-lg p-6 transition-all hover:shadow-2xl hover:-translate-y-1 text-gray-100 flex flex-col"
              style={{ background: "linear-gradient(to bottom right, #d4af37, #228B22)" }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl sm:text-2xl font-bold drop-shadow-lg">Brew Crew</h3>
                <img
                  src="/assets/logos/brew-crew-logo.png"
                  alt="Brew Crew Logo"
                  className="w-14 h-14 sm:w-16 sm:h-16"
                />
              </div>
              <ul className="space-y-1 text-sm mt-4 leading-relaxed">
                <li><strong>Colors:</strong> Gold & Green</li>
                <li><strong>Animal:</strong> Alligator</li>
                <li><strong>Motto:</strong> “Veni, Vidi, Bibi.” (We came, we saw, we drank.)</li>
                <li><strong>Captain:</strong> Viky</li>
              </ul>
            </div>

            <div
              className="rounded-lg p-6 transition-all hover:shadow-2xl hover:-translate-y-1 text-gray-100 flex flex-col"
              style={{ background: "linear-gradient(to bottom right, #5e2e9a, #ffdb00)" }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl sm:text-2xl font-bold drop-shadow-lg">House Hoo</h3>
                <img
                  src="/assets/logos/house-hoo-logo.png"
                  alt="House Hoo Logo"
                  className="w-14 h-14 sm:w-16 sm:h-16"
                />
              </div>
              <ul className="space-y-1 text-sm mt-4 leading-relaxed">
                <li><strong>Colors:</strong> Purple & Yellow</li>
                <li><strong>Animal:</strong> Owl</li>
                <li><strong>Motto:</strong> “Sharp minds sharper claws.”</li>
                <li><strong>Captain:</strong> Alex</li>
              </ul>
            </div>

            <div
              className="rounded-lg p-6 transition-all hover:shadow-2xl hover:-translate-y-1 text-gray-100 flex flex-col"
              style={{ background: "linear-gradient(to bottom right, #ff8300, #a83232)" }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl sm:text-2xl font-bold drop-shadow-lg">House Tiger</h3>
                <img
                  src="/assets/logos/not-available.png"
                  alt="House Tiger Logo"
                  className="w-14 h-14 sm:w-16 sm:h-16"
                />
              </div>
              <p className="text-sm mt-4 leading-relaxed">
                <strong>Colors:</strong> Orange & Crimson
                <br />
                <strong>Motto:</strong> “Roar like a Tiger, chill like a Panda.”
                <br />
                <strong>Captain:</strong> Elise
              </p>
            </div>

            <div
              className="rounded-lg p-6 transition-all hover:shadow-2xl hover:-translate-y-1 text-gray-100 flex flex-col"
              style={{ background: "linear-gradient(to bottom right, #0a3618, #d49a13)" }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl sm:text-2xl font-bold drop-shadow-lg">Deep Jungle</h3>
                <img
                  src="/assets/logos/deep-jungle-logo.png"
                  alt="Deep Jungle Logo"
                  className="w-14 h-14 sm:w-16 sm:h-16"
                />
              </div>
              <ul className="space-y-1 text-sm mt-4 leading-relaxed">
                <li><strong>Colors:</strong> Deep Green & Mustard</li>
                <li><strong>Animal:</strong> Raccoon</li>
                <li><strong>Motto:</strong> “Think first, then slay.”</li>
                <li><strong>Captain:</strong> Marco</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a] p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-md text-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Key Features & Events</h2>
          <ul className="list-disc list-inside space-y-2 pl-2 text-gray-200 text-sm sm:text-base leading-relaxed">
            <li>
              <strong>Mandatory Weekly House Events:</strong> Miss one, lose 50 points.
            </li>
            <li>
              <strong>Gambits & Super Gambits:</strong> Score extra points, or get penalized
              if you cheat thrice before midnight.
            </li>
            <li>
              <strong>Team Pride:</strong> Earn bonus points by wearing House colors 
              or screaming louder than the other Houses.
            </li>
            <li>
              <strong>Armistices:</strong> Make alliances with 2 or 3 Houses to share points, 
              but not with all 4 (that’s suspicious).
            </li>
            <li>
              <strong>Public Nudity Quests:</strong> 30 points each, 1000 for a big group. 
              Bring sunscreen?
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a] p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-md text-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">The Founding Principle</h2>
          <p className="text-sm sm:text-base leading-relaxed">
            On the sacred night of the <strong>Strawberry Moon</strong>, whichever House sits 
            atop the leaderboard seizes the <strong>House Pokal</strong>. Everyone else has a 
            week to conquer a <em>Yardie</em> (a yard of beer) or accept comedic doom.
          </p>
          <p className="text-sm sm:text-base mt-4 leading-relaxed">
            Yes, there’s no penalty for murder—but skip an event or commit Treason, 
            and you’ll learn the real meaning of “house loyalty.” Good luck.
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {showNextEvent && (
          <motion.div
            className="
              fixed bottom-6 right-6 
              w-[90%] sm:w-96 max-w-full
              bg-[#2a2a2a] text-white 
              rounded-xl shadow-xl p-4 z-50 
              flex flex-col gap-3
            "
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setShowNextEvent(false)}
              className="ml-auto text-gray-400 hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
            <h4 className="text-lg sm:text-xl font-bold text-center mb-2">
              Next Event
            </h4>
            <div className="flex items-center justify-center">
              <motion.img
                src="/assets/logos/next-event.png"
                alt="The Actual Cup Game Logo"
                className="w-24 h-auto object-contain rounded-md"
              />
            </div>
            <p className="text-base sm:text-lg font-semibold text-center mt-1">
              The Actual Cup Game
            </p>
            <p className="text-sm text-center">
              <strong>When:</strong> Saturday, 5 April @ 7:30 PM
              <br />
              <strong>Where:</strong> In A Common Room
            </p>
            <p className="text-xs text-gray-300 leading-snug text-center">
              Expect loud chants, minor humiliations, and hopefully no Buffalo fiascos.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}