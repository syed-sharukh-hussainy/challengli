import React from "react"
import { Screen } from "@/components"
import HomeTopHeader from "@/components/Home/HomeTopHeader"
import FAB from "@/components/UI/Fab"
import HomeChallengesList from "@/components/Home/HomeChallengesList"
import { useNotifications } from "@/hooks/useNotification"

const HomeScreen = () => {
  useNotifications();
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <HomeTopHeader />
      <HomeChallengesList />
      <FAB />
    </Screen>
  )
}

export default HomeScreen
