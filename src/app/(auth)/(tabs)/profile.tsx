import { Pressable, ScrollView, TouchableOpacity, View } from "react-native"
import React, { useMemo } from "react"
import { Screen, Text } from "@/components"
import TopBar from "@/components/UI/TopBar"
import TopBarWithActions from "@/components/UI/TopBarWithActions"
import { FontAwesome6 } from "@expo/vector-icons"
import { router } from "expo-router"
import ActionButton from "@/components/UI/ActionButton"
import ProfileImageName from "@/components/Profile/ProfileImageName"
import { useUser } from "@clerk/clerk-expo"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import LoadingAnimation from "@/components/UI/LoadingAnimation"
import TabHeader from "@/components/UI/TabHeader"
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
            achievements={0}
          />
          <ProfileAchievements userId={user.userId} />
        </ScrollView>
      )}
    </Screen>
  )
}

export default Profile
