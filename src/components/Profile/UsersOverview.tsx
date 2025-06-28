import { View, ViewStyle } from "react-native"
import { Text } from "../Text"
import StatItem from "./StatItem"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { is } from "date-fns/locale"

type Props = {
  rank: number | string
  xp: number
  challenges: number
  achievements: number
  currStreak: number
  bestStreak: number
  userId: string
  isMe: boolean
  isPro: boolean
}

const UsersOverview = ({
  achievements,
  challenges,
  rank,
  xp,
  currStreak,
  bestStreak,
  userId,
  isMe,
  isPro,
}: Props) => {
  const { themed, theme } = useAppTheme()

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
          Stats
        </Text>
        {isMe && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              console.log(isPro)
              if (isPro) {
                router.push(`/(auth)/user-overview`)
              } else {
                router.push("/(auth)/premium")
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
        )}
      </View>
      <View style={themed($wrapper)}>
        <StatItem image="badge-global.png" value={rank} label="Global rank" isLoading={false} />
        <StatItem image="xp-bolt.png" value={xp} label="Total XP" isLoading={false} />
      </View>
      <View style={themed($wrapper)}>
        <StatItem image="streak.png" value={currStreak} label="Current Streak" isLoading={false} />
        <StatItem
          image="best-streak.png"
          value={bestStreak}
          label="Best Streak"
          isLoading={false}
        />
      </View>
      <View style={themed($wrapper)}>
        <StatItem
          image="total-challenges.png"
          value={challenges}
          label="Challenges"
          isLoading={false}
        />
        <StatItem
          image="achievements-profile.png"
          value={achievements}
          label="Achivements"
          isLoading={false}
        />
      </View>
    </View>
  )
}

export default UsersOverview

const $wrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: 8,
  marginTop: spacing.sm,
})
