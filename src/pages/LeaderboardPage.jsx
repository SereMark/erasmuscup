import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const houseColorClasses = {
  purple: "from-purple-600 to-indigo-800",
  green: "from-green-600 to-emerald-800",
  red: "from-red-600 to-rose-800",
  emerald: "from-emerald-600 to-teal-800"
};

export default function LeaderboardPage() {
  const [viewMode, setViewMode] = useState("cards");
  const [isMobile, setIsMobile] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setViewMode("cards");
      }
    };
    
    checkIfMobile();
    
    window.addEventListener("resize", checkIfMobile);
    
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const houses = [
    { key: "theHoo", label: "The Hoo", color: "purple", logo: "/assets/logos/house-hoo-logo.png" },
    { key: "brewCrew", label: "Brew Crew", color: "green", logo: "/assets/logos/brew-crew-logo.png" },
    { key: "redStorm", label: "Red Storm", color: "red", logo: "/assets/logos/house-tiger-logo.png" },
    { key: "deepJungle", label: "Deep Jungle", color: "emerald", logo: "/assets/logos/deep-jungle-logo.png" }
  ];

  const scoreboardData = [
    { id: 1, date: "21.03.2025", event: "Jackbox", theHoo: 50, brewCrew: 75, redStorm: 25, deepJungle: 100 },
    { id: 2, date: "28.03.2025", event: "Petanque", theHoo: 27, brewCrew: 76, redStorm: 55, deepJungle: 102 },
    { id: 3, adjustment: "Public Nudity", theHoo: 30, brewCrew: null, redStorm: 30, deepJungle: null },
    { id: 4, adjustment: "Buffaloes", theHoo: null, brewCrew: null, redStorm: null, deepJungle: -20 },
    { id: 5, total: true, event: "Total", theHoo: 107, brewCrew: 151, redStorm: 110, deepJungle: 182 }
  ];

  const totalRow = scoreboardData.find(row => row.total);
  const houseTotals = houses.map(h => ({ ...h, points: totalRow[h.key] }));
  const sortedHouseTotals = [...houseTotals].sort((a, b) => b.points - a.points);
  const rankMapping = {};
  sortedHouseTotals.forEach((house, index) => {
    rankMapping[house.key] = index + 1;
  });

  const getColumnStyle = (key) => {
    const rank = rankMapping[key];
    if (rank === 1) return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black";
    if (rank === 2) return "bg-gradient-to-r from-gray-400 to-gray-500 text-black";
    if (rank === 3) return "bg-gradient-to-r from-[#CD7F32] to-[#A97142] text-black";
    return "bg-gray-800 text-white";
  };

  const getMedalEmoji = (rank) => {
    if (rank === 1) return "🏆";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🏅";
  };

  const getHouseColorClass = (key) => {
    const house = houses.find(h => h.key === key);
    return house ? houseColorClasses[house.color] || "from-gray-600 to-gray-800" : "";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <section className="min-h-screen bg-[#121212] text-white pb-12 overflow-hidden">
      <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="/assets/logos/house-cup-cover.png"
            alt="Leaderboard background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gradient-start via-[#2a0e57] to-brand-gradient-end opacity-85" />
        </motion.div>
        <div className="relative w-full h-full flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-4 sm:px-6 max-w-3xl text-center backdrop-blur-sm bg-black/20 p-6 sm:p-8 rounded-2xl border border-white/10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-lg">
              Who Rules Them All?
            </h1>
            <p className="text-sm sm:text-base md:text-xl font-light text-gray-200 leading-relaxed">
              <span className="block mb-2">
                The scoreboard refreshes live with every event, Buffalo call, and stealthy Nudity Challenge.
              </span>
              <span className="block">
                Will your House reign supreme, or end up yard-chugging your way to freedom?
              </span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 sm:px-6 max-w-6xl mx-auto -mt-10 sm:-mt-16 mb-10 sm:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
        >
          {sortedHouseTotals.slice(0, 3).map((house, index) => {
            const rank = index + 1;
            const podiumHeight = rank === 1 ? "h-48 sm:h-64" : rank === 2 ? "h-40 sm:h-56" : "h-32 sm:h-48";
            const delay = rank === 1 ? 0.6 : rank === 2 ? 0.4 : 0.8;
            const mobileOrder = isMobile ? (rank === 1 ? "order-first" : "") : "";
            const desktopOrder = rank === 1 ? "sm:order-2" : rank === 2 ? "sm:order-1" : "sm:order-3";
            return (
              <motion.div
                key={house.key}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay }}
                className={`relative ${mobileOrder} ${desktopOrder}`}
              >
                <div className={`bg-gradient-to-br ${getHouseColorClass(house.key)} p-1 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.4)]`}>
                  <div className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
                      className="absolute -top-8 sm:-top-10 text-3xl sm:text-4xl"
                    >
                      {getMedalEmoji(rank)}
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-1 shadow-lg"
                    >
                      <img 
                        src={house.logo} 
                        alt={`${house.label} logo`}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{house.label}</h3>
                    <div className="text-3xl sm:text-4xl font-black mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                      {house.points}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 font-semibold">Rank #{rank}</div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{ duration: 0.7, delay: delay + 0.3 }}
                      className={`w-full mt-3 sm:mt-4 bg-gradient-to-t ${getHouseColorClass(house.key)} rounded-lg opacity-20`}
                      style={{ height: podiumHeight }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-0 text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
          >
            Scoreboard Details
          </motion.h2>
          
          {!isMobile && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
              }}
              className="bg-[#2a2a2a] backdrop-blur-sm rounded-full p-1.5 flex items-center"
            >
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  viewMode === "table" 
                    ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  viewMode === "cards" 
                    ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Card View
              </button>
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === "table" && !isMobile && (
            <motion.div
              key="table-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="bg-[#2a2a2a]/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-[#3a3a3a]/90 text-gray-100">
                      <tr>
                        <th className="px-6 py-5 text-left text-sm font-medium tracking-wider">Date</th>
                        <th className="px-6 py-5 text-left text-sm font-medium tracking-wider">Event / Adjustment</th>
                        {sortedHouseTotals.map(house => (
                          <th
                            key={house.key}
                            className={`px-6 py-5 text-center text-sm font-medium tracking-wider ${getColumnStyle(house.key)}`}
                          >
                            <div className="flex flex-col items-center">
                              <span className="mb-1.5">{house.label}</span>
                              <div className="w-8 h-8 bg-black/30 rounded-full p-0.5 flex items-center justify-center">
                                <img 
                                  src={house.logo} 
                                  alt={`${house.label} logo`}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {scoreboardData.map((row, index) => {
                        const dateDisplay = row.date ? row.date : row.adjustment ? "Adjustment" : "";
                        const eventDisplay = row.event || row.adjustment;
                        const rowClasses = row.total
                          ? "font-bold border-t-4 border-t-purple-700/50 bg-[#2a2a2a]/80"
                          : "hover:bg-[#3a3a3a]/40 transition-all duration-300";
                        return (
                          <motion.tr
                            key={row.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.07 }}
                            className={rowClasses}
                          >
                            <td className="px-6 py-5 text-left text-sm whitespace-nowrap">
                              {dateDisplay && (
                                <span className="font-mono bg-gray-800/70 px-3 py-1 rounded-md text-gray-300">
                                  {dateDisplay}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-5 text-left text-base font-medium">
                              {row.adjustment && !row.total && (
                                <span className="inline-block bg-purple-900/30 text-purple-300 text-xs px-2 py-0.5 rounded-md mr-2">
                                  ADJUSTMENT
                                </span>
                              )}
                              {eventDisplay}
                            </td>
                            {sortedHouseTotals.map(house => {
                              const value = row[house.key];
                              const isPositive = value > 0;
                              const isNegative = value < 0;
                              return (
                                <td
                                  key={house.key}
                                  className={`px-6 py-5 text-center ${getColumnStyle(house.key)}`}
                                >
                                  {value !== null && value !== undefined ? (
                                    <motion.div
                                      initial={{ scale: 0.8 }}
                                      whileInView={{ scale: 1 }}
                                      viewport={{ once: true }}
                                      className={`font-bold text-base ${
                                        row.total ? "text-2xl" : isPositive ? "text-green-400" : isNegative ? "text-red-400" : ""
                                      }`}
                                    >
                                      {isPositive && !row.total && "+"}
                                      {value}
                                    </motion.div>
                                  ) : (
                                    <span className="text-gray-500">-</span>
                                  )}
                                </td>
                              );
                            })}
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {(viewMode === "cards" || isMobile) && (
            <motion.div
              key="card-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              {scoreboardData.map((row, index) => {
                const dateDisplay = row.date ? row.date : row.adjustment ? "Adjustment" : "";
                const eventDisplay = row.event || row.adjustment;
                const sortedRowHouses = [...houses].sort((a, b) => {
                  if (row.adjustment === "Buffaloes") {
                    const aVal = row[a.key] != null ? row[a.key] : 0;
                    const bVal = row[b.key] != null ? row[b.key] : 0;
                    return bVal - aVal;
                  } else {
                    const aVal = row[a.key] != null ? row[a.key] : -Infinity;
                    const bVal = row[b.key] != null ? row[b.key] : -Infinity;
                    return bVal - aVal;
                  }
                });
                
                const rowRankMapping = {};
                sortedRowHouses.forEach((house, idx) => {
                  rowRankMapping[house.key] = idx + 1;
                });
                
                const getRowColumnStyle = (key) => {
                  const rank = rowRankMapping[key];
                  if (rank === 1) return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black";
                  if (rank === 2) return "bg-gradient-to-r from-gray-400 to-gray-500 text-black";
                  if (rank === 3) return "bg-gradient-to-r from-[#CD7F32] to-[#A97142] text-black";
                  return "bg-gray-800 text-white";
                };
                
                const cardBgClass = row.total 
                  ? "bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/30" 
                  : "bg-[#2a2a2a]/70 border border-gray-800/70";
                
                return (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                    className={`p-4 sm:p-6 rounded-xl shadow-xl backdrop-blur-md ${cardBgClass}`}
                  >
                    <div className="mb-3 sm:mb-4 flex justify-between items-start">
                      <div>
                        {row.adjustment && !row.total && (
                          <span className="inline-block bg-purple-900/30 text-purple-300 text-xs px-2 py-0.5 rounded-md mb-1 sm:mb-2">
                            ADJUSTMENT
                          </span>
                        )}
                        <h3 className={`text-lg sm:text-xl ${row.total ? "text-xl sm:text-2xl font-bold text-purple-200" : "font-medium text-white"}`}>
                          {eventDisplay}
                        </h3>
                        {dateDisplay && (
                          <p className="text-xs sm:text-sm text-gray-400 font-mono mt-1">{dateDisplay}</p>
                        )}
                      </div>
                      {row.total && (
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center bg-purple-600 ${
                                i === 0 ? "z-30" : i === 1 ? "z-20" : "z-10"
                              }`}
                            >
                              <span className="text-xs">🏆</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
                      {sortedRowHouses.map(house => {
                        const value = row[house.key];
                        const isPositive = value > 0;
                        const isNegative = value < 0;
                        const valueColor = row.total ? "" : isPositive ? "text-green-400" : isNegative ? "text-red-400" : "";
                        return (
                          <div 
                            key={house.key} 
                            className={`flex items-center p-2 sm:p-3 rounded-lg ${
                              value != null ? getRowColumnStyle(house.key) : "bg-gray-800/50"
                            }`}
                          >
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/30 rounded-full p-0.5 mr-2 sm:mr-3 flex-shrink-0">
                              <img 
                                src={house.logo} 
                                alt={`${house.label} logo`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex justify-between items-center w-full">
                              <span className="text-xs sm:text-sm">{house.label}</span>
                              <span className={`font-bold text-base sm:text-lg ${valueColor} ml-2`}>
                                {value != null ? (
                                  <>
                                    {isPositive && !row.total && "+"}
                                    {value}
                                  </>
                                ) : "-"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <p className="text-center text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto bg-black/30 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
            Think your House is unbeatable? Or too far behind to care?
            <br className="hidden sm:block" />
            Try a <em className="text-purple-300 font-semibold">Super Gambit</em> (sec. 12a) for that sweet multiplier, 
            or go for some <em className="text-pink-300 font-semibold">Public Nudity</em> (sec. 16) if your neighbors can handle it!
          </p>
        </motion.div>
      </div>
    </section>
  );
}