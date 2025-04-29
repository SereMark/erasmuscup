import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/landing/HeroSection';
import WelcomeSection from '../components/landing/WelcomeSection';
import HousesSection from '../components/landing/HousesSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PrincipleSection from '../components/landing/PrincipleSection';
import InstagramSection from '../components/landing/InstagramSection';
import landingData from '../data/landingData.json';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Erasmus House Cup 2025 | Join the Competition</title>
        <meta 
          name="description" 
          content="Join the Erasmus House Cup 2025 competition. Get sorted into a house, earn points, and compete in weekly events. Definitely not a cult."
        />
      </Helmet>

      <div className="landing-page">
        {/* Hero Section */}
        <HeroSection data={landingData.heroSection} />

        {/* Welcome Section */}
        <WelcomeSection data={landingData.welcomeSection} />

        {/* Houses Section */}
        <HousesSection data={landingData.housesSection} />

        {/* Features Section */}
        <FeaturesSection data={landingData.featuresSection} />

        {/* Principle Section */}
        <PrincipleSection data={landingData.principleSection} />

        {/* Instagram Section */}
        <InstagramSection data={landingData.instagramSection} />
      </div>
    </>
  );
};

export default LandingPage;