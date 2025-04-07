import { TextStyle, View, ViewStyle } from "react-native"
import React, { useEffect, useState } from "react"
import SmartImage from "./SmartImage"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import { Screen } from "../Screen"

const LoadingLogo = () => {
  const { themed } = useAppTheme()
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <Screen safeAreaEdges={["top"]} style={themed($container)}>
      <SmartImage imgKey="boarding1.png" width={96} height={96} />
      <Text size="sm" weight="bold" style={themed($loadingText)}>
        Loading{dots}
      </Text>
    </Screen>
  )
}

export default LoadingLogo

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
})

const $loadingText: ThemedStyle<TextStyle> = ({ colors }) => ({
  textTransform: "uppercase",
  color: colors.textDim,
  marginTop: 12,
})
