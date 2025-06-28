import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../Text"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"
import { FontAwesome6 } from "@expo/vector-icons"
import { useCallback, useMemo } from "react"
import { router } from "expo-router"
import { format } from "date-fns/format"

type ItemProps = {
  day: number
  title: string
  status?: string
  date?: string
}

type ActivityItemProps = {
  item: ItemProps
  isFirst: boolean
  isLast: boolean
  isValidDate?: boolean
  isPressable: boolean
  textColor?: string
  challengeId?: string
}

const ActivityItem = ({
  item,
  isLast,
  isFirst,
  isValidDate,
  isPressable,
  textColor,
  challengeId,
}: ActivityItemProps) => {
  const { themed, theme } = useAppTheme()
  const $borderStyles: ViewStyle = {
    borderTopLeftRadius: isFirst ? 24 : 0,
    borderTopRightRadius: isFirst ? 24 : 0,
    borderBottomRightRadius: isLast ? 24 : 0,
    borderBottomLeftRadius: isLast ? 24 : 0,
    borderBottomWidth: isLast ? 2 : 0,
  }
  const todaysDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), [])
  const handleActivityPress = useCallback(
    (date: string) => {
      if (isValidDate) {
        router.push(`/(auth)/day-activity/${challengeId}?query=${date}`)
      }
    },
    [challengeId, todaysDate],
  )

  const $textDecoration = item.status
    ? item.status === "COMPLETED"
      ? "line-through"
      : "none"
    : "none"

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[themed($itemContainer), $borderStyles]}
      onPress={() => {
        if (isPressable && item.date) {
          handleActivityPress(item.date)
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 14 }}>
          <View style={themed($dayContainer)}>
            <Text
              weight="semiBold"
              size="xxs"
              style={themed(({ colors }) => ({
                color: textColor ? textColor : colors.textDim,
                textTransform: "uppercase",
                textAlign: "center",
                textDecorationLine: $textDecoration,
              }))}
            >
              day
            </Text>
            <Text
              style={themed(({ colors }) => ({
                color: textColor ? textColor : colors.textDim,
                textTransform: "uppercase",
                textAlign: "center",
                textDecorationLine: $textDecoration,
              }))}
              weight="semiBold"
              size="xxs"
            >
              {item.day}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              size="xs"
              weight="bold"
              style={themed(({ colors }) => ({
                color: isValidDate ? textColor : colors.text,
                textDecorationLine: $textDecoration,
              }))}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            {item.date && (
              <Text
                size="xxs"
                weight="medium"
                style={themed(({ colors }) => ({
                  color: textColor ? textColor : colors.text,
                  textDecorationLine: $textDecoration,
                }))}
              >
                {item.date ? format(new Date(item.date), "MMM dd, E") : ""}
              </Text>
            )}
          </View>
        </View>
        {!isValidDate ? (
          <FontAwesome6 name="lock" size={18} color={theme.colors.palette.gray} />
        ) : item.status === "COMPLETED" ? (
          <FontAwesome6 name="check-circle" size={22} color={textColor} />
        ) : (
          <FontAwesome6 name="circle-chevron-right" size={22} color={textColor} />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ActivityItem

const $itemContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 86,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 2,
  borderColor: colors.border,
  backgroundColor: colors.background,
  paddingHorizontal: spacing.sm,
})

const $dayContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.tintInactive,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  borderRadius: 12,
})
