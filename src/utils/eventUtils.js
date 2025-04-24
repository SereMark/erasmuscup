import { dateUtils } from "./dateUtils"

export const eventUtils = {
  /**
   * Process events list with any necessary transformations
   * @param {Array} events - Array of event objects
   * @returns {Array} - Processed events
   */
  processEvents: (events) => {
    return events.map(event => ({
      ...event
    }))
  },

  /**
   * Filter events that are currently active
   * @param {Array} events - Array of event objects
   * @returns {Array} - Active events
   */
  getActiveEvents: (events) => {
    const now = new Date()
    
    return events.filter(event => {
      // Check if event has phases (currently running)
      if (event.timing?.phases?.length > 0) {
        return true
      }
      
      // Check if event has dynamicDateRef
      if (event.timing?.dynamicDateRef) {
        const eventDate = dateUtils.getDateFromReference(event.timing.dynamicDateRef)
        
        // If the event is today
        if (dateUtils.formatDate(eventDate) === dateUtils.formatDate(now)) {
          // Check time ranges if they exist
          if (event.timing.startTime && event.timing.endTime) {
            return eventUtils.isTimeInRange(
              now,
              event.timing.startTime,
              event.timing.endTime
            )
          } else {
            // If no specific time, consider the event active for the entire day
            return true
          }
        }
      }
      
      // Check static start and end dates if they exist
      if (event.timing?.startDate && event.timing?.endDate) {
        const startDate = new Date(event.timing.startDate)
        const endDate = new Date(event.timing.endDate)
        
        return now >= startDate && now <= endDate
      }
      
      return false
    })
  },

  /**
   * Filter events that are upcoming
   * @param {Array} events - Array of event objects
   * @param {Array} activeEvents - Already active events
   * @returns {Array} - Upcoming events
   */
  getUpcomingEvents: (events, activeEvents) => {
    const now = new Date()
    
    return events.filter(event => {
      // Skip events that are already active
      if (activeEvents.some(active => active.id === event.id)) {
        return false
      }
      
      // Check if event has dynamicDateRef that points to a future date
      if (event.timing?.dynamicDateRef) {
        const eventDate = dateUtils.getDateFromReference(event.timing.dynamicDateRef)
        
        // If the date is in the future
        if (eventDate > now) {
          return true
        }
        
        // If the date is today but the start time is in the future
        if (dateUtils.formatDate(eventDate) === dateUtils.formatDate(now) && event.timing.startTime) {
          return !eventUtils.isTimeInRange(
            now,
            event.timing.startTime,
            "23:59",
            true
          )
        }
      }
      
      // Check static start date if it exists
      if (event.timing?.startDate) {
        const startDate = new Date(event.timing.startDate)
        return now < startDate
      }
      
      return false
    })
  },

  /**
   * Check if current time is within a given range
   * @param {Date} currentDate - Current date object
   * @param {String} startTime - Start time in HH:MM format
   * @param {String} endTime - End time in HH:MM format
   * @param {Boolean} checkBeforeOnly - Only check if current time is before start time
   * @returns {Boolean} - True if time is in range
   */
  isTimeInRange: (currentDate, startTime, endTime, checkBeforeOnly = false) => {
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)
    
    const currentHour = currentDate.getHours()
    const currentMinute = currentDate.getMinutes()
    
    if (checkBeforeOnly) {
      return currentHour < startHour || (currentHour === startHour && currentMinute < startMinute)
    }
    
    return (
      (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
      (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute))
    )
  }
}
