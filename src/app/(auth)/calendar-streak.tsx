import { View, Text } from "react-native"
import React from "react"
import { Screen } from "@/components"

const CalendarStreak = () => {
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <Text>CalendarStreak</Text>
    </Screen>
  )
}

export default CalendarStreak
