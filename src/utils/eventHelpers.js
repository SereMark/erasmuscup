export function determineEventStatus(e) {
    if (e.timing?.isActive) return "active"
    if (e.timing?.isCompleted) return "completed"
    if (e.id === "birthday-gambit") return "active"
    if (e.id === "capture-flag") return "upcoming"
    return "completed"
  }  