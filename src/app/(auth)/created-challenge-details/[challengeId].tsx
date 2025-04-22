import TopBarWithActions from "@/components/UI/TopBarWithActions"
import DetailsHeader from "@/components/Challenges/DetailsHeader"
import ActivityItem from "@/components/Challenges/ActivityItem"
import { ListView, Screen } from "@/components"
import { router, useLocalSearchParams } from "expo-router"
import { useCallback, useMemo } from "react"
import { format } from "date-fns/format"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import LoadingAnimation from "@/components/UI/LoadingAnimation"
import TopBar from "@/components/UI/TopBar"
import UpgradePro from "@/components/UI/UpgradePro"
import { Id } from "convex/_generated/dataModel"

const CreatedChallengeDetails = () => {
  const { challengeId } = useLocalSearchParams<{ challengeId: Id<"userChallenges"> }>()
  const todaysDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), [])
  const challenge = useQuery(api.userChallenges.getChallengeById, {
    challengeId,
  })

  const user = useQuery(api.users.getUser, {});
  const category = useQuery(api.categories.getCategoryById, { categoryId: challenge?.categoryId });
  const isLocked = category ? !user?.isPro && !category?.isFree : false;
  const getItemStyles = useCallback(
    (isValidDate: boolean) => ({
      textColor: isValidDate ? challenge?.color.primary : "#6b7280",
    }),
    [challenge],
  )

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      {!user || !challenge ? (
        <LoadingAnimation />
      ) : (
        <>
          {isLocked ? <>
            <TopBar onBackButtonPressed={() => router.back()} />
            <UpgradePro />
          </> : <>
            <TopBarWithActions challenge={challenge} />
            <ListView
              data={challenge?.activities}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                padding: 20,
              }}
              keyExtractor={(item) => item.title + "-" + item.date}
              ListHeaderComponent={
                <DetailsHeader
                  title={challenge.title}
                  description={challenge.description}
                  image={challenge.image}
                  duration={challenge.duration}
                  color={challenge.color}
                />
              }
              estimatedItemSize={86}
              renderItem={({ item, index }) => (
                <ActivityItem
                  isFirst={index === 0}
                  isLast={index === challenge.activities.length - 1}
                  item={item}
                  isValidDate={new Date(item.date || "") <= new Date(todaysDate)}
                  isPressable={true}
                  textColor={
                    getItemStyles(new Date(item.date || "") <= new Date(todaysDate)).textColor
                  }
                  challengeId={challenge._id}
                />
              )}
            />
          </>}
        </>
      )}
    </Screen>
  )
}

export default CreatedChallengeDetails
