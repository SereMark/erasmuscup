import React from "react";
import { useScroll } from "framer-motion";
import HeroSection from "../components/landingPage/HeroSection";
import WelcomeSection from "../components/landingPage/WelcomeSection";
import HousesSection from "../components/landingPage/HousesSection";
import FeaturesSection from "../components/landingPage/FeaturesSection";
import FoundingPrincipleSection from "../components/landingPage/FoundingPrincipleSection";
import InstagramSection from "../components/landingPage/InstagramSection";

export default function LandingPage() {
  const { scrollY } = useScroll();
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero section with parallax effect */}
      <HeroSection y={scrollY} />
      
      {/* Content sections container */}
      <div className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="py-12 sm:py-16 space-y-10 sm:space-y-16">
          {/* Welcome section */}
          <WelcomeSection />
          
          {/* Houses section */}
          <HousesSection />
          
          {/* Features and Founding Principle in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <FeaturesSection />
            <FoundingPrincipleSection />
          </div>
          
          {/* Instagram section */}
          <InstagramSection />
        </div>
      </div>
    </div>
  );
}