const palette = {
  white: "#FFFFFF",

  gray100: "#f3f4f6",

  primary: "#58cc02",

  muted: "#F7F7F7",

  gray: "#e5e7eb",

  angry100: "#F2D6CD",
  angry500: "#ef4444",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
  overlay70: "rgba(25, 16, 21, 0.7)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: "#3c3c3c",
  textDim: "#777777",
  background: palette.white,
  border: palette.gray100,
  tint: palette.primary,
  tintInactive: palette.muted,
  separator: palette.muted,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
