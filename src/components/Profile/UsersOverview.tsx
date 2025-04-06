import { View, ViewStyle } from "react-native"
import { Text } from "../Text"
import StatItem from "./StatItem"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
type Props = {
  rank: number | string
  xp: number
  challenges: number
  achievements: number
  currStreak: number
  bestStreak: number
}

const UsersOverview = ({ achievements, challenges, rank, xp, currStreak, bestStreak }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text size="lg" weight="semiBold">
        Overview
      </Text>
      <View style={themed($wrapper)}>
        <StatItem image="global-rank.png" value={rank} label="Global rank" isLoading={false} />
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
          image="achievements-unlocked.png"
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
