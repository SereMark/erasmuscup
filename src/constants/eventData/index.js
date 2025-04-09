import { captureFlagEventData } from './captureFlag';
import { birthdayGambitEventData } from './birthdayGambit';

export {
  captureFlagEventData,
  birthdayGambitEventData
};

/**
 * Checks if an event is currently active based on its time data
 * @param {Object} event - The event object to check
 * @returns {boolean} - Whether the event is currently active
 */
export const isEventActive = (event) => {
  const now = new Date();
  
  // If the event has active phases, check if any phase is active
  if (event.phases && Array.isArray(event.phases)) {
    return event.phases.some(phase => {
      return phase.startTime <= now && now <= phase.endTime;
    });
  }
  
  // Check the overall event time
  return event.startTime <= now && now <= event.endTime;
};

/**
 * Checks if an event is upcoming (not started yet)
 * @param {Object} event - The event object to check
 * @returns {boolean} - Whether the event is upcoming
 */
export const isEventUpcoming = (event) => {
  const now = new Date();
  
  // Check if the event or its first phase hasn't started yet
  if (event.phases && Array.isArray(event.phases) && event.phases.length > 0) {
    // For events with phases, check if the first phase hasn't started
    return now < event.phases[0].startTime;
  }
  
  // For events without phases, check if it hasn't started yet
  return now < event.startTime;
};

/**
 * Checks if an event is completed (already ended)
 * @param {Object} event - The event object to check
 * @returns {boolean} - Whether the event is completed
 */
export const isEventCompleted = (event) => {
  const now = new Date();
  
  // Check if the event or its last phase has already ended
  if (event.phases && Array.isArray(event.phases) && event.phases.length > 0) {
    // For events with phases, check if the last phase has ended
    const lastPhase = event.phases[event.phases.length - 1];
    return now > lastPhase.endTime;
  }
  
  // For events without phases, check if it has already ended
  return now > event.endTime;
};

/**
 * Gets the current active phase of an event
 * @param {Object} event - The event object
 * @returns {Object|null} - The active phase or null if no phase is active
 */
export const getActivePhase = (event) => {
  if (!event.phases || !Array.isArray(event.phases)) {
    return null;
  }
  
  const now = new Date();
  return event.phases.find(phase => phase.startTime <= now && now <= phase.endTime) || null;
};

/**
 * Gets the dynamic status of an event based on its time
 * @param {Object} event - The event object
 * @returns {string} - "LIVE", "UPCOMING", or "COMPLETED"
 */
export const getEventStatus = (event) => {
  if (isEventActive(event)) return "LIVE";
  if (isEventUpcoming(event)) return "UPCOMING";
  return "COMPLETED";
};

/**
 * Gets the appropriate hero texts for an event based on its current phase
 * @param {Object} event - The event object
 * @returns {Object} - Hero texts object with title, message, and badgeText
 */
export const getEventHeroTexts = (event) => {
  // Check if there's an active phase with its own heroTexts
  const activePhase = getActivePhase(event);
  
  if (activePhase && activePhase.heroTexts) {
    return activePhase.heroTexts;
  }
  
  // If no phase-specific heroTexts, return the default event heroTexts
  return event.heroTexts || {
    title: "Active Events & Challenges",
    message: "Events are currently in progress! Join in to earn points for your house.",
    badgeText: "Live Event! 🔥"
  };
};

/**
 * Gets all active events
 * @returns {Array} - Array of active events
 */
export const getActiveEvents = () => {
  // Filter active events and sort them by priority if provided
  return [captureFlagEventData, birthdayGambitEventData]
    .filter(isEventActive)
    .sort((a, b) => {
      // Sort by priority if available (higher priority comes first)
      const priorityA = a.priority || 0;
      const priorityB = b.priority || 0;
      return priorityB - priorityA;
    });
};

/**
 * Gets all upcoming events
 * @returns {Array} - Array of upcoming events
 */
export const getUpcomingEvents = () => {
  return [captureFlagEventData, birthdayGambitEventData].filter(isEventUpcoming);
};

/**
 * Gets all completed events
 * @returns {Array} - Array of completed events
 */
export const getCompletedEvents = () => {
  return [captureFlagEventData, birthdayGambitEventData].filter(isEventCompleted);
};

/**
 * Gets all events
 * @returns {Array} - Array of all events
 */
export const getAllEvents = () => {
  return [captureFlagEventData, birthdayGambitEventData];
};