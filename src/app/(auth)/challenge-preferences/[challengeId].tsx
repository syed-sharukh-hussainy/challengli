import React, { useMemo, useState } from "react"
import FooterButton from "@/components/UI/FooterButton"
import TopBar from "@/components/UI/TopBar"
import { View, Pressable, ViewStyle, TextStyle, Modal } from "react-native"
import { Screen, Text } from "@/components"
import { spacing, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Id } from "convex/_generated/dataModel"
import { router, useLocalSearchParams, useNavigationContainerRef } from "expo-router"
import { useMutation, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { format } from "date-fns/format"
import { HOURS, MINUTES, PERIOD } from "@/utils/constants"
import { getLabelByValue } from "@/utils/helper"
import { StackActions } from "@react-navigation/native"

const ChallengePreferences = () => {
  const { themed } = useAppTheme()
  const { challengeId } = useLocalSearchParams<{
    challengeId: Id<"presetChallenges">
  }>()
  const todaysDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), [])

  const [hour, setHour] = useState(8)
  const [minutes, setMinutes] = useState(30)
  const [period, setPeriod] = useState(1)

  const [showStartButton, setShowStartButton] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const rootNavigation = useNavigationContainerRef()
  const [showTimePicker, setShowTimePicker] = useState(false)
  const createChallenge = useMutation(api.userChallenges.createChallenge)
  const challenge = useQuery(api.presetChallenges.getPresetChallengeById, {
    challengeId,
  })

  const onCreateChallenge = async () => {
    if (!challenge) return

    setIsLoading(true)
    try {
      const _id = await createChallenge({
        title: challenge.title,
        description: challenge.description,
        duration: challenge.duration,
        image: challenge.image,
        startDate: todaysDate,
        categoryId: challenge.categoryId,
        challengeId: challenge._id,
        challengeActivities: challenge.activities,
        color: challenge.color,
        reminderTime: {
          hour,
          minutes,
          period,
        },
      })
      // await createNotification(
      //   challenge.title,
      //   challenge.duration,
      //   _id,
      //   hour,
      //   period,
      //   minutes
      // );
    } catch (error) {
      console.error("Error creating challenge:", error)
    } finally {
      setIsLoading(false)
      rootNavigation.dispatch(StackActions.popToTop())
      router.replace(`/(auth)/created-challenge-details/${challengeId}`)
    }
  }

  if (!challenge) {
    return <View></View>
  }

  return (
    <>
      <Screen
        safeAreaEdges={["top"]}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <TopBar showBackButton={true} title="Set a reminder" />
        <View style={{ padding: spacing.md, flex: 1 }}>
          <Pressable style={themed($reminderBtn)} onPress={() => setShowTimePicker(true)}>
            <Text size="xs" weight="semiBold" style={themed($reminderLabel)}>
              Reminder Time
            </Text>
            <Text size="md" weight="bold" style={themed($reminderTime)}>
              {getLabelByValue(HOURS, hour)}:{getLabelByValue(MINUTES, minutes)}{" "}
              {getLabelByValue(PERIOD, period)}
            </Text>
          </Pressable>
        </View>

        <FooterButton backgroundColor={challenge?.color.primary} onPress={onCreateChallenge} />
      </Screen>
      {/* <WheelTimePicker
        showTimePicker={showTimePicker}
        backgroundColor={challenge.color.primary}
        onSavePressed={(hr, min, per) => {
          setHour(hr)
          setMinutes(min)
          setPeriod(per)
          setShowTimePicker(false)
          console.log("preferences", hr, min, per)
        }}
        onCloseButtonPressed={() => setShowTimePicker(false)}
        initialHour={hour}
        initialMinutes={minutes}
        initialPeriod={period}
      /> */}
    </>
  )
}

export default ChallengePreferences

const $reminderBtn: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderWidth: 2,
  borderColor: colors.border,
  borderRadius: 18,
  padding: spacing.md,
})

const $reminderLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $reminderTime: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})
