import { TouchableOpacity, View } from "react-native"
import React, { useMemo } from "react"
import { Text } from "../Text"
import { useAppTheme } from "@/utils/useAppTheme"
import { router } from "expo-router"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { ACHIEVEMENTS } from "@/utils/constants"
import SmartImage from "../UI/SmartImage"
type Props = {
  userId: string
}
const ProfileAchievements = ({ userId }: Props) => {
  const { themed, theme } = useAppTheme()
  const user = useQuery(api.users.getUser, {});
  const achievements = useQuery(api.achievements.getAchievementsByUserId, {
    userId,
  })
  const displayedAchievements = useMemo(() => {
    return ACHIEVEMENTS.map((achievement, index) => {
      const userAchievement = achievements?.find((ua) => ua.cId === achievement.id)

      return (
        <View
          key={index}
          style={{
            opacity: userAchievement?.status === "COMPLETED" ? 1 : 0.2,
            alignItems: "center",
            gap: 10,
          }}
        >
          <SmartImage imgKey={achievement.imageUrl} width={80} height={80} />
        </View>
      )
    })
      .sort()
      .slice(0, 3)
  }, [achievements])

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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (user?.isPro) {
              router.push(`/(auth)/achievements/${userId}`)
            } else {
              router.push('/(auth)/premium')
            }
          }}
        >
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
      <View
        style={themed(({ colors, spacing }) => ({
          borderWidth: 2,
          flexDirection: "row",
          borderRadius: 24,
          padding: spacing.sm,
          marginTop: spacing.sm,
          borderColor: colors.border,
          justifyContent: "space-between",
        }))}
      >
        {displayedAchievements}
      </View>
    </View>
  )
}

export default ProfileAchievements
