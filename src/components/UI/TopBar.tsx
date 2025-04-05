import { TextStyle, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import ActionButton from "./ActionButton"

type Props = {
  title?: string
  showBackButton?: boolean
  onBackButtonPressed?: () => void
}
const TopBar = ({ title, showBackButton = true, onBackButtonPressed }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($topHeader)}>
      <View style={$headerAction}>
        {showBackButton && (
          <ActionButton
            icon="chevron-left"
            onPress={() => {
              if (showBackButton) {
                onBackButtonPressed!()
              }
            }}
          />
        )}
        {title && (
          <Text
            size="lg"
            weight="bold"
            style={themed(({ spacing, colors }) => ({
              paddingLeft: showBackButton ? 0 : spacing.md,
              color: colors.text,
            }))}
          >
            {title}
          </Text>
        )}
      </View>
    </View>
  )
}

export default TopBar

const $topHeader: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  height: 70,
  backgroundColor: colors.background,
  borderBottomWidth: 2,
  justifyContent: "center",
  borderBottomColor: colors.border,
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $headerAction: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
