import React from "react"
import { FlatList, View } from "react-native"
import { Text } from "../Text"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import LoadingAnimation from "../UI/LoadingAnimation"
import { ACHIEVEMENTS } from "@/utils/constants"
import AchievementListItem from "./AchievementListItem"

type Props = {
  userId: string
  isMe: boolean
}

const AchievementList = ({ isMe, userId }: Props) => {
  const achievements = useQuery(api.achievements.getAllUserAchievementsByUserId, {
    userId,
  })

  if (!achievements) {
    return <LoadingAnimation />
  }
  return (
    <View>
      <FlatList
        data={ACHIEVEMENTS}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        numColumns={3}
        columnWrapperStyle={{
          gap: 20,
        }}
        contentContainerStyle={{
          gap: 40,
          paddingBottom: 100,
          padding: 20,
        }}
        renderItem={({ item }) => {
          const userAchievements = achievements?.find((ua) => ua.cId === item.id)

          return (
            <AchievementListItem
              achievement={item}
              status={userAchievements?.status!}
              isClaimed={userAchievements?.isClaimed}
              isMe={isMe}
            />
          )
        }}
      />
    </View>
  )
}

export default AchievementList
