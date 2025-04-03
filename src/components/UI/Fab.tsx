import { View, Pressable, ViewStyle } from "react-native"
import { router } from "expo-router"
import { FontAwesome6 } from "@expo/vector-icons"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const FAB = () => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($container)}>
      <Pressable onPress={() => router.push("/(auth)/categories")} style={themed($btn)}>
        <FontAwesome6 name="add" size={24} color="white" />
      </Pressable>
    </View>
  )
}

export default FAB

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "absolute",
  bottom: spacing.md,
  right: spacing.md,
})

const $btn: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 64,
  width: 64,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 1000,
  backgroundColor: colors.palette.primary,
})
