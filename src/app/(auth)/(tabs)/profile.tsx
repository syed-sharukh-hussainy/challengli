import { ScrollView, View } from "react-native"
import React, { useMemo } from "react"
import { Screen } from "@/components"
import TopBar from "@/components/UI/TopBar"
import { router } from "expo-router"
import ActionButton from "@/components/UI/ActionModal/ActionButton"
import ProfileImageName from "@/components/Profile/ProfileImageName"
import { useUser } from "@clerk/clerk-expo"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import LoadingAnimation from "@/components/UI/LoadingAnimation"
import FollowingFollowers from "@/components/Profile/FollowingFollowers"
import AddFriends from "@/components/Profile/AddFriends"
import { useAppTheme } from "@/utils/useAppTheme"
import UsersOverview from "@/components/Profile/UsersOverview"
import ProfileAchievements from "@/components/Profile/ProfileAchievements"

const Profile = () => {
  const { themed } = useAppTheme()
  const { user: CUser } = useUser()

  const user = useQuery(api.users.getUser, {})
  const users = useQuery(api.users.allUsers, {})

  const sortedUsers = useMemo(() => {
    return users?.slice().sort((a, b) => b.xp - a.xp)
  }, [users])

  const rank = useMemo(() => {
    return sortedUsers?.findIndex((sortedUser) => sortedUser.userId === CUser?.id)
  }, [sortedUsers, CUser?.id])

  const challenges = useQuery(api.userChallenges.getAllChallengesByUserId, {
    userId: CUser?.id!,
  })

  const achievements = useQuery(api.achievements.getAchievementsByUserId, {
    userId: CUser?.id!,
  });

  const totalAchievements = achievements?.filter(
    (ach) => ach.status === "COMPLETED"
  );

  const isMe = useMemo(() => CUser?.id === user?.userId, [CUser?.id, user?.userId])

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar
        showBackButton={false}
        title="Profile"
        rightIcon={<ActionButton icon="gear" onPress={() => router.push("/settings")} />}
      />
      {!user ? (
        <LoadingAnimation />
      ) : (
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
            <AddFriends />
          </View>

          <UsersOverview
            rank={rank! + 1 || "N/A"}
            xp={user.xp}
            currStreak={user.currentStreak}
            bestStreak={user.longestStreak}
            challenges={challenges?.length!}
            achievements={totalAchievements?.length!}
            userId={user.userId}
            isMe={isMe}
            isPro={user.isPro}
          />
          <ProfileAchievements userId={user.userId} />
        </ScrollView>
      )}
    </Screen>
  )
}

export default Profile
