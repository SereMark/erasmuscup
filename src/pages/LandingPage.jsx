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
  }, [])

  return (
    <main className="min-h-dynamic-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 overflow-hidden">
      <HeroSection data={landingData.heroSection} />
      <WelcomeSection data={landingData.welcomeSection} />
      <HousesSection data={landingData.housesSection} />
      <FeaturesSection data={landingData.featuresSection} />
      <PrincipleSection data={landingData.principleSection} />
      <InstagramSection data={landingData.instagramSection} />
    </main>
  )
}