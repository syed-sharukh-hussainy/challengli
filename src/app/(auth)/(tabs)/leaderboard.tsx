import React, { useState } from "react"
import { Screen } from "@/components"
import TopBar from "@/components/UI/TopBar"
import { useUser } from "@clerk/clerk-expo"

import WeeklyCountDownTimer from "@/components/Leaderboard/WeeklyCountDownTimer"
import UsersLeaderboardList from "@/components/Leaderboard/UsersLeaderboardList"
import TabHeader from "@/components/UI/TabHeader"

const Leaderboard = () => {
  const [tabName, setTabName] = useState("weekly")

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar showBackButton={false} title="Leaderboard" />
      <TabHeader tabName={tabName} tabs={["weekly", "all time"]} setTabName={setTabName} />
      {tabName === "weekly" ? <WeeklyCountDownTimer /> : null}
      <UsersLeaderboardList tabName={tabName} />
    </Screen>
  )
}

export default Leaderboard
