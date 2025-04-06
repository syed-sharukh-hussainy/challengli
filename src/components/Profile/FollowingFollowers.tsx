import { View, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import React from "react"
import { router } from "expo-router"
import { Text } from "../Text"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
type Props = {
  followers: string[]
  following: string[]
  userId: string
}
const FollowingFollowers = ({ followers, following, userId }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View style={$wrapper}>
      <TouchableOpacity onPress={() => router.push(`/friends/${userId}?query=following`)}>
        <Text size="xs" weight="semiBold" style={themed($label)}>
          {following.length} Following
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push(`/friends/${userId}?query=followers`)}>
        <Text size="xs" weight="semiBold" style={themed($label)}>
          {followers.length} Followers
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default FollowingFollowers

const $wrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  marginTop: 14,
}
const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary,
  textTransform: "capitalize",
})
