import { Pressable, TouchableOpacity } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import { useAppTheme } from "@/utils/useAppTheme"
import { colors, colorsDark } from "@/theme"

type Props = {
  onPress: () => void
  icon: string
  size?: number
}

const ActionButton = ({ icon, onPress, size = 24 }: Props) => {
  const { theme } = useAppTheme()
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FontAwesome6
        name={icon}
        size={size}
        color={theme.isDark ? colors.palette.gray : colorsDark.palette.gray}
      />
    </TouchableOpacity>
  )
}

export default ActionButton
