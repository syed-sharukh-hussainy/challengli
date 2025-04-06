import { TouchableOpacity, View } from "react-native"
import React, { useCallback, useMemo, useState } from "react"
import { Screen, Text } from "@/components"
import TopBar from "@/components/UI/TopBar"
import { useUser } from "@clerk/clerk-expo"
import { useAppTheme } from "@/utils/useAppTheme"
import LeaderboardTopHeader from "@/components/Leaderboard/LeaderboardTopHeader"
import { usePaginatedQuery } from "convex/react"
import { api } from "convex/_generated/api"
import WeeklyCountDownTimer from "@/components/Leaderboard/WeeklyCountDownTimer"
import UsersLeaderboardList from "@/components/Leaderboard/UsersLeaderboardList"

const Leaderboard = () => {
  const { user } = useUser()
  const [tabName, setTabName] = useState("weekly")

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar showBackButton={false} title="Leaderboard" />
      <LeaderboardTopHeader tabName={tabName} setTabName={setTabName} />
      {tabName === "weekly" ? <WeeklyCountDownTimer /> : null}
      <UsersLeaderboardList tabName={tabName} />
    </Screen>
  )
}

export default Leaderboard
