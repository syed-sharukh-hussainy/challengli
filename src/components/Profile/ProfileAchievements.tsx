import { TouchableOpacity, View } from "react-native"
import React from "react"
import { Text } from "../Text"
import { useAppTheme } from "@/utils/useAppTheme"
import { router } from "expo-router"

const ProfileAchievements = () => {
  const { theme } = useAppTheme()
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text size="lg" weight="semiBold">
          Achievements
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
          <Text
            size="sm"
            weight="semiBold"
            style={{
              color: theme.colors.palette.primary,
            }}
          >
            View all
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileAchievements
