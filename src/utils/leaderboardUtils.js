/**
 * Returns appropriate style classes for table columns based on rank
 */
export function getColumnStyle(houseKey, rankMapping) {
  const rank = rankMapping[houseKey];
  
  if (rank === 1) {
    return "bg-purple-900/20 text-white";
  } else if (rank === 2) {
    return "bg-indigo-900/20 text-white";
  } else if (rank === 3) {
    return "bg-blue-900/20 text-white";
  } else {
    return "bg-gray-900/20 text-white";
  }
}

/**
 * Returns appropriate style classes for row cells based on rank
 */
export function getRowColumnStyle(houseKey, rowRankMapping) {
  const rank = rowRankMapping[houseKey];
  
  if (rank === 1) {
    return "bg-purple-900/30 text-white";
  } else if (rank === 2) {
    return "bg-indigo-900/30 text-white";
  } else if (rank === 3) {
    return "bg-blue-900/30 text-white";
  } else {
    return "bg-gray-900/30 text-white";
  }
}

/**
 * Returns medal emoji based on rank
 */
export function getMedalEmoji(rank) {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "";
  }
}