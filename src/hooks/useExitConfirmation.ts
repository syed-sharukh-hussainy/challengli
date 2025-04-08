import { useState, useEffect, useCallback } from "react"
import { BackHandler } from "react-native"
import { usePathname } from "expo-router"

export function useExitConfirmation() {
  const [showExitPopup, setShowExitPopup] = useState(false)
  const pathName = usePathname()
  const handleExitPress = useCallback(() => {
    BackHandler.exitApp()
    setShowExitPopup(false)
  }, [])

  useEffect(() => {
    const handleBackPress = () => {
      if (
        pathName === "/" ||
        pathName === "/login" ||
        pathName === "/home" ||
        pathName === "/loading"
      ) {
        setShowExitPopup(true)
        return true // Prevents default back behavior
      }
      return false
    }

    BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress)
    }
  }, [pathName])

  return { showExitPopup, setShowExitPopup, handleExitPress }
}
