import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../Text"

type Props = {
  backgroundColor: string
  onPress: () => void
  status: string
  day: number
}

const DayActivityFooter = ({ backgroundColor, onPress, status, day }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($footerContainer)}>
      {status === "COMPLETED" ? (
        <Text
          size="md"
          weight="bold"
          style={{
            color: backgroundColor,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          You have completed day {day}
        </Text>
      ) : (
        <Pressable
          onPress={onPress}
          style={{
            backgroundColor,
            borderRadius: 12,
          }}
        >
          <Text size="sm" weight="bold" style={themed($btnLabel)}>
            Mark Day as complete
          </Text>
        </Pressable>
      )}
    </View>
  )
}

export default DayActivityFooter

const $footerContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderTopWidth: 2,
  backgroundColor: colors.background,
  padding: spacing.md,
  borderColor: colors.border,
})

const $btnLabel: ThemedStyle<TextStyle> = ({ spacing }) => ({
  color: "white",
  textAlign: "center",
  paddingVertical: spacing.sm,
  textTransform: "uppercase",
})
