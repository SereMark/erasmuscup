import React from 'react';

/**
 * Process rule text to highlight special terms and properly indent nested structure
 * @param {string} text - Raw text content
 * @param {Array} terms - Array of terms to highlight
 * @returns {JSX.Element} - React element with highlighted terms and proper indentation
 */
export const processRuleText = (text, terms) => {
  if (!terms || terms.length === 0) {
    // If no terms to highlight, simply process the paragraphs with indentation
    return formatTextWithIndentation(text);
  }

  // Define term colors based on category
  const termColors = {
    brand: 'text-brand-400 font-medium hover:underline cursor-help transition-colors',
    accent: 'text-accent-400 font-medium hover:underline cursor-help transition-colors',
    success: 'text-success-400 font-medium hover:underline cursor-help transition-colors',
    danger: 'text-red-400 font-medium hover:underline cursor-help transition-colors',
    info: 'text-info-400 font-medium hover:underline cursor-help transition-colors'
  };

  // Split the text into paragraphs and process each one
  return (
    <>
      {text.split('\n\n').map((paragraph, pIndex) => {
        // Skip empty paragraphs
        if (!paragraph.trim()) return null;

        // Check if this is a paragraph with nested content
        if (hasNestedStructure(paragraph)) {
          return formatNestedStructure(paragraph, pIndex, terms, termColors);
        }
        
        // Process regular paragraphs with term highlighting
        return formatRegularParagraph(paragraph, pIndex, terms, termColors);
      })}
    </>
  );
};

/**
 * Format text with proper indentation without term highlighting
 * @param {string} text - Text to format
 * @returns {JSX.Element} - Formatted text with indentation
 */
const formatTextWithIndentation = (text) => {
  return (
    <>
      {text.split('\n\n').map((paragraph, pIndex) => {
        // Skip empty paragraphs
        if (!paragraph.trim()) return null;
        
        // Check if this is a paragraph with nested content
        if (hasNestedStructure(paragraph)) {
          return formatNestedStructureNoHighlight(paragraph, pIndex);
        }
        
        // Regular paragraph
        return <p key={`p-${pIndex}`} className="mb-4 last:mb-0">{paragraph}</p>;
      })}
    </>
  );
};

/**
 * Check if a paragraph contains nested structure (numbered or lettered items)
 * @param {string} paragraph - Paragraph to check
 * @returns {boolean} - True if paragraph contains nested structure
 */
const hasNestedStructure = (paragraph) => {
  // Check for patterns like (a), (b), (i), (ii), etc.
  return /\([a-z]+\)|\([ivx]+\)|\(\d+\)/.test(paragraph) || 
         // Check for patterns like (a), (b) at the beginning
         /^\s*\([a-z]+\)|\([ivx]+\)|\(\d+\)/.test(paragraph) || 
         // Check for numbered items
         /^\s*\d+\.\s/.test(paragraph);
};

/**
 * Format a nested structure without highlighting terms
 * @param {string} paragraph - Paragraph with nested structure
 * @param {number} pIndex - Paragraph index
 * @returns {JSX.Element} - Formatted nested structure
 */
