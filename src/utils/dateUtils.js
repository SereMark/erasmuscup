/**
 * Format a date string to a more readable format
 * @param {string} dateString - ISO date string
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
    const date = new Date(dateString);
    
    // Default options for date formatting
    const defaultOptions = { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    // Merge user options with defaults
    const formatOptions = { ...defaultOptions, ...options };
    
    return date.toLocaleDateString('en-US', formatOptions);
  };
  
  /**
   * Format a date in a relative way (e.g. "Tomorrow", "In 3 days")
   * @param {string} dateString - ISO date string
   * @returns {string} Relative date string
   */
  export const getRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Time difference in milliseconds
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;
    if (diffDays >= 7 && diffDays < 14) return 'Next week';
    if (diffDays >= 14 && diffDays < 30) return 'In 2 weeks';
    
    // For dates further away, return the month and day
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  /**
   * Calculate if an event is happening soon (within the next 3 days)
   * @param {string} dateString - ISO date string
   * @param {number} daysThreshold - Number of days to consider "soon" (default: 3)
   * @returns {boolean} True if event is happening soon
   */
  export const isHappeningSoon = (dateString, daysThreshold = 3) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Time difference in milliseconds
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 0 && diffDays <= daysThreshold;
  };