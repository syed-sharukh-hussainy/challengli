import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Pressable, View, ViewStyle } from "react-native"
import { Text } from "../Text"

type Props = {
  backgroundColor: string
  onPress: () => void
}
const FooterButton = ({ backgroundColor, onPress }: Props) => {
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
          Start Challenge
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
