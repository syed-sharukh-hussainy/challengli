import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import React from "react"
import { router } from "expo-router"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import { FontAwesome6 } from "@expo/vector-icons"

const AddFriends = () => {
  const { theme, themed } = useAppTheme()
  return (
    <TouchableOpacity
      onPress={() => router.push("/(auth)/search-users")}
      activeOpacity={0.7}
      style={themed($wrapper)}
    >
      <FontAwesome6 name="user-plus" size={18} color={theme.colors.palette.primary} />
      <Text size="sm" weight="bold" style={themed($label)}>
        Add friends
      </Text>
    </TouchableOpacity>
  )
}

export default AddFriends

const $wrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 16,
  paddingVertical: spacing.sm,
  marginTop: spacing.md,
  borderWidth: 2,
  borderColor: colors.border,
  flexDirection: "row",
  gap: 8,
})

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary,
  textAlign: "center",
  textTransform: "uppercase",
})
