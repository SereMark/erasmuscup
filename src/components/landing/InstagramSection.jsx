import React from 'react';
import { motion } from 'framer-motion';

const InstagramSection = ({ data }) => {
  const { title, description, username, profileLink, postCount, followerCount, followingCount, logoImage } = data;
  
  return (
    <section className="bg-dark-900 py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-brand-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-accent-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">{title}</h2>
            <p className="text-dark-200 max-w-2xl mx-auto text-sm md:text-base">{description}</p>
            <div className="h-1 w-12 md:w-16 bg-brand-500 mx-auto mt-4 md:mt-6 rounded-full"></div>
          </motion.div>
          
          {/* Instagram Profile Card */}
          <motion.div
            className="glass-card rounded-xl overflow-hidden mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-brand-500 via-accent-400 to-brand-400 h-16 md:h-24 relative">
              {/* Floating Profile Image */}
              <div className="absolute -bottom-10 md:-bottom-12 left-1/2 transform -translate-x-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-dark-900 overflow-hidden">
                <img
                  src={logoImage}
                  alt="Instagram Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="pt-12 md:pt-16 px-4 md:px-6 pb-6 text-center">
              <h3 className="text-white font-bold text-lg md:text-xl mb-1">{username}</h3>
              <p className="text-dark-300 text-xs md:text-sm mb-4 md:mb-6">
                Official Instagram account of the Erasmus House Cup 2025
              </p>
              
              {/* Stats */}
              <div className="flex justify-center space-x-6 md:space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-white font-bold text-lg md:text-xl">{postCount}</div>
                  <div className="text-dark-300 text-xs md:text-sm">posts</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-lg md:text-xl">{followerCount}</div>
                  <div className="text-dark-300 text-xs md:text-sm">followers</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-lg md:text-xl">{followingCount}</div>
                  <div className="text-dark-300 text-xs md:text-sm">following</div>
                </div>
              </div>
              
              {/* Follow Button */}
              <motion.a 
                href={profileLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-brand-500 text-white font-medium rounded-lg px-4 md:px-6 py-2 md:py-2.5 transition-colors hover:bg-brand-600 text-sm md:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Follow on Instagram
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;