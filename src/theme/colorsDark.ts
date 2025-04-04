const palette = {
  black: "#131f24",

  primary: "#51bd02",

  muted: "#202f36",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  gray: "#202f36",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
  overlay70: "rgba(25, 16, 21, 0.7)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: "#F1F7FB",
  textDim: "#9ca3af",
  background: palette.black,
  border: palette.muted,
  tint: palette.primary,
  tintInactive: palette.muted,
  separator: palette.muted,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
