/**
 * Constants and data for the events page
 */

// Event type configuration
export const EVENT_TYPES = {
    house: {
      label: "House Event",
      style: "bg-blue-900/30 text-blue-300 border-blue-700/30",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    },
    gambit: {
      label: "Gambit",
      style: "bg-purple-900/30 text-purple-300 border-purple-700/30",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    },
    super: {
      label: "Super Gambit",
      style: "bg-pink-900/30 text-pink-300 border-pink-700/30",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    social: {
      label: "Social",
      style: "bg-green-900/30 text-green-300 border-green-700/30",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    }
  };
  
  // Filter categories
  export const FILTER_CATEGORIES = [
    { id: "all", name: "All Events", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { id: "house", name: "House Events", icon: EVENT_TYPES.house.icon },
    { id: "gambit", name: "Gambits", icon: EVENT_TYPES.gambit.icon },
    { id: "super", name: "Super Gambits", icon: EVENT_TYPES.super.icon },
    { id: "social", name: "Social Events", icon: EVENT_TYPES.social.icon }
  ];
  
  // Sample events data
  export const EVENTS_DATA = [
    {
      id: 1,
      title: "Lorem Ipsum Dolor Sit Amet",
      type: "house",
      date: "April 8, 2025",
      time: "6:00 PM",
      location: "Lorem Square",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.",
      imageUrl: "/assets/logos/house-cup-logo.png"
    },
    {
      id: 2,
      title: "Consectetur Adipiscing Elit",
      type: "gambit",
      date: "April 12, 2025",
      time: "8:00 PM",
      location: "Dolor Bar",
      description: "Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
      imageUrl: "/assets/logos/house-cup-logo.png"
    },
    {
      id: 3,
      title: "Sed Do Eiusmod Tempor",
      type: "house",
      date: "April 15, 2025",
      time: "6:30 AM",
      location: "North Beach",
      description: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt.",
      imageUrl: "/assets/logos/house-cup-logo.png"
    },
    {
      id: 4,
      title: "Ut Enim Ad Minim Veniam",
      type: "super",
      date: "April 21, 2025",
      time: "3:00 PM",
      location: "City Center",
      description: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.",
      imageUrl: "/assets/logos/house-cup-logo.png"
    },
    {
      id: 5,
      title: "Quis Nostrud Exercitation Ullamco",
      type: "social",
      date: "April 27, 2025",
      time: "9:00 PM",
      location: "Apartment 7B",
      description: "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla quis lorem ut libero malesuada feugiat.",
      imageUrl: "/assets/logos/house-cup-logo.png"
    },
    {
      id: 6,
      title: "Duis Aute Irure Dolor",
      type: "house",
      date: "May 2, 2025",
      time: "11:00 PM",
      location: "Secret Location",
      description: "Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt.",
      imageUrl: "/assets/logos/house-cup-logo.png"
    }
  ];
  
  // Past events data
  export const PAST_EVENTS = [
    {
      title: "Lorem Ipsum Opening Ceremony",
      date: "March 21, 2025",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      points: "+100 for all Houses"
    },
    {
      title: "Lorem Ipsum First Highlight",
      date: "March 28, 2025",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      points: "-10 for a selected group"
    }
  ];
  
  // Featured event data
  export const FEATURED_EVENT = {
    title: "Lorem Ipsum Featured Event",
    date: "April 12, 2025",
    time: "8:00 PM",
    location: "Dolor Venue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  };
  
  // Available calendar months
  export const CALENDAR_MONTHS = ["April", "May", "June"];
  
  // Days of the week
  export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Days with events (for calendar visualization)
  export const DAYS_WITH_EVENTS = [3, 8, 12, 15, 21, 27];