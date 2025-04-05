import { View, TouchableOpacity, ViewStyle } from "react-native"
import React from "react"
import { useRouter } from "expo-router"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import SmartImage from "../UI/SmartImage"
import { Text } from "../Text"
import { FontAwesome6 } from "@expo/vector-icons"

type Props = {
  userChallengeId: string | undefined
  length: number | undefined
  index: number
  image: string
  title: string
  color: {
    primary: string
    secondary: string
  }
  activity: {
    status?: string | undefined
    date?: string | undefined
    title: string
    day: number
    task: string
  }
  duration: number
}

const HomeChallengesListItem = ({
  activity,
  userChallengeId,
  image,
  index,
  length,
  title,
  color,
  duration,
}: Props) => {
  const router = useRouter()
  const { themed } = useAppTheme()
  const isCompleted = activity.status === "COMPLETED"
  const isFirst = index === 0
  const isLast = index === length

  const $borderStyles: ViewStyle = {
    borderTopLeftRadius: isFirst ? 28 : 0,
    borderTopRightRadius: isFirst ? 28 : 0,
    borderBottomRightRadius: isLast ? 28 : 0,
    borderBottomLeftRadius: isLast ? 28 : 0,
    borderBottomWidth: isLast ? 2 : 0,
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[themed($btnContainer), $borderStyles]}
      onPress={() => {
        router.push(`/day-activity/${userChallengeId}?query=${activity.date}`)
      }}
    >
      <SmartImage
        imgKey={image}
        style={{
          width: 56,
          height: 56,
        }}
      />
      <View style={$wrapper}>
        <View style={$textWrapper}>
          <Text
            size="xs"
            weight="semiBold"
            style={themed(() => ({
              textDecorationLine: isCompleted ? "line-through" : "none",
            }))}
            numberOfLines={1}
          >
            {title}
          </Text>
          <View
            style={{
              backgroundColor: color.primary,
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 6,
            }}
          >
            <Text
              size="xxs"
              weight="bold"
              style={{ color: "white", textDecorationLine: isCompleted ? "line-through" : "none" }}
            >
              Day {activity.day} / {duration}
            </Text>
          </View>
        </View>
        {isCompleted ? (
          <View
            style={{
              backgroundColor: color.primary,
              width: 20,
              height: 20,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome6 name="check" size={14} color="white" />
          </View>
        ) : (
          <View
            style={themed(({ isDark, colors }) => ({
              backgroundColor: isDark ? colors.palette.muted : color.secondary,
              width: 20,
              height: 20,
              borderRadius: 100,
            }))}
          ></View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default HomeChallengesListItem

const $btnContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 96,
  flexDirection: "row",
  gap: 12,
  overflow: "hidden",
  borderWidth: 2,
  borderColor: colors.border,
  paddingHorizontal: spacing.sm,
  alignItems: "center",
})

const $wrapper: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
}

const $textWrapper: ViewStyle = {
  flex: 1,
  alignItems: "flex-start",
  gap: 4,
}
