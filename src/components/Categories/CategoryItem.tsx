import { View, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { Text } from "../Text"
import { ThemedStyle, typography } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import SmartImage from "../UI/SmartImage"
import { Id } from "convex/_generated/dataModel"
import { FontAwesome6 } from "@expo/vector-icons"
import useRevenueCat from "@/hooks/useRevenueCat"
import { router } from "expo-router"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
type Props = {
  id: Id<"categories">
  title: string
  description: string
  image: string
  index: number,
}

const CategoryItem = ({ id, title, image, description, index }: Props) => {
  const { themed } = useAppTheme()
  const user = useQuery(api.users.getUser, {});
  const isLocked = user?.isPro === false && index > 0;
  return (
    <TouchableOpacity
      onPress={async () => {
        if (!isLocked) {
          router.push(`/(auth)/challenges-list/${id}`)
        } else {
          router.push('/(auth)/premium')
        }
      }}
      activeOpacity={0.8}
      style={themed($btnContainer)}
    >
      <View style={{ width: "70%", alignItems: "flex-start", gap: 4 }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}>
          {isLocked && <FontAwesome6 name="lock" size={18} color="#666" />}
          <Text size="sm" weight="bold" numberOfLines={1} style={themed($title)}>
            {title}
          </Text>
        </View>
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
