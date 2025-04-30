/**
 * Term highlighting utility for rule documents
 * 
 * Provides functions to render structured rule content with term highlighting
 */

import React from 'react';

/**
 * Generate term styling classes based on type and level
 * @param {string} type - Type of term (brand, accent, success, danger, info)
 * @param {string} level - Emphasis level (emphasis, strong, normal)
 * @returns {string} - CSS classes for the term
 */
export const getTermClasses = (type, level) => {
  // Base classes by type
  const baseClasses = {
    brand: 'text-brand-400',
    accent: 'text-accent-400',
    success: 'text-success-400',
    danger: 'text-red-400',
    info: 'text-info-400'
  };

  // Default to brand if type not found
  const colorClass = baseClasses[type] || baseClasses.brand;
  
  return `${colorClass} font-medium hover:underline cursor-help transition-colors`;
};

/**
 * Highlight special terms in text content
 * @param {string} text - The text to process
 * @param {Object} termDefinitions - Object with terms grouped by type
 * @returns {React.ReactNode} - Text with highlighted terms
 */
export const highlightTerms = (text, termDefinitions) => {
  if (!text || !termDefinitions) return text;

  // Create a flat array of all terms with their type and level
  const allTerms = [];
  Object.keys(termDefinitions).forEach(type => {
    termDefinitions[type].forEach(term => {
      allTerms.push({
        ...term,
        type
      });
    });
  });
  
  // Sort terms by length (longest first) to avoid partial matches
  allTerms.sort((a, b) => b.term.length - a.term.length);
  
  // If no terms, return the plain text
  if (allTerms.length === 0) return text;
  
  // Find term positions in text
  const matches = findTermMatches(text, allTerms);
  
  // If no matches, return the plain text
  if (matches.length === 0) return text;
  
  // Sort matches by position
  matches.sort((a, b) => a.startIndex - b.startIndex);
  
  // Build result with highlighted terms
  return buildHighlightedContent(text, matches);
};

/**
 * Find all term matches in a text
 * @param {string} text - Text to search in
 * @param {Array} terms - Terms to find
 * @returns {Array} - Array of match objects with position and term info
 */
const findTermMatches = (text, terms) => {
  const matches = [];

  terms.forEach(term => {
    const regex = new RegExp(`\\b${escapeRegExp(term.term)}\\b`, 'gi');
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        term: term.term,
        type: term.type,
        level: term.level,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        originalText: match[0] // Preserve original case
      });
    }
  });

  // Filter out overlapping matches
  return filterOverlappingMatches(matches);
};

/**
 * Filter out overlapping term matches, keeping longer terms
 * @param {Array} matches - All term matches
 * @returns {Array} - Filtered matches with no overlaps
 */
const filterOverlappingMatches = (matches) => {
  // Sort by position then by length (longer terms first)
  matches.sort((a, b) => {
    if (a.startIndex !== b.startIndex) return a.startIndex - b.startIndex;
    return b.endIndex - a.endIndex; // Longer terms first
  });
  
  const filteredMatches = [];
  let lastEndIndex = 0;
  
  for (const match of matches) {
    if (match.startIndex >= lastEndIndex) {
      filteredMatches.push(match);
      lastEndIndex = match.endIndex;
    }
  }
  
  return filteredMatches;
};

/**
 * Build the final text with highlighted terms
 * @param {string} text - Original text
 * @param {Array} matches - Term matches
 * @returns {Array} - Array of React elements
 */