const formatNestedStructureNoHighlight = (paragraph, pIndex) => {
  // Split the paragraph into lines to find the nested structure
  const lines = splitNestedStructure(paragraph);
  
  return (
    <div key={`nested-${pIndex}`} className="mb-4 last:mb-0">
      {lines.map((line, lineIndex) => {
        const { text, level, marker } = line;
        
        return (
          <div 
            key={`line-${pIndex}-${lineIndex}`} 
            className={`flex items-start mb-1 last:mb-0`}
            style={{ paddingLeft: `${level * 1.5}rem` }}
          >
            {marker && (
              <span className="mr-2 font-medium text-brand-300 whitespace-nowrap">{marker}</span>
            )}
            <span>{text}</span>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Format a nested structure with term highlighting
 * @param {string} paragraph - Paragraph with nested structure
 * @param {number} pIndex - Paragraph index
 * @param {Array} terms - Terms to highlight
 * @param {Object} termColors - Colors for different term types
 * @returns {JSX.Element} - Formatted nested structure with highlighted terms
 */
const formatNestedStructure = (paragraph, pIndex, terms, termColors) => {
  // Split the paragraph into lines to find the nested structure
  const lines = splitNestedStructure(paragraph);
  
  return (
    <div key={`nested-${pIndex}`} className="mb-4 last:mb-0">
      {lines.map((line, lineIndex) => {
        const { text, level, marker } = line;
        
        // Highlight terms in this line
        const highlightedText = highlightTerms(text, terms, termColors);
        
        return (
          <div 
            key={`line-${pIndex}-${lineIndex}`} 
            className={`flex items-start mb-1 last:mb-0`}
            style={{ paddingLeft: `${level * 1.5}rem` }}
          >
            {marker && (
              <span className="mr-2 font-medium text-brand-300 whitespace-nowrap">{marker}</span>
            )}
            <div className="flex-1">{highlightedText}</div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * Split a paragraph into lines with nested structure information
 * @param {string} paragraph - Paragraph to split
 * @returns {Array} - Array of objects with text, level, and marker
 */
const splitNestedStructure = (paragraph) => {
  // Handle different types of nested structures
  
  // Check if this is a simple numbered item
  if (/^\d+\.\s/.test(paragraph)) {
    const matches = paragraph.match(/^(\d+\.\s)(.*)/s);
    if (matches) {
      return [{ text: matches[2], level: 0, marker: matches[1] }];
    }
  }
  
  // Process paragraph to extract nested structures
  const lines = [];
  
  // Main pattern regex for nested items
  const patterns = [
    // For (a), (b), etc.
    { regex: /\(([a-z])\)\s/g, level: 1 },
    // For (i), (ii), etc.
    { regex: /\(([ivx]+)\)\s/g, level: 2 },
    // For (1), (2), etc.
    { regex: /\((\d+)\)\s/g, level: 1 }
  ];
  
  // Find all matches for all patterns
  let allMatches = [];
  
  patterns.forEach(pattern => {
    let match;
    const { regex } = pattern;
    regex.lastIndex = 0; // Reset regex state
    
    while ((match = regex.exec(paragraph)) !== null) {
      allMatches.push({
        pattern,
        match,
        index: match.index,
        endIndex: match.index + match[0].length
      });
    }
  });
  
  // Sort matches by their position in the text
  allMatches.sort((a, b) => a.index - b.index);
  
  // If no matches, return the whole paragraph as one line
  if (allMatches.length === 0) {
    return [{ text: paragraph, level: 0, marker: null }];
  }
  
  // Process the beginning of the paragraph if needed
  if (allMatches[0].index > 0) {
    lines.push({
      text: paragraph.substring(0, allMatches[0].index).trim(),
      level: 0,
      marker: null
    });
  }
  
  // Process each match and the text between matches
  for (let i = 0; i < allMatches.length; i++) {
    const currentMatch = allMatches[i];
    const nextMatch = allMatches[i + 1];
    
    const marker = `(${currentMatch.match[1]})`;
    const endIndex = nextMatch ? nextMatch.index : paragraph.length;
    let text = paragraph.substring(currentMatch.endIndex, endIndex).trim();
    
    // Add this line
    lines.push({
      text,
      level: currentMatch.pattern.level,
      marker
    });
  }
  
  return lines;
};

/**
 * Format a regular paragraph with term highlighting
 * @param {string} paragraph - Paragraph to format
 * @param {number} pIndex - Paragraph index
 * @param {Array} terms - Terms to highlight
 * @param {Object} termColors - Colors for different term types
 * @returns {JSX.Element} - Formatted paragraph with highlighted terms
 */
const formatRegularParagraph = (paragraph, pIndex, terms, termColors) => {
  // Check for special paragraph formats
  if (paragraph.startsWith('•')) {
    // Handle bullet points
    return (
      <div key={`p-${pIndex}`} className="flex mb-4 last:mb-0">
        <span className="mr-2">•</span>
        <div>{highlightTerms(paragraph.substring(1).trim(), terms, termColors)}</div>
      </div>
    );
  } else if (paragraph.match(/^\d+\.\s/)) {
    // Handle numbered items
    const matches = paragraph.match(/^(\d+\.\s)(.*)/s);
    if (matches) {
      return (
        <div key={`p-${pIndex}`} className="flex mb-4 last:mb-0">
          <span className="mr-2 font-medium text-brand-300">{matches[1]}</span>
          <div>{highlightTerms(matches[2], terms, termColors)}</div>
        </div>
      );
    }
  }
  
  // Regular paragraphs
  return (
    <p key={`p-${pIndex}`} className="mb-4 last:mb-0">
      {highlightTerms(paragraph, terms, termColors)}
    </p>
  );
};

/**
 * Highlight terms in a text
 * @param {string} text - Text to process
 * @param {Array} terms - Terms to highlight
 * @param {Object} termColors - Colors for different term types
 * @returns {Array} - Array of React elements with highlighted terms
 */
const highlightTerms = (text, terms, termColors) => {
  const segments = [];
  let lastIndex = 0;
  
  // Sort terms by length (longest first) to avoid highlighting substrings
  const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);
  
  // Create a map to efficiently find all term occurrences in the text
  const occurrences = [];
  
  for (const termObj of sortedTerms) {
    const { term, type, level } = termObj;
    
    // Case-insensitive global search
    const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'gi');
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      occurrences.push({
        term: match[0], // Use the actual case from the text
        type,
        level,
        start: match.index,
        end: match.index + match[0].length
      });
    }
  }
  
  // Sort occurrences by start position
  occurrences.sort((a, b) => a.start - b.start);
  
  // Filter out overlapping occurrences
  const filteredOccurrences = [];
  let lastEnd = -1;
  
  for (const occurrence of occurrences) {
    if (occurrence.start >= lastEnd) {
      filteredOccurrences.push(occurrence);
      lastEnd = occurrence.end;
    }
  }
  
  // Build the segments
  for (const occurrence of filteredOccurrences) {
    // Add text before the term
    if (occurrence.start > lastIndex) {
      segments.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, occurrence.start)}
        </span>
      );
    }
    
    // Determine styling based on level and type
    const className = termColors[occurrence.type] || 'text-brand-400 font-medium';
    const emphasize = occurrence.level === 'emphasis';
    const strengthen = occurrence.level === 'strong';
    
    // Add the highlighted term
    segments.push(
      <span 
        key={`term-${occurrence.start}`}
        className={className}
        title={`${occurrence.type.charAt(0).toUpperCase() + occurrence.type.slice(1)} term`}
      >
        {emphasize ? <em>{occurrence.term}</em> : 
         strengthen ? <strong>{occurrence.term}</strong> : 
         occurrence.term}
      </span>
    );
    
    lastIndex = occurrence.end;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    segments.push(
      <span key={`text-${lastIndex}`}>
        {text.substring(lastIndex)}
      </span>
    );
  }
  
  return segments.length > 0 ? segments : text;
};

/**
 * Escape special characters in a string for use in a regular expression
 * @param {string} string - String to escape
 * @returns {string} - Escaped string
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};