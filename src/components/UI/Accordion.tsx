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
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 12,
                  marginVertical: 4,
                }}
              >
                <View style={{ marginTop: 4 }}>
                  <FontAwesome6 name="caret-right" size={14} color={challengeColor} />
                </View>
                <Text size="xs" weight="normal">
                  {item}
                </Text>
              </View>
            ))
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 12,
                marginVertical: 4,
              }}
            >
              <View style={{ marginTop: 4 }}>
                <FontAwesome6 name="check" size={14} color={challengeColor} />
              </View>
              <Text size="xs" weight="normal">
                {content}
              </Text>
            </View>
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
  borderRadius: 18,
  backgroundColor: colors.palette.muted,
  padding: spacing.sm,
})

const $btn: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  flex: 1,
}

const $subtitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})
