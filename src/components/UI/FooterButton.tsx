import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Pressable, View, ViewStyle } from "react-native"
import { Text } from "../Text"

type Props = {
  backgroundColor: string
  onPress: () => void
  label: string
}
const FooterButton = ({ backgroundColor, onPress, label }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($footerContainer)}>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor,
          borderRadius: 12,
        }}
      >
        <Text
          size="sm"
          weight="bold"
          style={themed(({ spacing }) => ({
            color: "white",
            textAlign: "center",
            paddingVertical: spacing.sm,
          }))}
        >
          {label}
        </Text>
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
