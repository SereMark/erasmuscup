import React from 'react';

/**
 * Table of Contents component
 */
const TableOfContents = ({ data, currentSectionId, onSectionClick }) => {
  // Handle section click
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    onSectionClick(sectionId);
  };

  return (
    <div className="bg-dark-900 rounded-xl border border-dark-800 shadow-md mb-8 overflow-hidden">
      {/* Header */}
      <div className="bg-dark-800 p-4 border-b border-dark-700">
        <h3 className="text-lg font-bold text-white">Contents</h3>
      </div>
      
      {/* Table of Contents Groups */}
      <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
        <div className="space-y-4">
          {data.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4 last:mb-0">
              {/* Group Title */}
              {group.title && (
                <div className="mb-2">
                  <h4 className="text-brand-400 font-semibold text-sm mb-2">
                    {group.title}
                  </h4>
                </div>
              )}
              
              {/* Group Items */}
              <ul className="space-y-1.5 pl-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleSectionClick(e, item.id)}
                      className={`block py-1.5 px-2 text-sm rounded-md transition-colors hover:bg-dark-800 ${
                        currentSectionId === item.id
                          ? 'bg-brand-500/10 text-brand-400 font-medium border-l-2 border-brand-500 pl-2'
                          : 'text-dark-200 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;