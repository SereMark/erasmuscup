import React from "react";
import { EVENT_TYPES } from "../../constants/eventsData";

export default function EventTypeTag({ type }) {
  const typeInfo = EVENT_TYPES[type] || {
    label: "Event",
    style: "bg-gray-800 text-gray-400 border-gray-700"
  };
  
  return (
    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${typeInfo.style}`}>
      {typeInfo.label}
    </div>
  );
}