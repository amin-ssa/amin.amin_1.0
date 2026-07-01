import React from 'react';

export function VerificationBadge() {
  return (
    <div className="relative inline-flex items-center justify-center ml-2 badge-glow" title="Verified Exclusive">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform hover:scale-110 transition-transform cursor-help">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#goldGradient)" stroke="#FFDF00" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M12 6.5L14.1 10.75L18.7 11.45L15.35 14.7L16.15 19.3L12 17.1L7.85 19.3L8.65 14.7L5.3 11.45L9.9 10.75L12 6.5Z" fill="#FFF8DC"/>
        <path d="M10.5 14.5L12 16L15.5 12" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        
        <defs>
          <linearGradient id="goldGradient" x1="2" y1="2" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD700" />
            <stop offset="0.5" stopColor="#FFA500" />
            <stop offset="1" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
      </svg>
      {/* Sparkle effects */}
      <span className="absolute -top-1 -right-1 w-1 h-1 bg-white rounded-full animate-ping opacity-75"></span>
      <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse opacity-50"></span>
    </div>
  );
}
