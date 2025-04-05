import { View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { router, useNavigationContainerRef } from "expo-router"
import ActionButton from "./ActionButton"
import { useMutation } from "convex/react"
import { api } from "convex/_generated/api"
import ActionModal from "./ActionModal/ActionModal"
import { useState } from "react"
import ModalText from "./ActionModal/ModalText"
import { Doc } from "convex/_generated/dataModel"
import ModalButton from "./ActionModal/ModalButton"
import { StackActions } from "@react-navigation/native"
import TimePickerModal from "./TimePickerModal"

type Props = {
  challenge: Doc<"userChallenges">
}

const TopBarWithActions = ({ challenge }: Props) => {
  const { themed } = useAppTheme()
  const rootNavigation = useNavigationContainerRef()

  const [isLoading, setIsLoading] = useState(false)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditNotificationModal, setShowEditNotificationModal] = useState(false)

  const [hour, setHour] = useState(challenge.reminderTime.hour)
  const [minutes, setMinutes] = useState(challenge.reminderTime.minutes)
  const [period, setPeriod] = useState(challenge.reminderTime.period)

  const deleteChallenge = useMutation(api.userChallenges.deleteChallenge)
  const updateReminderTime = useMutation(api.userChallenges.updateReminderTime)

  const onDeleteChallenge = async () => {
    try {
      setIsLoading(true)
      await deleteChallenge({ challengeId: challenge._id })
      rootNavigation.dispatch(StackActions.popToTop())
      router.replace(`/(auth)/(tabs)/challenges`)
    } catch (error) {
      console.error(error)
    } finally {
      setShowDeleteModal(false)
      setIsLoading(false)
    }
  }

  const onSavePressed = async (hr: number, min: number, per: number) => {
    try {
      setIsLoading(true)
      await updateReminderTime({
        challengeId: challenge._id,
        reminderTime: {
          hour: hr,
          minutes: min,
          period: per,
        },
      })
      setHour(hr)
      setMinutes(min)
      setPeriod(per)
      setShowEditNotificationModal(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setShowEditNotificationModal(false)
    }
  }

  return (
    <>
      <View style={themed($topHeader)}>
        <View style={$headerAction}>
          <ActionButton
            icon="chevron-left"
            onPress={() => {
              router.replace("/(auth)/(tabs)/challenges")
            }}
          />
          <View style={$rightAction}>
            <ActionButton icon="bell" onPress={() => setShowEditNotificationModal(true)} />
            <ActionButton icon="trash-alt" size={22} onPress={() => setShowDeleteModal(true)} />
          </View>
        </View>
      </View>
      <ActionModal visible={showDeleteModal}>
        <ModalText title="Are you sure you want to delete this challenge?" />
        <View
          style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}
        >
          <ModalButton
            label="close"
            onPress={() => setShowDeleteModal(false)}
            isLoading={isLoading}
            style={themed((theme) => ({
              backgroundColor: theme.colors.palette.gray,
            }))}
            labelStyle={themed((theme) => ({
              color: theme.colors.text,
            }))}
          />
          <ModalButton
            label="delete"
            onPress={() => onDeleteChallenge()}
            isLoading={isLoading}
            style={themed(({ colors }) => ({
              backgroundColor: colors.palette.angry500,
            }))}
            labelStyle={{
              color: "white",
            }}
          />
        </View>
      </ActionModal>
      <TimePickerModal
        showTimePicker={showEditNotificationModal}
        onCloseButtonPressed={() => setShowEditNotificationModal(false)}
        onSaveButtonPressed={onSavePressed}
        isLoading={isLoading}
        initialHour={hour}
        initialMinutes={minutes}
        initialPeriod={period}
        color={challenge.color.primary}
      />
    </>
  )
}

export default TopBarWithActions

const $topHeader: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  height: 70,
  justifyContent: "center",
  backgroundColor: colors.background,
  borderBottomWidth: 2,
  borderBottomColor: colors.border,
})

const $headerAction: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $rightAction: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
