import { Screen } from "@/components"
import AchievementList from "@/components/Achievements/AchievementList"
import TopBar from "@/components/UI/TopBar"
import { useUser } from "@clerk/clerk-expo"
import { api } from "convex/_generated/api"
import { useQuery } from "convex/react"
import { router, useLocalSearchParams } from "expo-router"

const AchievementsScreen = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>()
  const { user } = useUser()
  const otherUser = useQuery(api.users.getUserById, {
    userId,
  })

  const isMe = user?.id === userId

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar
        title={isMe ? "Achievements" : `${otherUser?.firstName}'s Achievements`}
        onBackButtonPressed={() => router.back()}
      />
      <AchievementList isMe={isMe} userId={userId} />
    </Screen>
  )
}

export default AchievementsScreen
