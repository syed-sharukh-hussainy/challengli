import { View, ViewStyle, ImageProps, TextStyle } from "react-native"
import React from "react"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import SmartImage from "../UI/SmartImage"
import { Text } from "../Text"

type Props = {
  image: string
  title: string | undefined
  description: string | undefined
  duration: number
  color: {
    primary: string
    secondary: string
  }
}

const DetailsHeader = ({ color, description, duration, image, title }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($container)}>
      <SmartImage imgKey={image} style={$image} />
      <View
        style={themed(({ spacing }) => ({
          backgroundColor: color.primary,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xxxs,
          borderRadius: 6,
          marginTop: spacing.sm,
        }))}
      >
        <Text
          size="xxs"
          weight="bold"
          style={{
            color: "white",
          }}
        >
          {duration} DAYS
        </Text>
      </View>
      <Text size="md" weight="bold" style={themed($title)}>
        {title}
      </Text>
      <Text size="xs" weight="normal" style={themed($description)}>
        {description}
      </Text>
    </View>
  )
}

export default DetailsHeader

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginBottom: spacing.xl,
  gap: 10,
})

const $image: ImageProps = {
  height: 112,
  width: 112,
}

const $title: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.text,
  marginTop: spacing.xs,
})
const $description: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
})
