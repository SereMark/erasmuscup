export const dateUtils = {
  /**
   * Convert a text date reference to an actual Date object
   * @param {String} reference - Text reference like 'today', 'tomorrow', or 'nextMonday'
   * @returns {Date} - Date object corresponding to the reference
   */
    getDateFromReference: (reference) => {
      const today = new Date()

      if (reference.startsWith("next")) {
        const dayName = reference.replace("next", "").toLowerCase()
        const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        const targetDayIndex = daysOfWeek.indexOf(dayName)

        if (targetDayIndex !== -1) {
          const currentDayIndex = today.getDay()
          let daysToAdd = targetDayIndex - currentDayIndex

          if (daysToAdd <= 0) daysToAdd += 7
          const targetDate = new Date(today)
          targetDate.setDate(today.getDate() + daysToAdd)
          return targetDate
        }
      }

      if (reference === "tomorrow") {
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)
        return tomorrow
      }

      if (reference === "today") {
        return today
      }

      return today
    },

  /**
   * Format a date to display weekday, month, and day
   * @param {Date} date - Date object to format
   * @returns {String} - Formatted date string (e.g., 'Monday, April 24')
   */
    formatDate: (date) => {
      const options = { weekday: "long", month: "long", day: "numeric" }
      return date.toLocaleDateString("en-US", options)
    },

  /**
   * Format a date with ordinal suffix for the day (e.g., 1st, 2nd, 3rd)
   * @param {Date} date - Date object to format
   * @returns {String} - Formatted date string with ordinal (e.g., 'Monday, April 24th')
   */
    formatDateWithOrdinal: (date) => {
      const options = { weekday: "long", month: "long" }
      const day = date.getDate()
      const suffix = getOrdinalSuffix(day)
      return `${date.toLocaleDateString("en-US", options)} ${day}${suffix}`
    },

  /**
   * Format a dynamic date reference into a human-readable string
   * @param {String} reference - Text reference to format
   * @returns {String} - Formatted date string or default message if reference is invalid
   */
    formatDynamicReference: (reference) => {
      if (!reference) return "Date to be announced"
      const d = dateUtils.getDateFromReference(reference)
      return dateUtils.formatDateWithOrdinal(d)
    }
  }

  /**
 * Get the ordinal suffix for a number (st, nd, rd, th)
 * @param {Number} n - The number to get the suffix for
 * @returns {String} - The ordinal suffix
 */
function getOrdinalSuffix(n) {
    if (n > 3 && n < 21) return "th"
    switch (n % 10) {
      case 1: return "st"
      case 2: return "nd"
      case 3: return "rd"
      default: return "th"
    }
  }