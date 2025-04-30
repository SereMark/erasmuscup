import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import HeroSection from '../components/landing/HeroSection';
import WelcomeSection from '../components/landing/WelcomeSection';
import HousesSection from '../components/landing/HousesSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PrincipleSection from '../components/landing/PrincipleSection';
import InstagramSection from '../components/landing/InstagramSection';
import landingData from '../data/landingData.json';

/**
 * Website landing page
 * 
 * Renders the main sections of the homepage including:
 * - Hero banner
 * - Welcome/intro
 * - Houses showcase
 * - Features
 * - Core principles
 * - Social media integration
 */
const LandingPage = () => {
  // Preload critical images when the landing page mounts
  useEffect(() => {
    const preloadImages = [
      '/assets/logos/house-cup-logo.png',
      '/assets/houses/house-thehoo.png',
      '/assets/houses/house-brewcrew.png',
      '/assets/houses/house-redstorm.png',
      '/assets/houses/house-deepjungle.png'
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Page transition animation
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <>
      <Helmet>
        <title>Erasmus House Cup 2025 | Join the Competition</title>
        <meta 
          name="description" 
          content="Join the Erasmus House Cup 2025 competition. Get sorted into a house, earn points, and compete in weekly events. Definitely not a cult."
        />
        <link rel="canonical" href="https://erasmushousecup.com/" />
        <meta property="og:title" content="Erasmus House Cup 2025 | Join the Competition" />
        <meta property="og:type" content="website" />
      </Helmet>

      <motion.div 
        className="landing-page"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
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
      </motion.div>
    </>
  );
};

export default LandingPage;