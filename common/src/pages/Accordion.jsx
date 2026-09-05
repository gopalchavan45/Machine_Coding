import React, { useState } from 'react';

/**
 * Enterprise-Grade Accordion Component
 * 
 * @param {Array} items - Dynamic array of objects [{ id, title, content }]
 * @param {boolean} allowMultiple - Allows multiple panels to remain open simultaneously (default: false)
 */
export default function Accordion({ items = [], allowMultiple = false }) {
  // Track open items as an array of IDs to support both single and multi-expand modes
  const [openIds, setOpenIds] = useState([]);

  const handleToggle = (id) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (isOpen) {
        // Close item if already open
        return prev.filter((itemId) => itemId !== id);
      } else {
        // If allowMultiple is true, append; otherwise replace with just this ID
        return allowMultiple ? [...prev, id] : [id];
      }
    });
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        No accordion items provided.
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto divide-y divide-slate-800 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const contentId = `accordion-content-${item.id}`;
        const buttonId = `accordion-button-${item.id}`;

        return (
          <div key={item.id} className="transition-colors">
            <h3>
              {/* Accessible Header Button */}
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => handleToggle(item.id)}
                className="flex items-center justify-between w-full p-5 text-left font-medium text-slate-200 hover:bg-slate-800/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <span className="text-base">{item.title}</span>
                
                {/* Animated Chevron Icon */}
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ease-in-out ${
                    isOpen ? 'rotate-180 text-indigo-400' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </h3>

            {/* Industrial Smooth Height Transition (CSS Grid Trick) */}
            <div
              id={contentId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-5 pt-0 text-sm text-slate-400 leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}