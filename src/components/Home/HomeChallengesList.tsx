import { View } from "react-native"
import React, { useMemo } from "react"
import { format } from "date-fns/format"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import EmptyList from "../UI/EmptyList"
import LoadingAnimation from "../UI/LoadingAnimation"
import { Text } from "../Text"
import { ListView } from "../ListView"
import HomeChallengesListItem from "./HomeChallengesListItem"

const HomeChallengesList = () => {
  const todaysDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), [])

  const challenges = useQuery(api.userChallenges.getUserInProgressChallenges, {})?.reverse()

  const filteredHabits = useMemo(() => {
    return challenges
      ?.map((challenge) => {
        const activity = challenge.activities.find(
          (activity) => todaysDate === format(activity.date!, "yyyy-MM-dd"),
        )
        return activity ? { ...challenge, activity } : null
      })
      .filter((challenge) => challenge !== null)
      .sort((a, b) => {
        if (a.activity.status === "COMPLETED" && b.activity.status !== "COMPLETED") {
          return 1
        } else if (a.activity.status !== "COMPLETED" && b.activity.status === "COMPLETED") {
          return -1
        } else {
          return 0
        }
      })
  }, [challenges, todaysDate])

  if (filteredHabits?.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <EmptyList />
      </View>
    )
  }

  if (!filteredHabits) {
    return <LoadingAnimation />
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ListView
        showsVerticalScrollIndicator={false}
        data={filteredHabits}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 100,
        }}
        estimatedItemSize={96}
        renderItem={({ item, index }) => (
          <HomeChallengesListItem
            title={item.activity.title}
            userChallengeId={item.challengeId}
            activity={item.activity}
            color={item.color}
            duration={item.duration}
            image={item.image}
            index={index}
            length={filteredHabits?.length! - 1}
          />
        )}
      />
    </View>
  )
}

export default HomeChallengesList
