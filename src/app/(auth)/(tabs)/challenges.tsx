import { View, Text } from "react-native"
import React from "react"
import { Screen } from "@/components"
import PulseDot from "@/components/UI/PulseDot"

const ChallengesScreen = () => {
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    ></Screen>
  )
}

export default ChallengesScreen
