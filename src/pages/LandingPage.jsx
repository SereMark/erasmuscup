import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <section className="p-4 sm:p-6">
      {/* HERO SECTION */}
      <div className="relative w-full h-[70vh] overflow-hidden rounded-xl shadow-xl mb-10">
        {/* Background Image */}
        <img
          src="/assets/logos/house-cup-logo.png"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end opacity-90" />

        {/* Hero Content */}
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
              A friendly, house-based contest among Erasmus students –
              <em> governed by the House Cup Rules 2025.</em>
            </p>

            {/* Call To Action */}
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

      {/* INSTAGRAM SECTION */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-10 bg-gradient-to-r from-pink-500 to-purple-600 p-8 rounded-xl shadow-xl flex flex-col sm:flex-row items-center sm:justify-between text-white"
      >
        <div className="mb-6 sm:mb-0 space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Follow Us on Instagram</h2>
          <p className="text-sm sm:text-base max-w-md leading-relaxed">
            See live event updates, house rivalries, and behind-the-scenes stories.
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
        {/* INTRO & DISCLAIMER */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a] p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-md text-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Welcome!</h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            The House Cup is an entertaining competition of four Houses formed via the
            <strong> 16Personalities Test</strong>. It’s absolutely not a cult — just a way
            to gather, have fun, and earn (or lose) points for your House.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-gray-200">
            How it works in a nutshell:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-gray-200 text-sm sm:text-base mb-4">
            <li>Join your assigned House after the personality quiz.</li>
            <li>Attend weekly events or spontaneous challenges to earn House Points.</li>
            <li>Avoid losing points by skipping events or committing “House Crimes.”</li>
            <li>By the <strong>Strawberry Moon</strong>, the highest-scoring House takes the <em>House Pokal</em>. Others must do a <em>Yardie</em> or face comedic doom.</li>
          </ul>
          <p className="text-sm sm:text-base leading-relaxed text-gray-200">
            Want detailed legalese (featuring yard-glass beer stunts and odd rules)? 
            <strong> Read the Full Rules</strong> to see it all.
          </p>
        </motion.div>

        {/* THE FOUR HOUSES */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-100">Meet The Four Houses</h2>
          <p className="text-sm sm:text-base mb-6 text-gray-100 leading-relaxed">
            Each House has a unique style and anthem. You don’t pick the House—
            <strong> the test picks it for you</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brew Crew */}
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
                <li><strong>Motto:</strong> “Veni, Vidi, Bibi.”</li>
                <li><strong>Captain:</strong> Viky</li>
              </ul>
            </div>

            {/* House Hoo */}
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
                <li><strong>Motto:</strong> “Mentes acutæ, unguibus acutioribus.”</li>
                <li><strong>Captain:</strong> Alex</li>
              </ul>
            </div>

            {/* House Tiger */}
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
                <strong>Info:</strong> Currently “finding itself.”
              </p>
            </div>

            {/* Deep Jungle */}
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

        {/* KEY FEATURES & EVENTS */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a] p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-md text-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Key Points & Events</h2>
          <ul className="list-disc list-inside space-y-2 pl-2 text-gray-200 text-sm sm:text-base leading-relaxed">
            <li>
              <strong>Weekly House Events:</strong> Earn points (1st to 4th place). Missing an event costs your House points.
            </li>
            <li>
              <strong>Gambits & Super Gambits:</strong> Smaller, or supersized, side-challenges to gather bonus points.
            </li>
            <li>
              <strong>Team Pride:</strong> Show up in House colors, represent in style, and rake in extra points.
            </li>
            <li>
              <strong>House Roles:</strong> Captains organize, Bursars track points, and Judges settle disputes.
            </li>
          </ul>
        </motion.div>

        {/* THE FOUNDING PRINCIPLE */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a] p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-md text-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">The Founding Principle</h2>
          <p className="text-sm sm:text-base leading-relaxed">
            When the <strong>Strawberry Moon</strong> arrives, the House with the highest points
            claims the <strong>House Pokal</strong>. The others must do a <em>Yardie</em> (chug a yard glass)
            within one week to dodge… comedic “doom.”
          </p>
          <p className="text-sm sm:text-base mt-4 leading-relaxed">
            It’s all in good fun—no real violence is condoned. May the best (or quirkiest) House win!
          </p>
        </motion.div>
      </div>
    </section>
  )
}