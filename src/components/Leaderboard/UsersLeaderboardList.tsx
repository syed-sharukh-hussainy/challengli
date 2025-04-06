import { View, Text, ViewStyle, Pressable } from "react-native"
import React, { useCallback, useMemo, useState } from "react"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { ListView } from "../ListView"
import { Id } from "convex/_generated/dataModel"
import { usePaginatedQuery, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import LeaderboardListItem from "./LeaderboardListItem"
import LoadingAnimation from "../UI/LoadingAnimation"

type Props = {
  tabName: string
}

const UsersLeaderboardList = ({ tabName }: Props) => {
  const { themed } = useAppTheme()

  const users = useQuery(api.leaderboard.getUsersLeaderboard, { type: tabName })

  const sortedUsers = useMemo(() => {
    return users?.slice().sort((a, b) => b.xp - a.xp)
  }, [users])

  if (!sortedUsers) {
    return <LoadingAnimation />
  }

  return (
    <View style={themed($container)}>
      <ListView
        data={sortedUsers}
        keyExtractor={(item) => item._id}
        estimatedItemSize={80}
        renderItem={({ item, index }) => (
          <LeaderboardListItem index={index} item={item} length={sortedUsers?.length} />
        )}
      />
    </View>
  )
}

export default UsersLeaderboardList

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.md,
})
