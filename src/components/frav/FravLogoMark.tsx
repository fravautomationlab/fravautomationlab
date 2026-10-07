import React from 'react';

interface FravLogoMarkProps {
  className?: string;
}

export const FravLogoMark: React.FC<FravLogoMarkProps> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 100 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="currentColor" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M3 5H63M23 5V43M23 17H51M23 28H44" />
      <path d="M43 43L61 5L77 43M51 28H71M77 41H97" />
    </g>
  </svg>
);
