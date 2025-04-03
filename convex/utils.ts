export const generateRandomUserName = (minLength = 6, maxLength = 6) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const usernameLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength

  return Array.from({ length: usernameLength }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join("")
}
