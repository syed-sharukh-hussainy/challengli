import { View, Text } from "react-native"
import React from "react"
import { Screen } from "@/components"
import HomeTopHeader from "@/components/Home/HomeTopHeader"

const HomeScreen = () => {
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <HomeTopHeader />
    </Screen>
  )
}

export default HomeScreen
