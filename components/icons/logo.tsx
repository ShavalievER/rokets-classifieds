'use client';

import clsx from 'clsx';
import { useState, useEffect } from 'react';

// Logo file detection:
// The component will automatically try to load the logo from:
// - /rokets-logo.svg (SVG format, recommended)
// - /rokets-logo.png (PNG format)
// If the file is not found, it will fall back to the inline SVG logo.
//
// To add your logo:
// 1. Download the logo from Google Drive: https://drive.google.com/file/d/1Ak2AEGt3TKIB9-ZKkX0C63IRElJuHDV-/view?usp=sharing
// 2. Save it as "rokets-logo.svg" or "rokets-logo.png" in the commerce/public/ folder
// 3. Restart the dev server if it's running (important!)
// 4. The logo will be automatically used!

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to load PNG first (it exists), then SVG
    const pngImg = new Image();
    
    pngImg.onload = () => {
      setLogoSrc('/rokets-logo.png');
      setIsLoading(false);
    };
    
    pngImg.onerror = () => {
      // If PNG fails, try SVG
      const svgImg = new Image();
      svgImg.onload = () => {
        setLogoSrc('/rokets-logo.svg');
        setIsLoading(false);
      };
      svgImg.onerror = () => {
        // Both failed, use fallback
        setLogoSrc(null);
        setIsLoading(false);
      };
      svgImg.src = '/rokets-logo.svg';
    };
    
    pngImg.src = '/rokets-logo.png';
  }, []);

  // Show external logo if available
  if (!isLoading && logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={`${process.env.NEXT_PUBLIC_SITE_NAME || 'Rokets'} logo`}
        className={clsx('object-contain', props.className)}
      />
    );
  }

  // Fallback to inline SVG if external logo is not found
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.NEXT_PUBLIC_SITE_NAME || 'Rokets'} logo`}
      viewBox="0 0 24 28"
      {...props}
      className={clsx('fill-black dark:fill-white', props.className)}
    >
      {/* Rocket body */}
      <path d="M12 2L8 10L8 18L12 24L16 18L16 10L12 2Z" />
      {/* Rocket nose */}
      <path d="M12 2L10 6L12 10L14 6L12 2Z" />
      {/* Rocket fins */}
      <path d="M8 10L4 14L6 16L8 14L8 10Z" />
      <path d="M16 10L16 14L18 16L20 14L16 10Z" />
      {/* Rocket window */}
      <circle cx="12" cy="14" r="1.5" fill="white" className="dark:fill-black" />
      {/* Rocket flame */}
      <path d="M10 18L12 22L14 18L12 20L10 18Z" />
    </svg>
  );
}
