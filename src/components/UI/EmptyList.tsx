import { TextStyle, View, ViewStyle } from "react-native"
import React from "react"
import SmartImage from "./SmartImage"
import { Text } from "../Text"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const EmptyList = () => {
  const { themed } = useAppTheme()
  return (
    <View style={$container}>
      <SmartImage
        imgKey="empty.png"
        style={{
          width: 84,
          height: 84,
        }}
      />
      <Text size="md" weight="medium" style={themed($title)}>
        Ready to start a challenge?
      </Text>
      <Text size="sm" style={themed($subtitle)}>
        Tap the "+" below to create a new challenge
      </Text>
    </View>
  )
}

export default EmptyList

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $title: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.text,
  paddingVertical: spacing.xxs,
  textAlign: "center",
})

const $subtitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  textAlign: "center",
})
