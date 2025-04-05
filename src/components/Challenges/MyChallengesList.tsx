import { View, Text } from "react-native"
import React, { useMemo } from "react"
import { useQuery } from "convex/react"
import LoadingAnimation from "../UI/LoadingAnimation"
import EmptyList from "../UI/EmptyList"
import { ListView } from "../ListView"
import { api } from "convex/_generated/api"
import MyChallengesListItem from "./MyChallengesListItem"
import { differenceInDays, format } from "date-fns"

const MyChallengesList = () => {
  const challenges = useQuery(api.userChallenges.getUserChallenges, {})

  if (!challenges) {
    return <LoadingAnimation />
  }

  if (challenges.length === 0) {
    return <EmptyList />
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ListView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={176}
        data={challenges}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <MyChallengesListItem
            startDate={item.startDate}
            index={index}
            title={item.title}
            description={item.description}
            id={item.challengeId}
            color={item.color}
            imageUrl={item.image}
            length={challenges.length}
            duration={item.duration}
            status={item.status === "IN_PROGRESS" ? "IN PROGRESS" : "COMPLETED"}
          />
        )}
      />
    </View>
  )
}

export default MyChallengesList
