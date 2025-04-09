import React, { useMemo, useState } from "react"
import { Screen, Text } from "@/components"
import TopBar from "@/components/UI/TopBar"
import { router } from "expo-router"
import { ScrollView, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import StatItem from "@/components/Profile/StatItem"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import LoadingAnimation from "@/components/UI/LoadingAnimation"
import { format } from "date-fns"
import { FontAwesome6 } from "@expo/vector-icons"

const CalendarStreak = () => {
  const { theme, themed } = useAppTheme()
  const user = useQuery(api.users.getUser, {})
  const [currentDate, setCurrentDate] = useState(new Date())
  const today = useMemo(() => format(new Date(), "MMMM dd, EEEE"), [])
  const month = currentDate.toLocaleString("default", { month: "long" })
  const year = currentDate.getFullYear()
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate()
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay()
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1 // Adjusting Sunday index

  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
  const todayString = format(new Date(), "yyyy-MM-dd")

  const streakSet = useMemo(() => new Set(user?.streakDates), [user?.streakDates])

  const missedDays = useMemo(() => {
    const missed = new Set<number>()
    let prevDate: string | null = null

    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = `${year}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`

      if (dateString >= todayString) break // ❌ Stop at today, don't mark it as missed

      if (streakSet.has(dateString)) {
        prevDate = dateString
      } else if (prevDate && !streakSet.has(dateString)) {
        missed.add(i)
      }
    }

    return missed
  }, [user?.streakDates, year, currentDate, todayString, daysInMonth, streakSet])

  const changeMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(direction === "prev" ? prev.getMonth() - 1 : prev.getMonth() + 1)
      return newDate
    })
  }

  const getDayStyle = (day: number, dateString: string) => {
    let textColor = "gray"
    let bgColor = "transparent"

    if (streakSet.has(dateString)) {
      bgColor = "#fbbf24" // Today
      textColor = "white"
    } else if (missedDays.has(day)) {
      bgColor = theme.colors.palette.angry500 // Missed Streak Day
      textColor = "white"
    } else if (dateString === todayString) {
      bgColor = theme.colors.palette.primary // Streak Day
      textColor = "white"
    }

    return { textColor, bgColor }
  }
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar title="Streaks" onBackButtonPressed={() => router.back()} />
      <ScrollView contentContainerStyle={themed($container)} showsVerticalScrollIndicator={false}>
        {!user ? (
          <LoadingAnimation />
        ) : (
          <View>
            <View
              style={themed(({ colors, spacing }) => ({
                borderWidth: 2,
                borderColor: colors.border,
                borderRadius: 14,
                padding: spacing.md,
                alignItems: "center",
              }))}
            >
              <Text
                size="sm"
                weight="semiBold"
                style={themed(({ colors, spacing }) => ({
                  color: colors.textDim,
                }))}
              >
                Todays Date
              </Text>
              <Text
                size="md"
                weight="semiBold"
                style={themed(({ colors, spacing }) => ({
                  color: colors.text,
                }))}
              >
                {today}
              </Text>
            </View>
            <View style={themed($wrapper)}>
              <StatItem
                image="streak.png"
                value={user?.currentStreak}
                label="Current Streak"
                isLoading={false}
              />
              <StatItem
                image="best-streak.png"
                value={user?.longestStreak}
                label="Best Streak"
                isLoading={false}
              />
            </View>
            <View style={themed($calendarContainer)}>
              <View style={themed($calendarHeader)}>
                <TouchableOpacity onPress={() => changeMonth("prev")}>
                  <FontAwesome6 name="chevron-left" size={20} color="#4b5563" />
                </TouchableOpacity>

                <Text size="md" weight="bold">
                  {month} {year}
                </Text>

                <TouchableOpacity onPress={() => changeMonth("next")}>
                  <FontAwesome6 name="chevron-right" size={20} color="#4b5563" />
                </TouchableOpacity>
              </View>
              <View style={themed($weekHeader)}>
                {weekdays.map((day) => (
                  <Text style={themed($weekLabel)} key={day} size="sm" weight="medium">
                    {day}
                  </Text>
                ))}
              </View>
              <View style={{}}>
                {Array.from({
                  length: Math.ceil((adjustedFirstDay + daysInMonth) / 7),
                }).map((_, weekIndex) => (
                  <View
                    key={`week-${weekIndex}`}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {Array.from({ length: 7 }).map((__, dayIndex) => {
                      const day = weekIndex * 7 + dayIndex - adjustedFirstDay + 1

                      if (day < 1 || day > daysInMonth) {
                        return (
                          <View
                            key={`empty-${dayIndex}`}
                            style={{
                              flex: 1,
                              margin: 4,
                              height: 30,
                            }}
                          />
                        )
                      }

                      const dateString = `${year}-${String(currentDate.getMonth() + 1).padStart(
                        2,
                        "0",
                      )}-${String(day).padStart(2, "0")}`

                      const { textColor, bgColor } = getDayStyle(day, dateString)

                      return (
                        <View
                          key={day}
                          style={{
                            flex: 1,
                            height: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: bgColor,
                            margin: 4,
                            borderRadius: 4,
                          }}
                        >
                          <Text
                            size="xs"
                            style={{
                              textAlign: "center",
                              color: textColor,
                            }}
                          >
                            {day}
                          </Text>
                        </View>
                      )
                    })}
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  )
}

export default CalendarStreak

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: 8,
  marginTop: spacing.xl,
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
})

const $calendarContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderWidth: 2,
  borderColor: colors.border,
  borderRadius: 24,
  marginTop: spacing.sm,
  padding: spacing.md,
})

const $calendarHeader: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
})

const $weekHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginVertical: spacing.md,
})

const $weekLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  flex: 1,
  textAlign: "center",
})
