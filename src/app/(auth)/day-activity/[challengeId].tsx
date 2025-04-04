import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import React, { useMemo } from "react"
import { useLocalSearchParams } from "expo-router"
import { format } from "date-fns/format"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { Screen, Text } from "@/components"
import TopBar from "@/components/UI/TopBar"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import Accordion from "@/components/UI/Accordion"

const DayActivity = () => {
  const { challengeId, query } = useLocalSearchParams<{
    challengeId: string
    query: string
  }>()
  const { themed } = useAppTheme()
  const todaysDate = format(query, "yyyy-MM-dd")
  const challenge = useQuery(api.userChallenges.getChallengeByChallengeId, {
    challengeId,
  })
  const activity = useMemo(() => {
    return challenge?.activities?.find(
      (activity) => format(activity.date!, "yyyy-MM-dd") === todaysDate,
    )
  }, [challenge, todaysDate])
  const color = useMemo(() => challenge?.color, [challenge])
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar />
      <View style={themed($container)}>
        <ScrollView>
          <View style={$headerText}>
            <Text
              size="xs"
              weight="semiBold"
              style={{
                color: color?.primary,
                textTransform: "uppercase",
              }}
            >
              {challenge?.title}
            </Text>
            <Text
              weight="semiBold"
              size="md"
              style={{
                marginTop: 16,
              }}
            >
              Day {activity?.day}. {activity?.title}
            </Text>
            <Text weight="normal" size="sm">
              {activity?.task}
            </Text>
          </View>
          <Accordion
            title="Benefits"
            subtitle="What you gain from this activity"
            content={activity?.pros || ""}
            isList={false}
            challengeColor={color?.primary}
            isInitExpanded={activity?.status === "IN_PROGRESS"}
            imageKey="benefits.png"
          />
          {activity?.day !== 1 && (
            <Accordion
              title="Don't Forget"
              subtitle="A gentle nudge to keep up with past tasks"
              content="Don't forget to complete previous tasks for better progress!"
              isList={false}
              challengeColor={color?.primary}
              isInitExpanded={activity?.status === "IN_PROGRESS"}
              imageKey="reminder.png"
            />
          )}

          <Accordion
            title="Quick Tips"
            subtitle="Simple tips for better results"
            content={activity?.tips || []}
            isList={true}
            challengeColor={color?.primary}
            isInitExpanded={false}
            imageKey="tips.png"
          />
        </ScrollView>
      </View>
    </Screen>
  )
}

export default DayActivity

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.md,
})

const $headerText: ViewStyle = {
  gap: 12,
  marginBottom: 24,
}
