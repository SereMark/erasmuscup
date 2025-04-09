// Calculate the next Friday's date
function getNextFriday() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 5 is Friday
  const daysToFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 7 - dayOfWeek + 5;
  
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysToFriday);
  return nextFriday;
}

// Set event times for "This Friday"
const eventDate = getNextFriday();
const eventStartTime = new Date(eventDate);
eventStartTime.setHours(18, 0, 0, 0); // 6:00 PM

const eventEndTime = new Date(eventDate);
eventEndTime.setHours(23, 0, 0, 0); // 11:00 PM

export const birthdayGambitEventData = {
    type: "SPECIAL GAMBIT",
    typeColor: "bg-pink-500/20",
    typeTextColor: "text-pink-300",
    // Priority for this event (higher number = higher priority)
    priority: 10,
    // The status is dynamic now, but we keep this for backward compatibility and because I'm lazy
    status: "UPCOMING", // This will be overridden by dynamic status
    // Start and end times for the event
    startTime: eventStartTime,
    endTime: eventEndTime,
    // Hero section texts when this event is active
    heroTexts: {
      title: "Active Events & Challenges",
      message: "Marco's Birthday Gambit is happening now! Join the festivities at Pleschinger See.",
      badgeText: "Party Time! 🎂"
    },
    // Display date string
    date: "This Friday",
    title: "Marco's Birthday Gambit",
    gradient: "from-pink-800 to-purple-800",
    gradientText: "from-pink-300 to-purple-300",
    rotation: "rotate-1",
    iconElement: "cake",
    iconBgColor: "bg-gradient-to-br from-pink-600/30 to-purple-600/30 border-pink-500/20",
    description: "This Friday is Marco's birthday and he's organizing a Special Secret Gambit at Pleschinger See. Celebrate his birthday with House Cup challenges, favorite snacks to share, and a Buffalo-free evening (at least from the birthday boy)!",
    details: [
      {
        icon: "time",
        label: "When:",
        value: "Friday evening (6:00 PM - 11:00 PM)"
      },
      {
        icon: "location",
        label: "Where:",
        value: "Pleschinger See"
      },
      {
        icon: "info",
        label: "What to expect:",
        value: "House Cup challenges (rules revealed on-site)"
      },
      {
        icon: "bring",
        label: "Bring:",
        value: "Your favorite snacks to share"
      }
    ],
    notes: [
      {
        title: "RSVP Required",
        bgColor: "bg-pink-900/10",
        borderColor: "border-pink-700/20",
        textColor: "text-pink-300",
        content: "Marco needs to know who can attend before finalizing plans. Please respond in the WhatsApp group if you're available this Friday evening."
      },
      {
        title: "Buffalo-Free Zone",
        bgColor: "bg-pink-900/10",
        borderColor: "border-pink-700/20",
        textColor: "text-pink-300",
        content: "Since it's Marco's birthday, he'll be nice and won't be watching for any \"buffaloes\" - though everyone else still can! 😉"
      }
    ],
    organizer: "Marco"
  };