import React, { useEffect } from "react"
import landingData from "../data/landingData.json"
import HeroSection from "../components/landing/HeroSection"
import WelcomeSection from "../components/landing/WelcomeSection"
import HousesSection from "../components/landing/HousesSection"
import FeaturesSection from "../components/landing/FeaturesSection"
import PrincipleSection from "../components/landing/PrincipleSection"
import InstagramSection from "../components/landing/InstagramSection"

export default function LandingPage() {
  useEffect(() => {
    document.title = "House Cup 2025 | Home"
    
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    window.addEventListener('resize', setVh);
    
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, [])

  return (
    <div className="min-h-screen bg-dark-950">
      <HeroSection data={landingData.heroSection} />
      <WelcomeSection data={landingData.welcomeSection} />
      <HousesSection data={landingData.housesSection} />
      <FeaturesSection data={landingData.featuresSection} />
      <PrincipleSection data={landingData.principleSection} />
      <InstagramSection data={landingData.instagramSection} />
    </div>
  )
}