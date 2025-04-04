import { View, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { Text } from "../Text"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import SmartImage from "../UI/SmartImage"
import { Id } from "convex/_generated/dataModel"
import { router } from "expo-router"

type Props = {
  id: Id<"categories">
  title: string
  description: string
  image: string
}

const CategoryItem = ({ id, title, image, description }: Props) => {
  const { themed } = useAppTheme()
  return (
    <TouchableOpacity
      onPress={() => router.push(`/(auth)/challenges-list/${id}`)}
      activeOpacity={0.8}
      style={themed($btnContainer)}
    >
      <View style={{ width: "70%", alignItems: "flex-start", gap: 4 }}>
        <Text size="sm" weight="bold" numberOfLines={1} style={themed($title)}>
          {title}
        </Text>
        <Text size="xs" weight="normal" numberOfLines={3} style={themed($description)}>
          {description}
        </Text>
      </View>
      <View style={$smartImage}>
        <SmartImage imgKey={image} style={{ width: 116, height: 116 }} />
      </View>
    </TouchableOpacity>
  )
}

export default CategoryItem

const $btnContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 156,
  flex: 1,
  backgroundColor: colors.palette.muted,
  marginBottom: spacing.sm,
  borderRadius: 24,
  justifyContent: "center",
  padding: spacing.md,
  overflow: "hidden",
})
const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $description: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $smartImage: ViewStyle = {
  position: "absolute",
  bottom: -16,
  right: -16,
}
