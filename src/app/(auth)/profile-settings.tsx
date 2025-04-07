import TopBar from "@/components/UI/TopBar"
import { Screen, Text, TextField } from "@/components"
import { router } from "expo-router"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { useUser } from "@clerk/clerk-expo"
import { useMutation, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { useAppTheme } from "@/utils/useAppTheme"
import { FontAwesome6 } from "@expo/vector-icons"
import { useState } from "react"
import * as Clipboard from "expo-clipboard"
import LoadingAnimation from "@/components/UI/LoadingAnimation"
import ActionModal from "@/components/UI/ActionModal/ActionModal"
import ModalButton from "@/components/UI/ActionModal/ModalButton"
import Spinner from "@/components/UI/Spinner"
import ModalText from "@/components/UI/ActionModal/ModalText"

type EditModalType = {
  field: string | null
  value: string
}

const ProfileSettings = () => {
  const { user: clerkUser } = useUser()
  const user = useQuery(api.users.getUser, {})
  const { themed } = useAppTheme()

  const updateUser = useMutation(api.users.updateUserDetails)

  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [editModal, setEditModal] = useState<EditModalType>({
    field: null,
    value: "",
  })
  const handleEditModal = (field: string, value: string): void => {
    setEditModal({ field, value })
  }
  const copyToClipboard = async (val: string) => {
    await Clipboard.setStringAsync(val)
    setShowToast(true)
  }
  const onSave = async () => {
    try {
      setIsLoading(true)
      await updateUser({
        field: editModal.field!,
        value: editModal.value,
      })
      setEditModal({ field: null, value: "" })
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteAccount = async () => {
    try {
      setIsLoading(true)
      await clerkUser?.delete()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar onBackButtonPressed={() => router.back()} title="Profile" />
      {!user ? (
        <LoadingAnimation />
      ) : (
        <View
          style={{
            padding: 20,
          }}
        >
          <PressableButton
            onPress={() => handleEditModal("First name", user?.firstName || "")}
            label="First name"
            value={user.firstName}
            pressableRoundedStyle={{
              borderWidth: 2,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
            }}
            icon="pencil"
          />
          <PressableButton
            onPress={() => handleEditModal("Last name", user?.lastName || "")}
            label="Last name"
            value={user.lastName}
            pressableRoundedStyle={{
              borderWidth: 2,
              borderTopWidth: 0,
            }}
            icon="pencil"
          />
          <PressableButton
            onPress={() => copyToClipboard(user?.userName || "")}
            label="Username"
            value={`@${user.userName || ""}`}
            pressableRoundedStyle={{
              borderWidth: 2,
              borderTopWidth: 0,
            }}
            icon="copy"
          />
          <PressableButton
            onPress={() => copyToClipboard(user?.email || "")}
            label="Email"
            value={user.email}
            pressableRoundedStyle={{
              borderWidth: 2,
              borderTopWidth: 0,
              borderBottomLeftRadius: 18,
              borderBottomRightRadius: 18,
            }}
            icon="copy"
          />
        </View>
      )}

      <ActionModal visible={!!editModal.field}>
        <TextField
          value={editModal.value}
          autoFocus={true}
          onChangeText={(text) => setEditModal((prev) => ({ ...prev, value: text }))}
          placeholder={editModal.field || ""}
          style={{
            textAlignVertical: "center",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ModalButton
            label="Save"
            onPress={() => {
              if (!isLoading) {
                onSave()
              }
            }}
            isLoading={isLoading}
            style={themed(({ colors }) => ({
              backgroundColor: colors.palette.primary,
            }))}
            labelStyle={{
              color: "white",
            }}
          />
        </View>
      </ActionModal>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowDeleteModal(true)}
        style={themed(({ colors, spacing }) => ({
          paddingVertical: spacing.sm,
          backgroundColor: colors.palette.angry500,
          margin: spacing.md,
          borderRadius: 14,
        }))}
      >
        {isLoading ? (
          <Spinner color={"#fff"} size={24} />
        ) : (
          <Text
            size="sm"
            weight="bold"
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Delete Account
          </Text>
        )}
      </TouchableOpacity>
      <ActionModal visible={showDeleteModal}>
        <ModalText title="Are you sure you want to delete your account?" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
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
            onPress={async () => {
              if (!isLoading) {
                onDeleteAccount()
              }
            }}
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
    </Screen>
  )
}

export default ProfileSettings

const PressableButton = ({
  onPress,
  pressableRoundedStyle,
  label,
  icon,
  value,
}: {
  onPress: () => void
  pressableRoundedStyle: ViewStyle
  label: string
  icon: string
  value: string
}) => {
  const { themed } = useAppTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        themed(({ colors, spacing }) => ({
          borderColor: colors.border,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: spacing.md,
        })),
        pressableRoundedStyle,
      ]}
    >
      <View
        style={{
          gap: 3,
        }}
      >
        <Text
          size="xs"
          weight="semiBold"
          style={themed(({ colors }) => ({
            color: colors.textDim,
          }))}
        >
          {label}
        </Text>
        <Text size="sm" weight="semiBold" numberOfLines={1}>
          {value || "N/A"}
        </Text>
      </View>
      <FontAwesome6 name={icon} size={18} color="#9ca3af" />
    </TouchableOpacity>
  )
}
