import { TouchableOpacity, StyleProp, ViewStyle, TextStyle, View } from "react-native"
import React from "react"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"

type Props = {
  onPress: () => void
  label: string
  style: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  isLoading?: boolean
}

const ModalButton = ({ label, onPress, style, labelStyle, isLoading }: Props) => {
  const { themed } = useAppTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[themed($btn), style, { opacity: isLoading ? 0.5 : 1 }]}
      disabled={isLoading}
    >
      <Text size="xs" weight="semiBold" style={[$labelS, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default ModalButton

const $btn: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.xs,
  borderRadius: 12,
  alignItems: "center",
})

const $labelS: TextStyle = {
  textAlign: "center",
  textTransform: "uppercase",
}
