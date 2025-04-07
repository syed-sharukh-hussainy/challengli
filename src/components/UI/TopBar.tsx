import { TextStyle, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import ActionButton from "./ActionModal/ActionButton"
import { ReactNode } from "react"

type Props = {
  title?: string
  showBackButton?: boolean
  onBackButtonPressed?: () => void
  rightIcon?: ReactNode
}
const TopBar = ({ title, showBackButton = true, onBackButtonPressed, rightIcon }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($topHeader)}>
      <View style={$headerAction}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              numberOfLines={1}
              style={themed(({ spacing, colors }) => ({
                paddingLeft: showBackButton ? 0 : spacing.md,
                color: colors.text,
              }))}
            >
              {title}
            </Text>
          )}
        </View>
        {rightIcon}
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

const $headerAction: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
}
