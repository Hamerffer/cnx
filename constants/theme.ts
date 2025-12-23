import { scale, verticalScale } from "@/utils/styling";

export const colors = {
  /* Brand / Accent (MT Blue) */
  primary: "#2463eb", // main blue (prices, buttons)
  primaryLight: "#8cc4ff",
  primaryDark: "#1f6fd1",

  /* Backgrounds */
  background: "#0b0c0f", // app background (almost black)
  surface: "#121317", // cards / sheets
  surfaceLight: "#1a1c22", // slightly elevated surfaces

  /* Text */
  textPrimary: "#ffffff", // main text
  textSecondary: "#9ca3af", // grey text (timestamps, labels)
  textMuted: "#6b7280",

  /* Trading Colors */
  buy: "#4da3ff", // blue (bid / buy)
  sell: "#ef4444", // red (ask / sell)
  positive: "#22c55e", // profit green
  negative: "#ef4444", // loss red

  /* Borders & Dividers */
  border: "#24262d",
  divider: "#1f2026",

  /* Neutral Scale */
  neutral50: "#f9fafb",
  neutral100: "#e5e7eb",
  neutral200: "#d1d5db",
  neutral300: "#9ca3af",
  neutral400: "#6b7280",
  neutral500: "#4b5563",
  neutral600: "#374151",
  neutral700: "#1f2933",
  neutral800: "#111827",
  neutral900: "#030712",

  /* Utility */
  white: "#ffffff",
  black: "#000000",
};

export const spacingX = {
  _3: scale(3),
  _5: scale(5),
  _7: scale(7),
  _10: scale(10),
  _12: scale(12),
  _15: scale(15),
  _20: scale(20),
  _25: scale(25),
  _30: scale(30),
  _35: scale(35),
  _40: scale(40),
};

export const spacingY = {
  _5: verticalScale(5),
  _7: verticalScale(7),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _25: verticalScale(25),
  _30: verticalScale(30),
  _35: verticalScale(35),
  _40: verticalScale(40),
  _50: verticalScale(50),
  _60: verticalScale(60),
};

export const radius = {
  _3: verticalScale(3),
  _6: verticalScale(6),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _30: verticalScale(30),
  _40: verticalScale(40),
  _50: verticalScale(50),
  _60: verticalScale(60),
  _70: verticalScale(70),
  _80: verticalScale(80),
  _90: verticalScale(90),
  full: 200,
};
