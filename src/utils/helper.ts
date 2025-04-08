export const formattedXPNumber = (num: number): string => {
  if (num < 1000) return num.toString()

  if (num >= 1000 && num < 1_00_000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K" // Thousands
  } else if (num >= 1_00_000 && num < 1_00_00_000) {
    return (num / 1_00_000).toFixed(1).replace(/\.0$/, "") + "L" // Lakhs
  } else if (num >= 1_00_00_000 && num < 1_00_00_00_000) {
    return (num / 1_00_00_000).toFixed(1).replace(/\.0$/, "") + "CR" // Crores
  } else if (num >= 1_00_00_00_000) {
    return (num / 1_00_00_00_000).toFixed(1).replace(/\.0$/, "") + "AR" // Arab
  } else if (num >= 1_00_00_00_00_000) {
    return (num / 1_00_00_00_00_000).toFixed(1).replace(/\.0$/, "") + "KH" // Kharab
  }

  return num.toString()
}

export const getLabelByValue = (arr: { value: number; label: string }[], value: number) => {
  const item = arr.find((item) => item.value === value)
  return item ? item.label : ""
}
