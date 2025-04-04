import { Text } from "@/components/Text"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import React from "react"
import { TextStyle, View } from "react-native"

const ModalText = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const { themed } = useAppTheme()
  return (
    <View
      style={{
        gap: 4,
      }}
    >
      <Text size="md" weight="semiBold" style={themed($title)}>
        {title}
      </Text>
      {subtitle && (
        <Text size="sm" weight="normal" style={themed($subtitle)}>
          {subtitle}
        </Text>
      )}
    </View>
  )
}

export default ModalText

const $title: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  textAlign: "center",
  color: colors.text,
  paddingHorizontal: spacing.md,
})

const $subtitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  color: colors.text,
})
