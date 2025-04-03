import { Modal, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import Spinner from "./Spinner"

type Props = {
  isLoading: boolean
}

const ModalSpinner = ({ isLoading }: Props) => {
  const { themed } = useAppTheme()
  return (
    <Modal visible={isLoading} transparent animationType="none" statusBarTranslucent>
      <View style={themed($modalWrapper)}>
        <View style={themed($modalBackground)}>
          <Spinner size={28} />
        </View>
      </View>
    </Modal>
  )
}

export default ModalSpinner

const $modalBackground: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  padding: 14,
  borderRadius: 20,
})

const $modalWrapper: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.palette.overlay50,
  padding: spacing.md,
})