const buildHighlightedContent = (text, matches) => {
  const parts = [];
  let lastIndex = 0;
  
  matches.forEach((match, index) => {
    // Add text before this match
    if (match.startIndex > lastIndex) {
      parts.push(
        <React.Fragment key={`text-${lastIndex}`}>
          {text.substring(lastIndex, match.startIndex)}
        </React.Fragment>
      );
    }
    
    // Add the highlighted term
    const termClasses = getTermClasses(match.type, match.level);
    let termContent = match.originalText;
    
    // Apply styling based on level
    if (match.level === 'emphasis') {
      termContent = <em>{termContent}</em>;
    } else if (match.level === 'strong') {
      termContent = <strong>{termContent}</strong>;
    }
    
    parts.push(
      <span 
        key={`term-${match.startIndex}`}
        className={termClasses}
        title={`${match.type.charAt(0).toUpperCase() + match.type.slice(1)} term`}
      >
        {termContent}
      </span>
    );
    
    lastIndex = match.endIndex;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(
      <React.Fragment key={`text-${lastIndex}`}>
        {text.substring(lastIndex)}
      </React.Fragment>
    );
  }
  
  return parts;
};

/**
 * Escape special regex characters in a string
 * @param {string} string - String to escape
 * @returns {string} - Escaped string safe for regex
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Renders a definition list item with term and definition
 * @param {Object} item - Definition item with term and definition
 * @param {number} index - Index for key
 * @param {Object} termDefinitions - Term definitions for highlighting
 * @returns {React.ReactNode} - Rendered definition item
 */
export const renderDefinitionItem = (item, index, termDefinitions) => {
  return (
    <div key={`def-${index}`} className="flex mb-2 last:mb-0">
      <dt className="font-semibold text-white min-w-[120px] sm:min-w-[150px] pr-2">
        {highlightTerms(item.term, termDefinitions)}
      </dt>
      <dd>{highlightTerms(item.definition, termDefinitions)}</dd>
    </div>
  );
};

/**
 * Renders a nested list structure for rules content
 * @param {Array} content - Array of content objects
 * @param {Object} termDefinitions - Term definitions for highlighting
 * @param {number} level - Current indentation level
 * @returns {React.ReactNode} - Rendered nested content
 */
export const renderNestedContent = (content, termDefinitions, level = 0) => {
  if (!content || content.length === 0) return null;
  
  return content.map((item, index) => {
    const paddingLeft = `${level * 1.5}rem`;
    
    // Handle different content types
    switch (item.type) {
      case 'paragraph':
        return (
          <p 
            key={`p-${index}`} 
            className="mb-4 last:mb-0"
            style={level > 0 ? { paddingLeft } : {}}
          >
            {highlightTerms(item.text, termDefinitions)}
          </p>
        );
        
      case 'numbered':
        return (
          <div 
            key={`num-${index}`} 
            className="mb-2 last:mb-0 flex items-start"
            style={level > 0 ? { paddingLeft } : {}}
          >
            <span className="font-medium text-brand-300 mr-2 whitespace-nowrap">
              ({item.number})
            </span>
            <div className="flex-1">
              <div className="mb-2">{highlightTerms(item.text, termDefinitions)}</div>
              {item.children && renderNestedContent(item.children, termDefinitions, level + 1)}
            </div>
          </div>
        );
        
      case 'lettered':
        return (
          <div 
            key={`let-${index}`} 
            className="mb-2 last:mb-0 flex items-start"
            style={{ paddingLeft }}
          >
            <span className="font-medium text-brand-300 mr-2 whitespace-nowrap">
              ({item.letter})
            </span>
            <div className="flex-1">
              <div className="mb-2">{highlightTerms(item.text, termDefinitions)}</div>
              {item.children && renderNestedContent(item.children, termDefinitions, level + 1)}
            </div>
          </div>
        );
        
      case 'roman':
        return (
          <div 
            key={`rom-${index}`} 
            className="mb-2 last:mb-0 flex items-start"
            style={{ paddingLeft }}
          >
            <span className="font-medium text-brand-300 mr-2 whitespace-nowrap">
              ({item.numeral})
            </span>
            <div className="flex-1">
              <div className="mb-2">{highlightTerms(item.text, termDefinitions)}</div>
              {item.children && renderNestedContent(item.children, termDefinitions, level + 1)}
            </div>
          </div>
        );
        
      case 'definition-list':
        return (
          <dl 
            key={`def-list-${index}`} 
            className="mb-4 last:mb-0"
            style={level > 0 ? { paddingLeft } : {}}
          >
            {item.items.map((defItem, defIndex) => 
              renderDefinitionItem(defItem, defIndex, termDefinitions)
            )}
          </dl>
        );
        
      case 'amendment':
        return (
          <div 
            key={`amend-${index}`}
            className="mt-4 sm:mt-6 p-3 sm:p-5 rounded-lg bg-dark-800/50 border-l-4 border-accent-500"
            style={level > 0 ? { paddingLeft } : {}}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-2 sm:mr-3 mt-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-accent-400"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 2v6h6"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H9H8"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-accent-400 font-semibold text-xs sm:text-sm mb-1">{item.title}</h4>
                <div>
                  {renderNestedContent(item.content, termDefinitions, 0)}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  });
};