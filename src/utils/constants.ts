/**
 * Application constants - Clean Modern Retro Gaming Theme
 */

export const SITE_NAME = 'Innovative 3D Shop';
export const SITE_DESCRIPTION = 'Premium 3D printed accessories for retro gaming enthusiasts';
export const ETSY_SHOP_URL = 'https://www.etsy.com/shop/Innovative3DShop';

export const SORT_OPTIONS = [
  { value: 'created-desc', label: '🆕 Latest Drops', sort_on: 'created', sort_order: 'desc' },
  { value: 'created-asc', label: '🎮 Retro First', sort_on: 'created', sort_order: 'asc' },
  { value: 'price-asc', label: '💰 Budget Friendly', sort_on: 'price', sort_order: 'asc' },
  { value: 'price-desc', label: '💎 Premium Gear', sort_on: 'price', sort_order: 'desc' },
  { value: 'updated-desc', label: '⚡ Fresh Updates', sort_on: 'updated', sort_order: 'desc' },
] as const;

export const ITEMS_PER_PAGE = 12;

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Clean Modern Retro Gaming Palette
export const COLORS = {
  // Primary Brand Colors - Clean and Modern
  primary: '#6366F1',        // Modern indigo 
  primaryDark: '#4F46E5',    // Darker indigo
  primaryLight: '#818CF8',   // Light indigo
  
  // Accent Colors - Gaming Inspired
  secondary: '#EC4899',      // Modern pink
  secondaryDark: '#DB2777',  // Darker pink  
  secondaryLight: '#F472B6', // Light pink
  
  // Highlight Colors - Retro Gaming
  accent: '#F59E0B',         // Gaming orange/amber
  accentGreen: '#10B981',    // Success green
  accentBlue: '#3B82F6',     // Info blue
  accentPurple: '#8B5CF6',   // Purple accent
  
  // Neutral Base - Clean Modern
  background: '#0F172A',     // Slate 900 - dark but not black
  backgroundLight: '#1E293B', // Slate 800
  surface: '#334155',        // Slate 700
  surfaceLight: '#475569',   // Slate 600
  
  // Special Effect Colors
  glow: {
    primary: '0 0 20px rgba(99, 102, 241, 0.4)',
    secondary: '0 0 20px rgba(236, 72, 153, 0.4)',
    accent: '0 0 20px rgba(245, 158, 11, 0.4)',
    success: '0 0 20px rgba(16, 185, 129, 0.4)',
  },
  
  // Status Colors - Modern
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  success: '#10B981',
  
  // Text Colors - High Contrast
  text: {
    primary: '#F8FAFC',      // Slate 50
    secondary: '#CBD5E1',    // Slate 300
    disabled: '#64748B',     // Slate 500
    accent: '#6366F1',       // Primary color
  },
  
  border: 'rgba(203, 213, 225, 0.2)',  // Slate 300 with opacity
  divider: 'rgba(203, 213, 225, 0.1)', // Slate 300 with less opacity
} as const;

// Modern shadows with subtle glow effects
export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  glow: '0 0 20px rgba(99, 102, 241, 0.3)',
  glowHover: '0 0 30px rgba(99, 102, 241, 0.5)',
} as const;

export const TRANSITIONS = {
  default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const;

export const Z_INDEX = {
  dropdown: 1000,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
} as const;

// Gaming-specific constants
export const GAMING_EMOJIS = {
  controller: '🎮',
  joystick: '🕹️',
  trophy: '🏆',
  star: '⭐',
  fire: '🔥',
  lightning: '⚡',
  gem: '💎',
  rocket: '🚀',
  new: '🆕',
  dollar: '💰',
} as const;

// Retro console brand colors for accents
export const CONSOLE_COLORS = {
  nintendo: '#E60012',
  playstation: '#003087',
  xbox: '#107C10',
  sega: '#1C1C1C',
  atari: '#D62D20',
  arcade: '#FFD700',
} as const;

// Pixel art patterns for backgrounds
export const PIXEL_PATTERNS = {
  dots: `data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${COLORS.primary.slice(1)}' fill-opacity='0.05'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E`,
  grid: `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23${COLORS.border.slice(5, -1)}' stroke-width='1'%3E%3Cpath d='m0 0h40v40h-40z'/%3E%3C/g%3E%3C/svg%3E`,
  pixels: `data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${COLORS.accent.slice(1)}' fill-opacity='0.03'%3E%3Crect x='8' y='8' width='2' height='2'/%3E%3Crect x='24' y='24' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E`,
} as const;