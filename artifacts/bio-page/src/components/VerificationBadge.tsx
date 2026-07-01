import React from 'react';

export function VerificationBadge() {
  return (
    <div className="relative inline-flex items-center justify-center ml-1.5" title="Verified">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform hover:scale-110 transition-transform cursor-help">
        {/* Blue circle background */}
        <circle cx="11" cy="11" r="11" fill="#1D9BF0"/>
        {/* White checkmark */}
        <path d="M7 11.5L9.8 14.5L15.5 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
