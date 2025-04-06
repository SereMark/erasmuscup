/**
 * Constants for the House Cup Rules page
 */

// General constants
export const SCROLL_THRESHOLD = 500;
export const SCROLL_OFFSET = -80;
export const TOC_DELAY = 600;

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Term highlighting map for rule cards
export const HIGHLIGHT_MAP = [
  { term: "Basic Rules", replacement: "<strong class='text-purple-300'>Basic Rules</strong>" },
  { term: "Buffaloed", replacement: "<strong class='text-pink-300'>Buffaloed</strong>" },
  { term: "Cool Shit", replacement: "<em class='text-indigo-300'>Cool Shit</em>" },
  { term: "House Cup", replacement: "<strong class='text-purple-300'>House Cup</strong>" },
  { term: "Murder", replacement: "<em class='text-pink-300'>Murder</em>" },
  { term: "Cheating", replacement: "<strong class='text-red-400'>Cheating</strong>" },
  { term: "Treason", replacement: "<strong class='text-red-400'>Treason</strong>" },
  { term: "public hanging", replacement: "<em class='text-pink-300'>public hanging</em>" },
  { term: "Yardie", replacement: "<em class='text-green-300'>Yardie</em>" },
  { term: "Super Gambit", replacement: "<strong class='text-indigo-300'>Super Gambit</strong>" },
  { term: "Gambit", replacement: "<strong class='text-purple-300'>Gambit</strong>" },
  { term: "Armistice", replacement: "<strong class='text-blue-300'>Armistice</strong>" },
  { term: "House Points", replacement: "<strong class='text-yellow-300'>House Points</strong>" },
  { term: "How's That'ed", replacement: "<strong class='text-pink-300'>How's That'ed</strong>" }
];

// Table of Contents structure
export const TOC_STRUCTURE = [
  {
    title: null,
    items: [
      { id: "section-1", label: "1. Interpretation", icon: "🔍" },
      { id: "section-2", label: "2. Object and Purpose", icon: "🎯" }
    ]
  },
  {
    title: "Part 1: The House Cup",
    items: [
      { id: "section-3", label: "3. House Rules", icon: "📝" },
      { id: "section-4", label: "4. Participants", icon: "👥" },
      { id: "section-5", label: "5. House Events", icon: "🎉" }
    ]
  },
  {
    title: "Part 2: House Points",
    items: [
      { id: "section-6", label: "6. Award of House Points", icon: "✨" },
      { id: "section-7", label: "7. Revocation of House Points", icon: "⚠️" }
    ]
  },
  {
    title: "Part 3: Recommendations",
    items: [
      { id: "section-8", label: "8. Event Selection", icon: "🤝" },
      { id: "section-9", label: "9. Overthrowing Organisers", icon: "💥" },
      { id: "section-10", label: "10. Constructive Feedback", icon: "🧐" }
    ]
  },
  {
    title: "Part 4: Bonus Points",
    items: [
      { id: "section-11", label: "11. Attendance and Pride", icon: "🎖" },
      { id: "section-12", label: "12. Gambits", icon: "🎲" },
      { id: "section-12a", label: "12a. Super Gambits", icon: "💥" },
      { id: "section-12b", label: "12b. Armistices", icon: "🤝" }
    ]
  },
  {
    title: "Part 5: Punishment",
    items: [
      { id: "section-13", label: "13. House Crimes", icon: "🚫" },
      { id: "section-14", label: "14. Cheating", icon: "❌" },
      { id: "section-15", label: "15. Treason", icon: "⚔️" },
      { id: "section-16", label: "16. Public Nudity", icon: "🍑" },
      { id: "section-17", label: "17. Murder", icon: "🔪" },
      { id: "section-18", label: "18. Losing the House Cup", icon: "⚰️" }
    ]
  },
  {
    title: "Part 6: Roles",
    items: [
      { id: "section-19", label: "19. House Roles", icon: "🎩" }
    ]
  },
  {
    title: null,
    items: [
      { id: "schedule-1", label: "Schedule 1: House Cup Register", icon: "📜" }
    ]
  }
];

// Part headings data
export const PART_HEADINGS = [
  { partNumber: 1, title: "The House Cup", id: "part-1" },
  { partNumber: 2, title: "House Points", id: "part-2" },
  { partNumber: 3, title: "Recommendations", id: "part-3" },
  { partNumber: 4, title: "Bonus Points", id: "part-4" },
  { partNumber: 5, title: "Punishment", id: "part-5" },
  { partNumber: 6, title: "Roles", id: "part-6" }
];