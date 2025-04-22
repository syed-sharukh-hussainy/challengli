import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Pressable, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../Text"
import Spinner from "./Spinner"

type Props = {
  backgroundColor: string
  onPress: () => void
  label: string
  isLoading?: boolean
}
const FooterButton = ({ backgroundColor, onPress, label, isLoading }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($footerContainer)}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          backgroundColor,
          borderRadius: 12,
          paddingVertical: 12,
        }}
      >
        {isLoading ? (
          <Spinner size={24} color="white" />
        ) : (
          <Text
            size="sm"
            weight="bold"
            style={{
              color: "white",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default FooterButton

const $footerContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderTopWidth: 2,
  backgroundColor: colors.background,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  borderColor: colors.border,
})
