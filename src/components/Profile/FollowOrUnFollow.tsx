import { TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import Spinner from "../UI/Spinner"
import { Doc } from "convex/_generated/dataModel"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"

type Props = {
  user: Doc<"users">
}

const FollowOrUnFollow = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { themed, theme } = useAppTheme()
  const updateFriends = useMutation(api.users.updateFollowingFollowers)
  const me = useQuery(api.users.getUser, {})
  const isFollowing = me?.following.includes(user.userName)
  return (
    <TouchableOpacity
      onPress={async () => {
        try {
          setIsLoading(true)
          await updateFriends({
            userName: user.userName,
          })
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }}
      style={themed(({ colors, spacing }) => ({
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        paddingVertical: spacing.sm,
        marginTop: spacing.md,
        borderWidth: 2,
        borderColor: colors.border,
        backgroundColor: isFollowing ? colors.transparent : colors.palette.primary,
      }))}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <Spinner
          size={24}
          color={me?.following.includes(user.userName) ? theme.colors.palette.primary : "#ffffff"}
        />
      ) : (
        <Text
          size="sm"
          weight="bold"
          style={themed(({ colors }) => ({
            color: isFollowing ? colors.palette.primary : "white",
            textTransform: "uppercase",
          }))}
        >
          {isFollowing ? "UNFOLLOW" : "FOLLOW"}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default FollowOrUnFollow
