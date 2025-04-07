import React from "react";
import { useScroll } from "framer-motion";
import HeroSection from "../components/sections/landing/HeroSection";
import WelcomeSection from "../components/sections/landing/WelcomeSection";
import HousesSection from "../components/sections/landing/HousesSection";
import FeaturesSection from "../components/sections/landing/FeaturesSection";
import FoundingPrincipleSection from "../components/sections/landing/FoundingPrincipleSection";
import InstagramSection from "../components/sections/landing/InstagramSection";

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