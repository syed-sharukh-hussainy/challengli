import { View, Text } from "react-native"
import React from "react"
import { Screen } from "@/components"
import PulseDot from "@/components/UI/PulseDot"
import TopBar from "@/components/UI/TopBar"
import FAB from "@/components/UI/Fab"
import MyChallengesList from "@/components/Challenges/MyChallengesList"

const ChallengesScreen = () => {
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar showBackButton={false} title="Challenges" />
      <MyChallengesList />
      <FAB />
    </Screen>
  )
}

export default ChallengesScreen
