import React from "react";
import { CALENDAR_MONTHS } from "../../../constants/eventsData";

export default function MonthSelector({ activeMonth, setActiveMonth }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
      {CALENDAR_MONTHS.map((month) => (
        <button
          key={month}
          onClick={() => setActiveMonth(month)}
          className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
            activeMonth === month
              ? "bg-purple-700 text-white"
              : "bg-black/50 text-gray-400 hover:bg-purple-900/30 hover:text-white"
          }`}
          aria-pressed={activeMonth === month}
        >
          {month}
        </button>
      ))}
    </div>
  );
}