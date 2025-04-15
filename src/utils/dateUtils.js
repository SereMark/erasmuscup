export const dateUtils = {
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
    formatDate: (date) => {
      const options = { weekday: "long", month: "long", day: "numeric" }
      return date.toLocaleDateString("en-US", options)
    },
    formatDateWithOrdinal: (date) => {
      const options = { weekday: "long", month: "long" }
      const day = date.getDate()
      const suffix = getOrdinalSuffix(day)
      return `${date.toLocaleDateString("en-US", options)} ${day}${suffix}`
    },
    formatDynamicReference: (reference) => {
      if (!reference) return "Date to be announced"
      const d = dateUtils.getDateFromReference(reference)
      return dateUtils.formatDateWithOrdinal(d)
    }
  }
  function getOrdinalSuffix(n) {
    if (n > 3 && n < 21) return "th"
    switch (n % 10) {
      case 1: return "st"
      case 2: return "nd"
      case 3: return "rd"
      default: return "th"
    }
  }  