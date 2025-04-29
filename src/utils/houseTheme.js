// src/utils/houseTheme.js

/**
 * House Theme Utility
 * 
 * This utility provides consistent theming for house components across the application.
 */

// Raw color values (for direct color usage e.g. in charts)
export const HOUSE_COLORS = {
    theHoo: {
      primary: '#9146ff', // brand-400 (purple)
      secondary: '#7a39df', // brand-500 
      light: '#a76dff', // brand-300
      dark: '#4d2d99'   // brand-700
    },
    brewCrew: {
      primary: '#eab308', // yellow-500 (gold)
      secondary: '#ca8a04', // yellow-600
      light: '#facc15',  // yellow-400
      dark: '#854d0e'    // yellow-800
    },
    redStorm: {
      primary: '#ff6d60', // accent-400 (reddish)
      secondary: '#f04c3e', // accent-500
      light: '#ff9d94',  // accent-300
      dark: '#c4342a'    // accent-700
    },
    deepJungle: {
      primary: '#22c55e', // green-500 (green)
      secondary: '#16a34a', // green-600
      light: '#4ade80',  // green-400
      dark: '#15803d'    // green-700
    }
  };
  
  /**
   * Get full house theme object with all Tailwind classes
   * @param {string} houseKey - The house identifier (theHoo, brewCrew, redStorm, deepJungle)
   * @returns {Object} Full theme object with all style variations
   */
  export const getHouseTheme = (houseKey) => {
    // Default to theHoo if no key or invalid key
    const validKey = ['theHoo', 'brewCrew', 'redStorm', 'deepJungle'].includes(houseKey) 
      ? houseKey 
      : 'theHoo';
    
    const themeMap = {
      theHoo: {
        // Background colors
        bg: 'bg-brand-500',
        bgPrimary: 'bg-brand-400',
        bgLight: 'bg-brand-500/10',
        bgLighter: 'bg-brand-500/20',
        
        // Text colors
        text: 'text-brand-300',
        textPrimary: 'text-brand-400',
        textDark: 'text-brand-500',
        
        // Borders
        border: 'border-brand-500/30',
        borderDark: 'border-brand-600/40',
        
        // Shadows and glows
        glow: 'shadow-brand-500/20',
        glowStrong: 'shadow-brand-500/30',
        
        // Gradients
        gradient: 'from-brand-500/20 to-brand-600/10',
        gradientStrong: 'from-brand-400 to-brand-600',
        gradientDark: 'from-brand-500/20 to-brand-800/10',
        
        // Ring
        ring: 'ring-brand-500',
        ringLight: 'ring-brand-500/30',
        
        // Raw color (for charts etc.)
        rawColor: HOUSE_COLORS.theHoo.primary,
        
        // Palette for more specific usage
        palette: HOUSE_COLORS.theHoo
      },
      
      brewCrew: {
        // Background colors
        bg: 'bg-yellow-500',
        bgPrimary: 'bg-yellow-500',
        bgLight: 'bg-yellow-500/10',
        bgLighter: 'bg-yellow-500/20',
        
        // Text colors
        text: 'text-yellow-400',
        textPrimary: 'text-yellow-500',
        textDark: 'text-yellow-600',
        
        // Borders
        border: 'border-yellow-500/30',
        borderDark: 'border-yellow-600/40',
        
        // Shadows and glows
        glow: 'shadow-yellow-500/20',
        glowStrong: 'shadow-yellow-500/30',
        
        // Gradients
        gradient: 'from-yellow-500/20 to-yellow-600/10',
        gradientStrong: 'from-yellow-400 to-yellow-600',
        gradientDark: 'from-yellow-500/20 to-yellow-800/10',
        
        // Ring
        ring: 'ring-yellow-500',
        ringLight: 'ring-yellow-500/30',
        
        // Raw color (for charts etc.)
        rawColor: HOUSE_COLORS.brewCrew.primary,
        
        // Palette for more specific usage
        palette: HOUSE_COLORS.brewCrew
      },
      
      redStorm: {
        // Background colors
        bg: 'bg-accent-500',
        bgPrimary: 'bg-accent-400',
        bgLight: 'bg-accent-500/10',
        bgLighter: 'bg-accent-500/20',
        
        // Text colors
        text: 'text-accent-300',
        textPrimary: 'text-accent-400',
        textDark: 'text-accent-500',
        
        // Borders
        border: 'border-accent-500/30',
        borderDark: 'border-accent-600/40',
        
        // Shadows and glows
        glow: 'shadow-accent-500/20',
        glowStrong: 'shadow-accent-500/30',
        
        // Gradients
        gradient: 'from-accent-500/20 to-accent-600/10',
        gradientStrong: 'from-accent-400 to-accent-600',
        gradientDark: 'from-accent-500/20 to-accent-800/10',
        
        // Ring
        ring: 'ring-accent-500',
        ringLight: 'ring-accent-500/30',
        
        // Raw color (for charts etc.)
        rawColor: HOUSE_COLORS.redStorm.primary,
        
        // Palette for more specific usage
        palette: HOUSE_COLORS.redStorm
      },
      
      deepJungle: {
        // Background colors
        bg: 'bg-green-500',
        bgPrimary: 'bg-green-500',
        bgLight: 'bg-green-500/10',
        bgLighter: 'bg-green-500/20',
        
        // Text colors
        text: 'text-green-400',
        textPrimary: 'text-green-500',
        textDark: 'text-green-600',
        
        // Borders
        border: 'border-green-500/30',
        borderDark: 'border-green-600/40',
        
        // Shadows and glows
        glow: 'shadow-green-500/20',
        glowStrong: 'shadow-green-500/30',
        
        // Gradients
        gradient: 'from-green-500/20 to-green-600/10',
        gradientStrong: 'from-green-400 to-green-600',
        gradientDark: 'from-green-500/20 to-green-800/10',
        
        // Ring
        ring: 'ring-green-500',
        ringLight: 'ring-green-500/30',
        
        // Raw color (for charts etc.)
        rawColor: HOUSE_COLORS.deepJungle.primary,
        
        // Palette for more specific usage
        palette: HOUSE_COLORS.deepJungle
      }
    };
    
    return themeMap[validKey];
  };
  
  /**
   * Get house theme classes for charts
   * 
   * Specific utility for chart components to have consistent colors
   * @param {Array} houses - Array of house objects
   * @returns {Object} Chart theme configuration
   */
  export const getChartTheme = (houses) => {
    // Get gradient ID for a specific house
    const getGradientId = (houseKey) => `color-${houseKey}-gradient`;
    
    // Get color for chart by house key
    const getChartColor = (houseKey) => {
      return HOUSE_COLORS[houseKey]?.primary || HOUSE_COLORS.theHoo.primary;
    };
    
    // Get gradient definitions for all houses
    const getGradientDefinitions = () => {
      return [
        {
          id: "color-theHoo-gradient",
          stops: [
            { offset: "5%", color: HOUSE_COLORS.theHoo.primary, opacity: 0.3 },
            { offset: "95%", color: HOUSE_COLORS.theHoo.primary, opacity: 0 }
          ]
        },
        {
          id: "color-brewCrew-gradient",
          stops: [
            { offset: "5%", color: HOUSE_COLORS.brewCrew.primary, opacity: 0.3 },
            { offset: "95%", color: HOUSE_COLORS.brewCrew.primary, opacity: 0 }
          ]
        },
        {
          id: "color-redStorm-gradient",
          stops: [
            { offset: "5%", color: HOUSE_COLORS.redStorm.primary, opacity: 0.3 },
            { offset: "95%", color: HOUSE_COLORS.redStorm.primary, opacity: 0 }
          ]
        },
        {
          id: "color-deepJungle-gradient",
          stops: [
            { offset: "5%", color: HOUSE_COLORS.deepJungle.primary, opacity: 0.3 },
            { offset: "95%", color: HOUSE_COLORS.deepJungle.primary, opacity: 0 }
          ]
        }
      ];
    };
    
    return {
      getGradientDefinitions,
      getGradientId,
      getChartColor,
      houses: houses.reduce((acc, house) => {
        acc[house.key] = {
          color: getChartColor(house.key),
          gradientId: getGradientId(house.key)
        };
        return acc;
      }, {})
    };
  };
  
  /**
   * Helper functions for common UI elements
   */
  
  // Get badge class for showing points (positive/negative/neutral)
  export const getPointBadgeClass = (points) => {
    if (points > 0) {
      return 'bg-green-500/10 text-green-400 border border-green-500/20';
    } else if (points < 0) {
      return 'bg-accent-500/10 text-accent-400 border border-accent-500/20';
    }
    return 'bg-dark-700/50 text-dark-300';
  };
  
  // Get house class for a specific CSS property
  export const getHouseClass = (houseKey, property = 'text') => {
    const theme = getHouseTheme(houseKey);
    
    switch (property) {
      case 'text':
        return theme.text;
      case 'textPrimary':
        return theme.textPrimary;
      case 'bg':
        return theme.bg;
      case 'bgLight':
        return theme.bgLight;
      case 'border':
        return theme.border;
      case 'glow':
        return theme.glow;
      case 'gradient':
        return theme.gradient;
      default:
        return theme.text;
    }
  };