import { TextStyle, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import { Icon } from "../Icon"
import { router } from "expo-router"

type Props = {
  title?: string
  showBackButton?: boolean
}
const TopBar = ({ title, showBackButton = true }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($topHeader)}>
      <View style={$headerAction}>
        {showBackButton && (
          <Icon icon="back" size={28} onPress={() => router.back()} style={{ marginTop: 3 }} />
        )}
        {title && (
          <Text size="lg" weight="bold" style={themed($title)}>
            {title}
          </Text>
        )}
      </View>
    </View>
  )
}

export default TopBar

const $topHeader: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  padding: spacing.md,
  backgroundColor: colors.background,
  borderBottomWidth: 2,
  borderBottomColor: colors.border,
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $headerAction: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 26,
}
