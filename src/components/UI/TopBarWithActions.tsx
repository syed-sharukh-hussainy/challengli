import { TouchableOpacity, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { router } from "expo-router"
import ActionButton from "./ActionButton"
import { useMutation } from "convex/react"
import { api } from "convex/_generated/api"
import ActionModal from "./ActionModal/ActionModal"
import { useState } from "react"
import ModalText from "./ActionModal/ModalText"
import { Text } from "../Text"
import { Doc } from "convex/_generated/dataModel"
import Spinner from "./Spinner"

type Props = {
  challenge: Doc<"userChallenges">
}

const TopBarWithActions = ({ challenge }: Props) => {
  const { themed } = useAppTheme()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const deleteChallenge = useMutation(api.userChallenges.deleteChallenge)
  const onDeleteChallenge = async () => {
    try {
      setIsLoading(true)
      await deleteChallenge({ challengeId: challenge._id })
      router.replace(`/(auth)/categories`)
    } catch (error) {
      console.error(error)
    } finally {
      setShowDeleteModal(false)
      setIsLoading(false)
    }
  }
  return (
    <>
      <View style={themed($topHeader)}>
        <View style={$headerAction}>
          <ActionButton
            icon="chevron-left"
            onPress={() => {
              router.back()
            }}
          />
          <View style={$rightAction}>
            <ActionButton
              icon="bell"
              onPress={() => {
                console.log("bell")
              }}
            />
            <ActionButton icon="trash-alt" size={22} onPress={() => setShowDeleteModal(true)} />
          </View>
        </View>
      </View>
      <ActionModal visible={showDeleteModal}>
        <ModalText title="Are you sure you want to delete this challenge?" />
        <View
          style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}
        >
          <TouchableOpacity
            onPress={() => setShowDeleteModal(false)}
            style={themed(({ spacing, colors }) => ({
              backgroundColor: colors.palette.muted,
              marginTop: spacing.md,
              padding: spacing.xs,
              borderRadius: 12,
              alignItems: "center",
              borderWidth: 2,
              flex: 1,
              borderColor: colors.border,
            }))}
          >
            <Text size="sm" weight="semiBold">
              CLOSE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onDeleteChallenge()
            }}
            style={themed(({ spacing, colors }) => ({
              backgroundColor: colors.palette.angry500,
              marginTop: spacing.md,
              padding: spacing.xs,
              borderRadius: 12,
              alignItems: "center",
              flex: 1,
              borderWidth: 2,
              borderColor: colors.palette.angry500,
            }))}
          >
            {isLoading ? (
              <Spinner size={18} color="white" />
            ) : (
              <Text size="sm" weight="semiBold">
                DELETE
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ActionModal>
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
