import { Pressable, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import React, { useEffect, useMemo } from "react"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import { format } from "date-fns/format"
import { AutoImage } from "../AutoImage"
import { useMutation, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { formattedXPNumber } from "@/utils/helper"
import Spinner from "../UI/Spinner"
import { router } from "expo-router"

const streak = require("../../../assets/images/streak.png")
const xpPoints = require("../../../assets/images/xp-points.png")

const HomeTopHeader = () => {
  const { themed } = useAppTheme()
  const today = useMemo(() => format(new Date(), "MMM dd, EEEE"), [])
  const checkStreak = useMutation(api.users.checkStreak)
  const user = useQuery(api.users.getUser, {})

  useEffect(() => {
    if (user && user.currentStreak === undefined) {
      checkStreak()
    }
  }, [user?.currentStreak])

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
          <TouchableOpacity
            activeOpacity={0.7}
            style={themed($headerAction)}
            onPress={() => {
              if (user?.isPro) {
                router.push("/(auth)/calendar-streak")
              } else {
                router.push('/(auth)/premium')
              }
            }}
          >
            <AutoImage source={streak} style={{ width: 24, height: 24 }} />
            <Text weight="bold" size="xs">
              {user?.currentStreak}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={themed($headerAction)} onPress={() => { }}>
            <AutoImage source={xpPoints} style={{ width: 24, height: 24 }} />
            {!user ? (
              <Spinner size={14} />
            ) : (
              <Text weight="bold" size="xs">
                {formattedXPNumber(user?.xp)} XP
              </Text>
            )}
          </TouchableOpacity>
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
const $headerActionButtons: ThemedStyle<ViewStyle> = ({ }) => ({
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
