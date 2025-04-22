import { TextStyle, TouchableOpacity, View } from "react-native"
import { Text } from "../Text"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { ThemedStyle } from "@/theme"
import { ViewStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import SmartImage from "./SmartImage"
import { router } from "expo-router"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"
const ProComponent = () => {
    const user = useQuery(api.users.getUser, {});
    const { themed, theme } = useAppTheme();
    if (user?.isPro) {
        return <TouchableOpacity activeOpacity={0.7} onPress={() => openLinkInBrowser('https://play.google.com/store/account/subscriptions')} style={themed($container)}>
            <SmartImage imgKey="boarding1.png" width={44} height={44} />
            <View style={{
                flex: 1,
            }}>
                <Text style={themed(({ colors }) => ({ color: colors.textDim }))} size="xxs" weight="semiBold">Current Plan</Text>
                <Text weight="bold">{user.subscriptions?.productId === "flamingoo_challengli_subscriptions:challengli-pro-monthly" ? "Monthly Pro" : "Annual Pro"}</Text>
            </View>
        </TouchableOpacity>
    }
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/(auth)/premium')} style={themed($container)}>
            <SmartImage imgKey="boarding1.png" width={44} height={44} />
            <View style={{
                flex: 1,
            }}>
                <Text style={themed($title)} size="xs" weight="bold">Subscribe to Challengli Pro</Text>
                <Text style={themed($subtitle)} numberOfLines={1} size="xxs" weight="medium">Unlock All Categories, Track Your daily Streaks, Follow Friends & Stay Inspired and Unlock Achievements</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProComponent

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
    padding: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: 12,
    backgroundColor: colors.palette.muted
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
    color: colors.text
})

const $subtitle: ThemedStyle<TextStyle> = ({ colors }) => ({
    color: colors.textDim
})