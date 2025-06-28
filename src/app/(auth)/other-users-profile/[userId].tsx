import React, { useMemo, useState } from "react"
import { Screen } from "@/components"
import TopBar from "@/components/UI/TopBar"
import { router, useLocalSearchParams } from "expo-router"
import { useMutation, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import LoadingAnimation from "@/components/UI/LoadingAnimation"
import { ScrollView, View } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import ProfileImageName from "@/components/Profile/ProfileImageName"
import FollowingFollowers from "@/components/Profile/FollowingFollowers"
import UsersOverview from "@/components/Profile/UsersOverview"
import ProfileAchievements from "@/components/Profile/ProfileAchievements"
import FollowOrUnFollow from "@/components/Profile/FollowOrUnFollow"
import { useUser } from "@clerk/clerk-expo"

const OtherUsersProfile = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const { themed } = useAppTheme()

  const user = useQuery(api.users.getUserById, {
    userId,
  })

  const users = useQuery(api.users.allUsers, {})

  const sortedUsers = useMemo(() => {
    return users?.slice().sort((a, b) => b.xp - a.xp)
  }, [users])

  const rank = useMemo(() => {
    return sortedUsers?.findIndex((sortedUser) => sortedUser.userId === user?.userId)
  }, [sortedUsers, user?.userId])

  const challenges = useQuery(api.userChallenges.getAllChallengesByUserId, {
    userId,
  })
  const achievements = useQuery(api.achievements.getAllUserAchievementsByUserId, {
    userId,
  })

  const totalAchievements = achievements?.filter((ach) => ach.status === "COMPLETED")

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      {!user ? (
        <LoadingAnimation />
      ) : (
        <>
          <TopBar
            title={`${user.firstName}'s Profile`}
            showBackButton={true}
            onBackButtonPressed={() => router.back()}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={themed(({ colors }) => ({
                borderColor: colors.border,
                padding: 20,
                borderBottomWidth: 2,
              }))}
            >
              <ProfileImageName
                imageUrl={user?.imageUrl}
                fullName={user?.firstName + " " + user?.lastName}
                username={user?.userName}
                createdAt={user?._creationTime!}
                userId={user?.userId}
              />
              <FollowingFollowers
                followers={user.followers}
                following={user.following}
                userId={user.userId}
              />
              <FollowOrUnFollow user={user} />
            </View>
            <UsersOverview
              rank={rank! + 1 || "N/A"}
              xp={user.xp}
              currStreak={user.currentStreak}
              bestStreak={user.longestStreak}
              challenges={challenges?.length!}
              achievements={totalAchievements?.length!}
              userId={user.userId}
              isPro={false}
              isMe={false}
            />
            <ProfileAchievements userId={user.userId} />
          </ScrollView>
        </>
      )}
    </Screen>
  )
}

export default OtherUsersProfile
