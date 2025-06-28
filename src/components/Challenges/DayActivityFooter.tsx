import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../Text"
import Spinner from "../UI/Spinner"

type Props = {
  backgroundColor: string
  onPress: () => void
  status: string
  day: number
  isLoading: boolean
}

const DayActivityFooter = ({ backgroundColor, onPress, status, day, isLoading }: Props) => {
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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (!isLoading) {
              onPress()
            }
          }}
          style={{
            backgroundColor,
            borderRadius: 14,
            paddingVertical: 12,
          }}
        >
          {isLoading ? (
            <Spinner size={24} color="white" />
          ) : (
            <Text size="sm" weight="bold" style={themed($btnLabel)}>
              Mark Day as complete
            </Text>
          )}
        </TouchableOpacity>
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
  textTransform: "uppercase",
})
