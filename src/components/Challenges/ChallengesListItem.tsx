import { TouchableOpacity, View, ViewStyle } from "react-native"
import React from "react"
import { spacing, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import SmartImage from "../UI/SmartImage"
import { router } from "expo-router"

type Props = {
  title: string
  description: string
  image: string
  challengeId: string
  duration: number
  primaryColor: string
  isChallengePresent: boolean
  status: string
}

const ChallengesListItem = ({
  challengeId,
  description,
  duration,
  image,
  title,
  primaryColor,
  status,
  isChallengePresent,
}: Props) => {
  const { themed } = useAppTheme()
  const onChallengePressed = () => {
    if (isChallengePresent) {
      router.push(`/(auth)/created-challenge-details/${challengeId}`)
    } else {
      router.push(`/(auth)/preset-challenge-details/${challengeId}`)
    }
  }
  return (
    <TouchableOpacity
      onPress={onChallengePressed}
      activeOpacity={0.8}
      style={themed($btnContainer)}
    >
      <View style={{ width: "70%", alignItems: "flex-start", gap: 4 }}>
        <Text
          style={themed(({ colors }) => ({
            color: isChallengePresent ? colors.textDim : colors.text,
            textDecorationLine: isChallengePresent ? "line-through" : "none",
          }))}
          size="sm"
          weight="bold"
        >
          {title}
        </Text>
        <Text
          style={themed(({ colors }) => ({
            color: colors.textDim,
            textDecorationLine: isChallengePresent ? "line-through" : "none",
          }))}
          size="xs"
          weight="normal"
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>
      <View style={$smartImage}>
        <SmartImage imgKey={image} style={{ width: 116, height: 116 }} />
      </View>
      <View
        style={{
          backgroundColor: primaryColor,
          position: "absolute",
          top: 0,
          right: 0,
          borderBottomLeftRadius: 12,
        }}
      >
        <Text
          size="xxs"
          weight="semiBold"
          style={{
            color: "#fff",
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.xxxs,
          }}
        >
          {duration} DAYS
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ChallengesListItem

const $btnContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginBottom: spacing.md,
  height: 156,
  overflow: "hidden",
  backgroundColor: colors.tintInactive,
  borderRadius: 24,
  justifyContent: "center",
  paddingHorizontal: spacing.md,
})

const $smartImage: ViewStyle = {
  position: "absolute",
  bottom: -16,
  right: -16,
}
