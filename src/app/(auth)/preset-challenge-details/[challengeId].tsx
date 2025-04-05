import { ListView, Screen, Text } from "@/components"
import TopBar from "@/components/UI/TopBar"
import { router, useLocalSearchParams } from "expo-router"
import { Id } from "convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import DetailsHeader from "@/components/Challenges/DetailsHeader"
import ActivityItem from "@/components/Challenges/ActivityItem"
import FooterButton from "@/components/UI/FooterButton"
import LoadingAnimation from "@/components/UI/LoadingAnimation"
const PresetChallengeDetails = () => {
  const { challengeId } = useLocalSearchParams<{
    challengeId: Id<"presetChallenges">
  }>()
  const challenge = useQuery(api.presetChallenges.getPresetChallengeById, {
    challengeId,
  })

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar onBackButtonPressed={() => router.back()} />
      {!challenge ? (
        <LoadingAnimation />
      ) : (
        <>
          <ListView
            data={challenge?.activities}
            keyExtractor={(item) => `${item.title}-${item.day}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 20,
            }}
            ListHeaderComponent={
              <DetailsHeader
                title={challenge.title}
                description={challenge.description}
                image={challenge.image}
                duration={challenge.duration}
                color={challenge.color}
              />
            }
            estimatedItemSize={84}
            renderItem={({ item, index }) => (
              <ActivityItem
                isPressable={false}
                item={item}
                isFirst={index === 0}
                isLast={index === challenge?.activities.length! - 1}
              />
            )}
          />
          <FooterButton
            label="Start Challenge"
            backgroundColor={challenge.color.primary}
            onPress={() => router.push(`/(auth)/challenge-preferences/${challengeId}`)}
          />
        </>
      )}
    </Screen>
  )
}

export default PresetChallengeDetails
