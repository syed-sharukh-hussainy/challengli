import { View, Text } from "react-native"
import React from "react"
import { Screen } from "@/components"
import HomeTopHeader from "@/components/Home/HomeTopHeader"
import FAB from "@/components/UI/Fab"

const HomeScreen = () => {
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <HomeTopHeader />
      <FAB />
    </Screen>
  )
}

export default HomeScreen
