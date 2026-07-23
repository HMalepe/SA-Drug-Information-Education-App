/**
 * Materia design tokens — per /docs/10_User_Interface.md
 * Never use magic hex values outside this package.
 */

export const colors = {
  ink: "#12283C",
  teal: "#0E7490",
  deepTeal: "#0F766E",
  slate: "#475569",
  mist: "#EEF2F6",
  mint: "#E7F6F3",
  white: "#FFFFFF",
  // Semantic (safety) — meaning-locked
  danger: "#DC2626",
  caution: "#EA580C",
  adjust: "#D97706",
  safe: "#16A34A",
  // SA schedules S0–S6
  schedule: {
    S0: "#64748B",
    S1: "#0EA5E9",
    S2: "#2563EB",
    S3: "#7C3AED",
    S4: "#DB2777",
    S5: "#B45309",
    S6: "#991B1B",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: '"Source Sans 3", "Source Sans Pro", "Segoe UI", sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    display: 32,
  },
  lineHeight: {
    tight: 1.25,
    body: 1.5,
    loose: 1.65,
  },
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;

export const motion = {
  fastMs: 160,
  baseMs: 200,
} as const;

export type MateriaColors = typeof colors;
export type ScheduleCode = keyof typeof colors.schedule;
