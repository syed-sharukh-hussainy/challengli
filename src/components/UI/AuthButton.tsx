import { TouchableOpacity, Image, ViewStyle, ImageStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const googleLogo = require("../../../assets/images/google-logo.png")
const facebookLogo = require("../../../assets/images/facebook.png")

type Props = {
  onPress: (strategy: "oauth_google" | "oauth_facebook") => void
  isAuthLoading: boolean
  strategy: "oauth_google" | "oauth_facebook"
}

const AuthButton = ({ isAuthLoading, onPress, strategy }: Props) => {
  const { themed } = useAppTheme()
  return (
    <TouchableOpacity
      disabled={isAuthLoading}
      activeOpacity={0.8}
      style={themed($authButton)}
      onPress={() => {
        if (!isAuthLoading) {
          onPress(strategy)
        }
      }}
    >
      <Image source={strategy === "oauth_google" ? googleLogo : facebookLogo} style={$logo} />
    </TouchableOpacity>
  )
}

export default AuthButton

const $authButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderColor: colors.border,
  borderWidth: 2,
  borderRadius: 20,
  backgroundColor: colors.palette.muted,
  padding: spacing.sm,
  alignItems: "center",
  flex: 1,
})

const $logo: ImageStyle = {
  width: 28,
  height: 28,
}
