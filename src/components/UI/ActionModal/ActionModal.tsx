import { Modal, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { ReactNode } from "react"

type Props = {
  visible: boolean
  children: ReactNode
}

const ActionModal = ({ visible, children }: Props) => {
  const { themed } = useAppTheme()
  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <View style={themed($modalWrapper)}>
        <View style={themed($modalBackground)}>{children}</View>
      </View>
    </Modal>
  )
}

export default ActionModal

const $modalBackground: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  padding: spacing.md,
  borderRadius: 24,
})

const $modalWrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.palette.overlay70,
  padding: spacing.md,
})
