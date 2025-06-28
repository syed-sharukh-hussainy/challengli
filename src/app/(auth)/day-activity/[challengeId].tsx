import { Image, ScrollView, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import React, { useCallback, useMemo, useState } from "react"
import { router, useLocalSearchParams } from "expo-router"
import { format } from "date-fns/format"
import { useMutation, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { Screen, Text } from "@/components"
import TopBar from "@/components/UI/TopBar"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import Accordion from "@/components/UI/Accordion"
import DayActivityFooter from "@/components/Challenges/DayActivityFooter"
import LoadingAnimation from "@/components/UI/LoadingAnimation"
import ModalText from "@/components/UI/ActionModal/ModalText"
import ActionModal from "@/components/UI/ActionModal/ActionModal"
import ModalButton from "@/components/UI/ActionModal/ModalButton"
import notifee from "@notifee/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import UpgradePro from "@/components/UI/UpgradePro"
import { Id } from "convex/_generated/dataModel"

const DayActivity = () => {
  const { challengeId, query } = useLocalSearchParams<{
    challengeId: Id<"userChallenges">
    query: string
  }>()
  const { themed } = useAppTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [showCongratsModal, setShowCongratsModal] = useState(false)
  const user = useQuery(api.users.getUser, {})
  const addXPToUsersLeaderboard = useMutation(api.leaderboard.addXPToUsersLeaderboard)
  const updateAchievement = useMutation(api.achievements.updateAchievement)
  const updateStreak = useMutation(api.users.updateStreak)
  const addXpToUser = useMutation(api.users.addXpToUser)
  const updateActivityStatus = useMutation(api.userChallenges.updateDayActivityStatus)
  const todaysDate = format(query, "yyyy-MM-dd")
  const challenge = useQuery(api.userChallenges.getChallengeById, {
    challengeId,
  })
  const activity = useMemo(() => {
    return challenge?.activities?.find(
      (activity) => format(activity.date!, "yyyy-MM-dd") === todaysDate,
    )
  }, [challenge, todaysDate])
  const color = useMemo(() => challenge?.color, [challenge])
  const isLocked = challenge ? !user?.isPro && !challenge?.isFree : false
  const handleNotificationUpdate = async () => {
    const storageKey = `challenge_${challenge?._id}_notifications`
    const storedNotifications = await AsyncStorage.getItem(storageKey)
    if (!storedNotifications) return

    const notifications = JSON.parse(storedNotifications)
    if (notifications) {
      const notification = notifications.notifications.find((n: any) => n.day === activity?.day)
      if (notification) {
        await notifee.cancelTriggerNotification(notification.notificationId)
        const updatedNotifications = notifications.notifications.filter(
          (n: any) => n.day !== activity?.day,
        )
        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify({
            notifications: updatedNotifications,
            reminderTime: challenge?.reminderTime,
            challengeId: challenge?._id,
          }),
        )
      }
    }
  }

  const onFinishDayActivity = useCallback(async () => {
    try {
      if (!isLocked) {
        setIsLoading(true)

        const updates = [
          updateActivityStatus({
            challengeId,
            date: new Date(query).toISOString(),
          }),
          handleNotificationUpdate(),
          addXPToUsersLeaderboard({ type: "weekly", xp: 10 }),
          addXPToUsersLeaderboard({ type: "all time", xp: 10 }),
          addXpToUser({ xp: 10 }),
          updateStreak({ activityDate: todaysDate }),
          updateAchievement({ userChallengeId: challengeId }),
        ]
        await Promise.all(updates)
        setShowCongratsModal(true)
      } else {
        router.push("/(auth)/premium")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [isLocked, challengeId, activity, query])

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar onBackButtonPressed={() => router.back()} />
      {!activity || !user ? (
        <LoadingAnimation />
      ) : (
        <>
          {isLocked ? (
            <UpgradePro />
          ) : (
            <>
              <View style={themed($container)}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingVertical: 20,
                  }}
                >
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
                  {activity.pros && (
                    <Accordion
                      title="Benefits"
                      subtitle="What you gain from this activity"
                      content={activity?.pros || ""}
                      isList={false}
                      challengeColor={color?.primary}
                      isInitExpanded={activity?.status === "IN_PROGRESS"}
                      imageKey="benefits.png"
                    />
                  )}
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

                  {activity.tips.length !== 0 && (
                    <Accordion
                      title="Quick Tips"
                      subtitle="Simple tips for better results"
                      content={activity?.tips || []}
                      isList={true}
                      challengeColor={color?.primary}
                      isInitExpanded={false}
                      imageKey="tips.png"
                    />
                  )}
                </ScrollView>
              </View>
              <DayActivityFooter
                isLoading={isLoading}
                backgroundColor={color?.primary!}
                onPress={onFinishDayActivity}
                status={activity.status!}
                day={activity.day}
              />
            </>
          )}
        </>
      )}
      <ActionModal visible={showCongratsModal}>
        <ModalText title={`Congratulations on completing Day ${activity?.day} activity!`} />
        <View
          style={{
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Text
            size="sm"
            weight="medium"
            style={{
              marginBottom: 12,
            }}
          >
            You got:
          </Text>
          <View
            style={themed(({ colors, spacing }) => ({
              backgroundColor: colors.palette.gray,
              alignItems: "center",
              padding: spacing.sm,
              borderRadius: 12,
            }))}
          >
            <Image
              source={require("assets/images/xp-points.png")}
              style={{
                width: 36,
                height: 36,
              }}
            />
            <Text size="xs" weight="semiBold">
              10 XP
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 24,
          }}
        >
          <ModalButton
            label="okay"
            onPress={() => setShowCongratsModal(false)}
            isLoading={isLoading}
            style={themed((theme) => ({
              backgroundColor: theme.colors.palette.gray,
            }))}
            labelStyle={themed((theme) => ({
              color: theme.colors.text,
            }))}
          />
        </View>
      </ActionModal>
    </Screen>
  )
}

export default DayActivity

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
})

const $headerText: ViewStyle = {
  gap: 12,
  marginBottom: 24,
}
