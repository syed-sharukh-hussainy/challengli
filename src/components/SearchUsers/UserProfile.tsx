import { View, Pressable, ViewStyle } from "react-native"
import React, { useCallback, useState } from "react"
import { router } from "expo-router"
import { AutoImage } from "../AutoImage"
import { Text } from "../Text"
import { Doc } from "convex/_generated/dataModel"
import { FontAwesome6 } from "@expo/vector-icons"
import { useMutation, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import Spinner from "../UI/Spinner"

type Props = {
  user: Doc<"users">
  index: number
  length: number
}

const UserProfile = ({ user, index, length }: Props) => {
  const { themed } = useAppTheme()
  const [isFollowing, setIsFollowing] = useState<{ [key: string]: boolean }>({})
  const me = useQuery(api.users.getUser, {})
  const updateFriends = useMutation(api.users.updateFollowingFollowers)

  const isFirst = index === 0
  const isLast = index === length - 1

  const $borderStyles: ViewStyle = {
    borderTopLeftRadius: isFirst ? 24 : 0,
    borderTopRightRadius: isFirst ? 24 : 0,
    borderBottomRightRadius: isLast ? 24 : 0,
    borderBottomLeftRadius: isLast ? 24 : 0,
    borderBottomWidth: isLast ? 2 : 0,
  }

  const onFollowFriends = useCallback(
    async (username: string) => {
      setIsFollowing((prev) => ({ ...prev, [username]: true }))
      try {
        await updateFriends({ userName: username })
      } catch (error) {
        console.error("Error following user:", error)
      } finally {
        setIsFollowing((prev) => ({ ...prev, [username]: false }))
      }
    },
    [updateFriends],
  )

  return (
    <Pressable
      style={[themed($container), $borderStyles]}
      onPress={() => router.push(`/other-users-profile/${user.userId}`)}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flex: 1,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            overflow: "hidden",
          }}
        >
          <AutoImage
            source={{ uri: user.imageUrl }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text size="xs" weight="medium" numberOfLines={1}>
            {user.firstName} {user.lastName}
          </Text>
          <Text size="xxs" numberOfLines={1}>
            @{user.userName}
          </Text>
        </View>
      </View>
      <Pressable onPress={() => onFollowFriends(user.userName)} style={themed($followBtn)}>
        {isFollowing[user.userName] ? (
          <Spinner size={14} color="white" />
        ) : me?.following.includes(user.userName) ? (
          <FontAwesome6 name="user-check" size={14} color="white" />
        ) : (
          <FontAwesome6 name="user-plus" size={14} color="white" />
        )}
      </Pressable>
    </Pressable>
  )
}

export default UserProfile

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 80,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 2,
  borderColor: colors.border,
  paddingHorizontal: spacing.sm,
  borderRadius: 16,
})

const $followBtn: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primary,
  padding: spacing.sm,
  borderRadius: 12,
})
