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
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <PulseDot delay={100} />
          <PulseDot delay={150} />
          <PulseDot delay={200} />
        </View>
      </View>
    </Screen>
  )
}

export default ChallengesScreen
