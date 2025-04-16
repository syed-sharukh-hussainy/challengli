import { TouchableOpacity, View } from "react-native"
import { Text } from "../Text"
import { router } from "expo-router"
import { useAppTheme } from "@/utils/useAppTheme"

const UpgradePro = () => {
    const { themed, theme } = useAppTheme();
    return (
        <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text size="md" weight="bold" style={themed(({ colors, spacing }) => ({
                color: colors.text,
                textAlign: 'center',
            }))}>This content is available to Pro users only</Text>
            <Text size="xs" weight="normal" style={themed(({ colors, spacing }) => ({
                color: colors.textDim,
                textAlign: 'center',
                marginTop: spacing.sm,
            }))}>Upgrade to Pro to unlock this and many other features!</Text>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    router.push('/(auth)/premium')
                }}
                style={{
                    backgroundColor: theme.colors.palette.primary,
                    borderRadius: 14,
                    paddingVertical: 12,
                    width: '100%',
                    marginTop: 24
                }}
            >
                <Text size="sm" weight="bold" style={{
                    color: 'white',
                    textAlign: 'center',
                    textTransform: 'uppercase'
                }}>
                    Upgrade Pro
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UpgradePro