export const getLabelByValue = (arr: { value: number; label: string }[], value: number) => {
  const item = arr.find((item) => item.value === value)
  return item ? item.label : ""
}
