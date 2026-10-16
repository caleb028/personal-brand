export const MOTION_EASING = [0.22, 1, 0.36, 1] as const;
export const MOTION_EASING_EMPHASIZED = [0.16, 1, 0.3, 1] as const;

export const MOTION_DURATIONS = {
  fast: 0.3,
  base: 0.65,
  smooth: 0.85,
  image: 0.95,
  page: 0.25,
} as const;

export const MOTION_DISTANCES = {
  sm: 16,
  base: 28,
  lg: 40,
  mobile: 18,
} as const;

export const MOTION_DELAYS = {
  stagger: 0.08,
  subtle: 0.05,
  heroStagger: 0.12,
} as const;

export const VIEWPORT_CONFIG = {
  once: false, // Triggers both when scrolling down and when scrolling upwards
  amount: 0.1,
  margin: "-10px 0px -25px 0px",
} as const;

export const DEFAULT_TRANSITION = {
  duration: MOTION_DURATIONS.base,
  ease: MOTION_EASING,
};
