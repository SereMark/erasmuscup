import React, { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

// Import constants
import { HOUSES } from "../constants/houseData";
import { SCOREBOARD_DATA, MOBILE_BREAKPOINT } from "../constants/scoreboardData";

// Import components
import HeroSection from "../components/leaderboard/HeroSection";
import PodiumSection from "../components/leaderboard/PodiumSection";
import ScoreboardSection from "../components/leaderboard/ScoreboardSection";

export default function LeaderboardPage() {
  const [viewMode, setViewMode] = useState("cards");
  const [isMobile, setIsMobile] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Handle responsive behavior
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode("cards");
      }
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Calculate rankings and sort houses
  const { sortedHouseTotals, rankMapping } = useMemo(() => {
    const totalRow = SCOREBOARD_DATA.find(row => row.total);
    const houseTotals = HOUSES.map(h => ({ ...h, points: totalRow[h.key] }));
    const sorted = [...houseTotals].sort((a, b) => b.points - a.points);
    
    const rankings = {};
    sorted.forEach((house, index) => {
      rankings[house.key] = index + 1;
    });
    
    return { sortedHouseTotals: sorted, rankMapping: rankings };
  }, []);

  return (
    <section className="min-h-screen bg-black text-white pb-12 overflow-hidden">
      <HeroSection />
      <PodiumSection sortedHouseTotals={sortedHouseTotals} isMobile={isMobile} />
      <ScoreboardSection 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        isMobile={isMobile} 
        sortedHouseTotals={sortedHouseTotals} 
        rankMapping={rankMapping}
        ref={ref}
        inView={inView}
      />
    </section>
  );
}