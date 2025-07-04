import React, { useMemo } from "react"
import { ListView, Screen, Text } from "@/components"
import { router, useLocalSearchParams } from "expo-router"
import { Id } from "convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import TopBar from "@/components/UI/TopBar"
import ChallengesListItem from "@/components/Challenges/ChallengesListItem"
import LoadingAnimation from "@/components/UI/LoadingAnimation"

const ChallengesList = () => {
  const { categoryId } = useLocalSearchParams<{
    categoryId: Id<"categories">
  }>()
  const categories = useQuery(api.categories.getAllCategories, {})
  const challenges = useQuery(api.presetChallenges.getPresetChallengesByCatId, {
    categoryId,
  })
  const userChallenges = useQuery(api.userChallenges.getUserChallenges, {})
  const userChallengeData = useMemo(() => {
    if (!userChallenges) return new Map<string, string>()
    const map = new Map<string, string>()
    userChallenges.forEach((uc) => {
      map.set(uc.challengeId!, uc.status)
    })
    return map
  }, [userChallenges])


  const category = useMemo(() => categories?.find((cat) => cat._id === categoryId), [categoryId])

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={{ flex: 1 }}>
      <TopBar
        showBackButton={true}
        title={category?.title}
        onBackButtonPressed={() => router.back()}
      />
      {!challenges || !userChallenges ? (
        <LoadingAnimation />
      ) : (
        <ListView
          data={challenges}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 20 }}
          estimatedItemSize={156}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ChallengesListItem
              challengeId={item._id}
              description={item.description}
              isFree={item.isFree}
              duration={item.duration}
              image={item.image}
              primaryColor={item.color.primary}
              title={item.title}
              isChallengePresent={userChallengeData.has(item._id)}
            />
          )}
        />
      )}
    </Screen>
  )
}

export default ChallengesList
