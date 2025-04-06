import { View, ViewStyle, TextStyle } from "react-native"
import React, { useEffect, useState } from "react"
import { ThemedStyle } from "@/theme"
import { Text } from "../Text"
import { useAppTheme } from "@/utils/useAppTheme"

const WeeklyCountDownTimer = () => {
  const { themed } = useAppTheme()
  const [timeLeft, setTimeLeft] = useState("")
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const nextReset = new Date()

      const currentDay = now.getUTCDay()
      const daysUntilMonday = currentDay === 0 ? 1 : 8 - currentDay

      nextReset.setUTCDate(now.getUTCDate() + daysUntilMonday)
      nextReset.setUTCHours(0, 0, 0, 0)

      const difference = nextReset.getTime() - now.getTime()
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      return `Resets in ${days}d ${hours}hr`
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 60000)

    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [])

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View style={themed($wrapper)}>
        <Text size="sm" weight="bold" style={themed($label)}>
          {timeLeft}
        </Text>
      </View>
    </View>
  )
}

export default WeeklyCountDownTimer

const $wrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primary,
  marginTop: spacing.md,
  borderRadius: 24,
})

const $label: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: "white",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xxs,
})
