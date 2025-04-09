// Helper function to create event dates
function createEventDate(dayOffset, hour, minute) {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date;
}

// Create date objects for the event phases
// Setup phase: Monday midnight to Wednesday 23:59
const setupPhaseStart = createEventDate(-((new Date().getDay() - 1) % 7), 0, 0); // Previous Monday 00:00
const setupPhaseEnd = createEventDate(-((new Date().getDay() - 3) % 7), 23, 59); // Wednesday 23:59

// Hunt phase: Thursday midnight to Friday 23:59
const huntPhaseStart = createEventDate(-((new Date().getDay() - 4) % 7), 0, 0); // Thursday 00:00
const huntPhaseEnd = createEventDate(-((new Date().getDay() - 5) % 7), 23, 59); // Friday 23:59

export const captureFlagEventData = {
    type: "MAIN EVENT",
    typeColor: "bg-purple-600/20",
    typeTextColor: "text-purple-300",
    // Priority for this event (higher number = higher priority)
    priority: 5,
    // The status is dynamic now, but we keep this for backward compatibility and because I'm lazy
    status: "UPCOMING", // This will be overridden by dynamic status
    // Start and end times for the entire event
    startTime: setupPhaseStart,
    endTime: huntPhaseEnd,
    
    // Event phases with their own start and end times
    phases: [
      {
        name: "Setup Phase",
        startTime: setupPhaseStart,
        endTime: setupPhaseEnd,
        icon: "time",
        label: "Set-up:",
        value: "Monday midnight to Wednesday 23:59",
        // Hero texts specific to the setup phase
        heroTexts: {
          title: "Setup Phase in Progress",
          message: "The Capture the Flag setup phase is active! Houses are currently hiding their flags before the hunt begins.",
          badgeText: "Setup Phase Active! 🚩"
        }
      },
      {
        name: "Hunt Phase",
        startTime: huntPhaseStart,
        endTime: huntPhaseEnd,
        icon: "time",
        label: "Hunt:",
        value: "Thursday midnight to Friday 23:59",
        // Hero texts specific to the hunt phase
        heroTexts: {
          title: "Active Events & Challenges",
          message: "The Capture the Flag hunt is in progress! Find other houses' flags to earn points for your house.",
          badgeText: "The Hunt is on! 🏁"
        }
      }
    ],
    
    // Default hero texts (used if no phase is active or as fallback)
    heroTexts: {
      title: "Active Events & Challenges",
      message: "The Capture the Flag event is in progress! Check the current phase to see what you should be doing.",
      badgeText: "Event Active! 🚩"
    },
    
    // Display date that will be dynamically determined
    date: "Event Active!",
    title: "Capture the Flag Easter Hunt",
    gradient: "from-purple-800 to-indigo-900",
    gradientText: "from-indigo-300 to-purple-300",
    rotation: "-rotate-1",
    iconElement: "flag",
    iconBgColor: "bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border-indigo-500/20",
    description: "In the spirit of Easter, we will be hunting down house flags! Each team will hide a flag with their house logo somewhere in Julius Raab Heim. Teams will receive points for finding another House's flag, or if their flag survives until the clock strikes midnight on Friday!",
    schedule: [
      {
        icon: "time",
        label: "Set-up:",
        value: "Monday midnight to Wednesday 23:59",
        isActive: false
      },
      {
        icon: "time",
        label: "Hunt:",
        value: "Thursday midnight to Friday 23:59",
        isActive: false
      }
    ],
    notes: [
      {
        title: "Flag Requirements",
        bgColor: "bg-indigo-900/10",
        borderColor: "border-indigo-700/20",
        textColor: "text-indigo-300",
        content: "Each house receives one flag (approx. 1/4 of A4 size). Flags must remain intact in their original form – no folding, rolling, or tearing allowed."
      },
      {
        title: "Proof of Capture",
        bgColor: "bg-indigo-900/10",
        borderColor: "border-indigo-700/20",
        textColor: "text-indigo-300",
        content: "When capturing a flag, take a photo showing: the found flag, at least one member of your house, and where the flag was hidden."
      }
    ],
    pointsSystem: {
      title: "Points System",
      bgColor: "bg-indigo-900/10",
      borderColor: "border-indigo-700/20",
      textColor: "text-indigo-300",
      points: [
        { type: "positive", label: "Each captured flag", value: "+50 points" },
        { type: "positive", label: "If your flag survives", value: "+25 points" },
        { type: "negative", label: "Cheating or breaking rules", value: "-50 points" }
      ]
    },
    rules: [
      { type: "positive", content: "Flags must be in common areas (stairs, corridors, kitchens, elevator, entrance hall)" },
      { type: "warning", content: "Common rooms are off-limits (count as locked rooms)" },
      { type: "warning", content: "No hiding in personal rooms, outside, behind reception, or in any locked/closed room" },
      { type: "positive", content: "You must retrieve your flag at the end of the week to claim survival points" },
      { type: "warning", content: "No changing flag location once the hunt begins" },
      { type: "warning", content: "Cheating penalty is -50 points (higher than standard -30)" }
    ],
    organizer: "Max"
  };