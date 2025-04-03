import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import React, { useMemo } from "react"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import { format } from "date-fns/format"
import { AutoImage } from "../AutoImage"

const streak = require("../../../assets/images/streak.png")
const xpPoints = require("../../../assets/images/xp-points.png")

const HomeTopHeader = () => {
  const { themed } = useAppTheme()
  const today = useMemo(() => format(new Date(), "MMM dd, EEEE"), [])
  return (
    <View style={[themed($homeTopHeader)]}>
      <View style={$wrapper}>
        <View>
          <Text size="lg" weight="bold" style={themed($title)}>
            Home
          </Text>
          <Text weight="bold" size="xxs" style={themed($subtitle)}>
            {today}
          </Text>
        </View>
        <View style={themed($headerActionButtons)}>
          <Pressable style={themed($headerAction)}>
            <AutoImage source={streak} style={{ width: 24, height: 24 }} />
            <Text weight="bold" size="xs">
              10
            </Text>
          </Pressable>
          <Pressable style={themed($headerAction)}>
            <AutoImage source={xpPoints} style={{ width: 24, height: 24 }} />
            <Text weight="bold" size="xs">
              10 XP
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default HomeTopHeader

const $homeTopHeader: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  padding: spacing.md,
  backgroundColor: colors.background,
  borderBottomWidth: 2,
  borderBottomColor: colors.border,
})

const $wrapper: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
}

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $subtitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
const $headerActionButtons: ThemedStyle<ViewStyle> = ({}) => ({
  flexDirection: "row",
  gap: 8,
})

const $headerAction: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  padding: spacing.sm,
  gap: 4,
  borderRadius: 100,
  backgroundColor: colors.palette.muted,
})
