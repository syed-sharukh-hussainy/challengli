import { View, ViewStyle, Pressable, TextStyle } from "react-native"
import React, { useState } from "react"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import SmartImage from "./SmartImage"
import { Text } from "../Text"
import { FontAwesome6 } from "@expo/vector-icons"
type AccordionProps = {
  title: string
  subtitle: string
  content: string | string[]
  isList: boolean
  challengeColor: string | undefined
  isInitExpanded: boolean
  imageKey: string
}
const Accordion = ({
  title,
  subtitle,
  content,
  isList,
  challengeColor,
  isInitExpanded,
  imageKey,
}: AccordionProps) => {
  const { themed } = useAppTheme()
  const [isExpanded, setIsExpanded] = useState(isInitExpanded)
  return (
    <View style={themed($container)}>
      <Pressable style={$btn} onPress={() => setIsExpanded(!isExpanded)}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <SmartImage imgKey={imageKey} style={{ width: 40, height: 40 }} />
          <View>
            <Text size="xs" weight="semiBold" style={themed($title)}>
              {title}
            </Text>
            <Text size="xxs" style={themed($subtitle)}>
              {subtitle}
            </Text>
          </View>
        </View>
        <FontAwesome6 name={isExpanded ? "chevron-up" : "chevron-down"} size={18} color="#4b5563" />
      </Pressable>
      {isExpanded && (
        <View style={{ marginTop: 16 }}>
          {isList && Array.isArray(content) ? (
            content.map((item, index) => (
              <View key={index} className="my-1 flex-row items-start gap-3">
                <FontAwesome6
                  name="caret-right"
                  className="mt-1.5"
                  size={14}
                  color={challengeColor}
                />
                <Text className="font-urbanist-semibold text-base text-gray-400">{item}</Text>
              </View>
            ))
          ) : (
            <Text size="xs" weight="medium">
              {content}
            </Text>
          )}
        </View>
      )}
    </View>
  )
}

export default Accordion

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.sm,
  overflow: "hidden",
  borderRadius: 16,
  backgroundColor: colors.palette.muted,
  padding: spacing.sm,
})

const $btn: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 40,
}

const $subtitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})
