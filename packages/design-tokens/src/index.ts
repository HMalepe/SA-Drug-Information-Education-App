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
  /** Hairline borders on mist backgrounds */
  line: "#CBD5E1",
  lineSoft: "#DBE3EA",
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
  /** Absolute px for React Native StyleSheet (multipliers are for web/CSS) */
  lineHeightPx: {
    sm: 20,
    md: 22,
  },
} as const;

export const space = {
  xs: 4,
  /** Compact chip / control vertical padding */
  chipY: 6,
  sm: 8,
  /** Mid control vertical padding (mode framing, toxicity steps) */
  controlY: 10,
  /** Compact chip / control horizontal padding (also input vertical mid) */
  chipX: 12,
  /** Mid control horizontal padding (inputs, clash rows) */
  controlX: 14,
  md: 16,
  /** Section / card horizontal inset (between md and lg) */
  insetX: 18,
  lg: 24,
  xl: 32,
  xxl: 48,
  /** Main shell bottom padding */
  shellBottom: 64,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  /** Full pill chips / mode toggles */
  pill: 999,
} as const;

export const motion = {
  fastMs: 160,
  baseMs: 200,
} as const;

export type MateriaColors = typeof colors;
export type ScheduleCode = keyof typeof colors.schedule;
