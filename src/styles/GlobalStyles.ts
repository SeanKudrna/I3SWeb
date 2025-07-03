/**
 * Global styles - Clean Modern Retro Gaming Theme
 */

import { createGlobalStyle } from 'styled-components';
import { COLORS, TRANSITIONS, PIXEL_PATTERNS } from '../utils/constants';

export const GlobalStyles = createGlobalStyle`
  /* Import clean gaming fonts */
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${COLORS.background};
    color: ${COLORS.text.primary};
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
    
    /* Subtle pixel grid background */
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("${PIXEL_PATTERNS.dots}");
      opacity: 0.4;
      z-index: -1;
      pointer-events: none;
    }
    
    /* Subtle gradient overlay */
    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
      z-index: -1;
      pointer-events: none;
      animation: subtleFloat 20s ease-in-out infinite;
    }
  }

  /* Clean modern typography with retro touches */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: ${COLORS.text.primary};
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
    
    &.hero {
      font-size: clamp(3rem, 8vw, 6rem);
      line-height: 0.9;
    }
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    color: ${COLORS.text.primary};
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 3px;
      background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary});
      border-radius: 2px;
    }
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: ${COLORS.primary};
  }

  h4 {
    font-size: 1.25rem;
    color: ${COLORS.accent};
    font-weight: 500;
  }

  p {
    margin-bottom: 1rem;
    font-weight: 400;
    color: ${COLORS.text.secondary};
    line-height: 1.7;
  }

  /* Clean modern links */
  a {
    color: ${COLORS.primary};
    text-decoration: none;
    transition: ${TRANSITIONS.fast};
    position: relative;

    &:hover {
      color: ${COLORS.primaryLight};
    }
    
    &.link-underline {
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary});
        transition: width 0.3s ease;
      }
      
      &:hover::after {
        width: 100%;
      }
    }
  }

  /* Modern button styles */
  button {
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-size: inherit;
    font-weight: 500;
    border: none;
    background: none;
    transition: ${TRANSITIONS.default};
    border-radius: 8px;
    
    &.btn-primary {
      background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark});
      color: white;
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      box-shadow: ${COLORS.glow.primary};
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${COLORS.glow.primary}, 0 8px 25px rgba(0, 0, 0, 0.3);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
    
    &.btn-secondary {
      background: transparent;
      color: ${COLORS.primary};
      border: 2px solid ${COLORS.primary};
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      
      &:hover {
        background: ${COLORS.primary};
        color: white;
        transform: translateY(-2px);
      }
    }
    
    &.btn-accent {
      background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.secondary});
      color: white;
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      
      &:hover {
        transform: translateY(-2px) scale(1.05);
      }
    }
    
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      transform: none !important;
    }
  }

  /* Modern form inputs */
  input, textarea, select {
    font-family: 'Space Grotesk', sans-serif;
    font-size: inherit;
    background: ${COLORS.surface};
    border: 2px solid ${COLORS.border};
    color: ${COLORS.text.primary};
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: ${TRANSITIONS.fast};
    
    &:focus {
      outline: none;
      border-color: ${COLORS.primary};
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    &::placeholder {
      color: ${COLORS.text.disabled};
    }
  }

  /* Clean image styling */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
    transition: ${TRANSITIONS.default};
  }

  /* Code elements */
  code, pre {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    background: ${COLORS.surface};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  pre {
    padding: 1rem;
    overflow-x: auto;
    border: 1px solid ${COLORS.border};
  }

  /* Utility classes */
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
    
    @media (min-width: 768px) {
      padding: 0 2rem;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .text-gradient {
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glow-text {
    text-shadow: ${COLORS.glow.primary};
  }

  .pixel-border {
    border: 2px solid ${COLORS.primary};
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, ${COLORS.primary}, ${COLORS.secondary});
      z-index: -1;
      border-radius: inherit;
    }
  }

  /* Gaming card component */
  .gaming-card {
    background: linear-gradient(135deg, ${COLORS.surface}, ${COLORS.surfaceLight});
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: ${TRANSITIONS.default};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent});
    }
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${COLORS.glow.primary}, 0 20px 40px rgba(0, 0, 0, 0.3);
      border-color: ${COLORS.primary};
    }
  }

  /* Loading states */
  .loading {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      animation: shimmer 1.5s infinite;
    }
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid ${COLORS.surface};
    border-top: 3px solid ${COLORS.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  /* Smooth animations */
  @keyframes subtleFloat {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg); 
    }
    50% { 
      transform: translateY(-10px) rotate(1deg); 
    }
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Scroll animations */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    
    &.in-view {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Modern scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${COLORS.surface};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
    border-radius: 4px;
    
    &:hover {
      background: linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.secondaryLight});
    }
  }

  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${COLORS.primary} ${COLORS.surface};
  }

  /* Modern selection */
  ::selection {
    background-color: rgba(99, 102, 241, 0.3);
    color: ${COLORS.text.primary};
  }

  /* Focus visible */
  :focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
    border-radius: 4px;
  }

  /* Print styles */
  @media print {
    body {
      background: white;
      color: black;
      
      &::before,
      &::after {
        display: none;
      }
    }

    .no-print {
      display: none !important;
    }
    
    h1, h2, h3, h4, h5, h6 {
      color: black !important;
      background: none !important;
      -webkit-text-fill-color: initial !important;
    }
  }

  /* Mobile optimizations */
  @media (max-width: 768px) {
    body {
      font-size: 16px;
      line-height: 1.5;
    }
    
    .container {
      padding: 0 1rem;
    }
    
    .gaming-card {
      padding: 1rem;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    body {
      background: black;
      color: white;
    }
    
    .gaming-card {
      border: 2px solid white;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;