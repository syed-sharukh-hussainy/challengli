import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import React, { useCallback, useMemo, useState } from "react"
import { useLocalSearchParams } from "expo-router"
import { format } from "date-fns/format"
import { useMutation, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { Screen, Text } from "@/components"
import TopBar from "@/components/UI/TopBar"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import Accordion from "@/components/UI/Accordion"
import FooterButton from "@/components/UI/FooterButton"
import DayActivityFooter from "@/components/Challenges/DayActivityFooter"
import LoadingAnimation from "@/components/UI/LoadingAnimation"

const DayActivity = () => {
  const { challengeId, query } = useLocalSearchParams<{
    challengeId: string
    query: string
  }>()
  const { themed } = useAppTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [showCongratsModal, setShowCongratsModal] = useState(false)

  const addXpToUser = useMutation(api.users.addXpToUser)
  const updateActivityStatus = useMutation(api.userChallenges.updateDayActivityStatus)
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

  const onFinishDayActivity = useCallback(async () => {
    try {
      setIsLoading(true)

      const updates = [
        updateActivityStatus({
          challengeId,
          date: new Date(query).toISOString(),
        }),

        addXpToUser({ xp: 10 }),
      ]
      await Promise.all(updates)
      setShowCongratsModal(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [challengeId, activity, query])

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar />
      {!activity ? (
        <LoadingAnimation />
      ) : (
        <>
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
          <DayActivityFooter
            backgroundColor={color?.primary!}
            onPress={() => {}}
            status={activity.status!}
            day={activity.day}
          />
        </>
      )}
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
