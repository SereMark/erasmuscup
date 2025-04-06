import React from "react";
import { getRowColumnStyle } from "../../../utils/leaderboardUtils";

export function ScoreItem({ house, value, isTotal, rowRankMapping }) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const valueColor = isTotal ? "text-white" : isPositive ? "text-green-400" : isNegative ? "text-red-400" : "text-white";
  
  return (
    <div 
      className={`flex items-center p-2 sm:p-3 rounded-lg ${
        value != null ? getRowColumnStyle(house.key, rowRankMapping) : "bg-gray-800/50"
      }`}
    >
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/30 rounded-full p-0.5 mr-2 sm:mr-3 flex-shrink-0">
        <img 
          src={house.logo} 
          alt={`${house.name} logo`}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-xs sm:text-sm text-gray-200">{house.name}</span>
        <span className={`font-bold text-base sm:text-lg ${valueColor} ml-2`}>
          {value != null ? (
            <>
              {isPositive && !isTotal && "+"}
              {value}
            </>
          ) : "-"}
        </span>
      </div>
    </div>
  );
}