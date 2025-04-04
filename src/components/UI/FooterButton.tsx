import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Pressable, View, ViewStyle } from "react-native"
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
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor,
          borderRadius: 12,
          paddingVertical: 14,
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
            }}
          >
            {label}
          </Text>
        )}
      </Pressable>
    </View>
  )
}

export default FooterButton

const $footerContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderTopWidth: 2,
  backgroundColor: colors.background,
  padding: spacing.md,
  borderColor: colors.border,
})
