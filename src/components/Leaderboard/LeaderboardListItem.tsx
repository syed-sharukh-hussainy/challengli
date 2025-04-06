import { View, Pressable, ViewStyle } from "react-native"
import React, { useCallback } from "react"
import { ThemedStyle } from "@/theme"
import { Id } from "convex/_generated/dataModel"
import { useAppTheme } from "@/utils/useAppTheme"
import SmartImage from "../UI/SmartImage"
import { Text } from "../Text"
import { AutoImage } from "../AutoImage"
import { useUser } from "@clerk/clerk-expo"

type Props = {
  item: {
    _id: Id<"leaderboard">
    _creationTime: number
    type: string
    userId: string
    imageUrl: string
    firstName: string
    lastName: string
    xp: number
  }
  length: number
  index: number
}

const LeaderboardListItem = ({ item, index, length }: Props) => {
  const { theme, themed } = useAppTheme()
  const isFirst = index === 0
  const { user } = useUser()
  const isLast = index === length - 1

  const $borderStyles: ViewStyle = {
    borderTopLeftRadius: isFirst ? 24 : 0,
    borderTopRightRadius: isFirst ? 24 : 0,
    borderBottomRightRadius: isLast ? 24 : 0,
    borderBottomLeftRadius: isLast ? 24 : 0,
    borderBottomWidth: isLast ? 2 : 0,
  }

  const getMedals = useCallback((index: number) => {
    switch (index) {
      case 1:
        return "first-rank.png"
      case 2:
        return "second-rank.png"
      case 3:
        return "third-rank.png"
      default:
        return null
    }
  }, [])

  return (
    <Pressable style={[themed($container), $borderStyles]}>
      <View
        style={{
          width: 32,
          alignItems: "center",
        }}
      >
        {index < 3 ? (
          <SmartImage imgKey={getMedals(index + 1) || ""} width={28} height={28} />
        ) : (
          <Text>{index + 1}</Text>
        )}
      </View>
      <AutoImage
        source={{
          uri: item.imageUrl,
        }}
        style={{
          height: 40,
          width: 40,
          marginLeft: 12,
        }}
      />
      <View
        style={{
          flex: 1,
          marginLeft: 12,
        }}
      >
        <Text
          size="xs"
          weight="semiBold"
          numberOfLines={1}
          style={{
            overflow: "hidden",
            color: user?.id === item.userId ? theme.colors.palette.primary : theme.colors.text,
          }}
        >
          {item.firstName} {item.lastName} {user?.id === item.userId ? " (You)" : ""}
        </Text>
        <Text
          size="xxs"
          style={{
            color: user?.id === item.userId ? theme.colors.palette.primary : theme.colors.text,
          }}
        >
          {item.xp} XP
        </Text>
      </View>
    </Pressable>
  )
}

export default LeaderboardListItem

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 80,
  borderWidth: 2,
  borderColor: colors.border,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: spacing.md,
})
