import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { formatDate, getRelativeDate, isHappeningSoon } from '../../utils/dateUtils';

/**
 * Enhanced EventCard component for displaying event information
 * Supports both regular and featured styling with expandable details
 */
const EventCard = ({ event, featured = false }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const {
    title,
    date,
    location,
    category,
    excerpt,
    description,
    images,
    housePoints,
    organizers,
    schedule,
    details,
    cost,
    whatsappInfo,
    customStyles,
    ctaText
  } = event;

  // Check if event is happening soon (within 3 days)
  const happeningSoon = isHappeningSoon(date);
  
  // Get colors based on category
  const getCategoryColor = () => {
    switch (category) {
      case 'house-event': return 'brand';
      case 'gambit': return 'accent';
      case 'super-gambit': return 'success';
      case 'social': return 'info';
      default: return 'brand';
    }
  };
  
  const getCategoryLabel = () => {
    switch (category) {
      case 'house-event': return 'House Event';
      case 'gambit': return 'Gambit';
      case 'super-gambit': return 'Super Gambit';
      case 'social': return 'Social Event';
      default: return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  };
  
  // Allow custom style or fallback to category color
  // Extract just the color name (without the shade) from customStyles.accentColor
  const colorFromCustomStyles = customStyles?.accentColor ? customStyles.accentColor.split('-')[0] : null;
  const color = colorFromCustomStyles || getCategoryColor();
  
  // Explicitly map color to button classes to avoid dynamic class issues
  const getButtonClasses = () => {
    const baseClasses = "btn text-white px-5 py-2.5 rounded-lg flex-grow text-center font-medium transition-all hover:-translate-y-0.5 shadow-sm";
    
    switch (color) {
      case 'brand':
        return `${baseClasses} bg-brand-600 hover:bg-brand-700 hover:shadow-brand-900/20`;
      case 'accent':
        return `${baseClasses} bg-accent-600 hover:bg-accent-700 hover:shadow-accent-900/20`;
      case 'success':
        return `${baseClasses} bg-success-600 hover:bg-success-700 hover:shadow-success-900/20`;
      case 'info':
        return `${baseClasses} bg-info-600 hover:bg-info-700 hover:shadow-info-900/20`;
      default:
        return `${baseClasses} bg-brand-600 hover:bg-brand-700 hover:shadow-brand-900/20`;
    }
  };
  
  // Image to use with fallback
  const imageUrl = images?.banner || images?.thumbnail || '/assets/logos/not-available.png';
  
  // Format time from date if available
  const getEventTime = () => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Animation variants
  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.25 }
    }
  };
  
  // Handle action
  const handleJoinClick = () => {
    alert(`To participate: ${whatsappInfo || "Check the House Cup WhatsApp group!"}`);
  };
  
  return (
    <motion.div 
      className={`bg-dark-900/90 border border-dark-800/80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-${color}-500/40 ${featured ? 'lg:grid lg:grid-cols-12' : ''}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
    >
      {/* Image Section */}
      <div className={`relative ${featured ? 'h-64 sm:h-72 lg:h-auto lg:col-span-5' : 'h-60'}`}>
        {/* Category badge */}
        <div className="absolute top-0 left-0 z-10 m-4">
          <div className={`px-3 py-1 text-sm font-medium rounded-lg bg-${color}-900/90 text-${color}-300 border border-${color}-700/40 shadow-sm backdrop-blur-sm`}>
            {getCategoryLabel()}
          </div>
        </div>
        
        {/* Happening Soon badge */}
        {happeningSoon && (
          <div className="absolute top-0 right-0 z-10 m-4">
            <div className="px-3 py-1 text-sm font-medium rounded-lg bg-accent-500 text-white animate-pulse-slow shadow-sm">
              Happening Soon!
            </div>
          </div>
        )}
        
        {/* Points badge */}
        {housePoints > 0 && (
          <div className="absolute bottom-0 left-0 z-10 m-4">
            <div className={`px-3 py-1 text-sm font-medium rounded-lg bg-dark-900/90 text-${color}-400 shadow-sm backdrop-blur-sm border border-${color}-700/20`}>
              {housePoints} House Points
            </div>
          </div>
        )}
        
        {/* Image */}
        <div className="w-full h-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent"></div>
      </div>
      
      {/* Content Section */}
      <div className={`p-6 sm:p-8 flex flex-col ${featured ? 'lg:col-span-7' : ''}`}>
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
          {title}
        </h3>
        
        {/* Date and location */}
        <div className="space-y-3 mb-5">
          <div className="flex items-start text-dark-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 mr-3 mt-0.5 text-${color}-500 flex-shrink-0`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <div className="text-sm sm:text-base">{formatDate(date)}</div>
              <div>
                <span className="text-sm text-dark-300">{getEventTime()}</span>
                <span className="ml-2 text-sm text-dark-400">({getRelativeDate(date)})</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-dark-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 mr-3 text-${color}-500 flex-shrink-0`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm sm:text-base">{location.name}</span>
          </div>
          
          <div className="flex items-center text-dark-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 mr-3 text-${color}-500 flex-shrink-0`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm sm:text-base">
              Organized by {organizers.map(org => org.name).join(', ')}
            </span>
          </div>
        </div>
        
        {/* Description and Cost */}
        <div className="mb-5">
          <p className="text-dark-100 leading-relaxed">
            {featured ? description : excerpt}
          </p>
          
          {cost && (
            <div className="mt-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-lg bg-${color}-900/30 text-${color}-300 text-sm border border-${color}-800/20`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {cost}
              </span>
            </div>
          )}
        </div>
        
        {/* WhatsApp info */}
        {whatsappInfo && (
          <div className="mb-5 p-3 rounded-lg bg-dark-800/80 border border-dark-700/50 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="h-5 w-5 text-green-500 mr-3 flex-shrink-0"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="text-sm text-dark-200">{whatsappInfo}</span>
          </div>
        )}
        
        {/* Toggle Details / CTA Buttons */}
        <div className="mt-auto flex items-center gap-3">
          <button 
            onClick={handleJoinClick}
            className={getButtonClasses()}
          >
            {ctaText || "I'm Interested!"}
          </button>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn bg-dark-800 hover:bg-dark-700 p-2.5 rounded-lg border border-dark-700 hover:border-dark-600 transition-all"
            aria-expanded={showDetails}
            aria-label={showDetails ? "Hide details" : "Show details"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Expandable Event Details */}
        <motion.div
          className="overflow-hidden"
          variants={detailsVariants}
          initial="hidden"
          animate={showDetails ? "visible" : "hidden"}
        >
          <div className="pt-6 space-y-6 border-t border-dark-800 mt-6">
            {/* Schedule */}
            {schedule && schedule.length > 0 && (
              <div>
                <h4 className={`text-lg font-semibold text-${color}-400 mb-3 flex items-center`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Schedule
                </h4>
                <div className="space-y-2 pl-2">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex items-baseline">
                      <div className="w-14 text-dark-300 flex-shrink-0 font-medium">{item.time}</div>
                      <div className="text-dark-100">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Participation Info */}
            {details?.participationInfo && (
              <div>
                <h4 className={`text-lg font-semibold text-${color}-400 mb-3 flex items-center`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                  How to Participate
                </h4>
                <p className="text-dark-100 pl-2">{details.participationInfo}</p>
              </div>
            )}
            
            {/* What to Bring */}
            {details?.bringItems && details.bringItems.length > 0 && (
              <div>
                <h4 className={`text-lg font-semibold text-${color}-400 mb-3 flex items-center`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  What to Bring
                </h4>
                <ul className="space-y-1 text-dark-100 pl-2">
                  {details.bringItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-dark-300 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Do's and Don'ts */}
            {details?.doAndDont && (
              <div className="grid sm:grid-cols-2 gap-4">
                {details.doAndDont.do && (
                  <div className="p-4 rounded-lg bg-dark-800/80 border border-success-800/20">
                    <h4 className="font-semibold text-success-400 mb-3 flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Do's
                    </h4>
                    <ul className="space-y-2 text-dark-100">
                      {details.doAndDont.do.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-success-500 mr-2 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {details.doAndDont.dont && (
                  <div className="p-4 rounded-lg bg-dark-800/80 border border-accent-800/20">
                    <h4 className="font-semibold text-accent-400 mb-3 flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Don'ts
                    </h4>
                    <ul className="space-y-2 text-dark-100">
                      {details.doAndDont.dont.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent-500 mr-2 mt-1">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {/* Safety Info if available */}
            {details?.safetyInfo && (
              <div className="mt-2">
                <h4 className={`text-lg font-semibold text-${color}-400 mb-3 flex items-center`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Safety Information
                </h4>
                <ul className="space-y-1 text-dark-100 pl-2">
                  {details.safetyInfo.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-info-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default memo(EventCard);