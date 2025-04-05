import { TouchableOpacity, View, ViewStyle } from "react-native"
import React, { useMemo } from "react"
import { Text } from "../Text"
import { differenceInDays, format } from "date-fns"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import SmartImage from "../UI/SmartImage"
import { router } from "expo-router"

type Props = {
  title: string
  length: number
  description: string
  imageUrl: string
  index: number
  startDate: string
  status: string
  id: string
  duration: number
  color: {
    primary: string
    secondary: string
  }
}

const MyChallengesListItem = ({
  title,
  description,
  imageUrl,
  index,
  id,
  startDate,
  duration,
  status,
  color,
  length,
}: Props) => {
  const { themed } = useAppTheme()
  const todaysDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), [])

  const dayNumber = differenceInDays(new Date(todaysDate), new Date(startDate)) + 1
  const isFirst = index === 0
  const isLast = index === length - 1

  const $borderStyles: ViewStyle = {
    borderTopLeftRadius: isFirst ? 24 : 0,
    borderTopRightRadius: isFirst ? 24 : 0,
    borderBottomRightRadius: isLast ? 24 : 0,
    borderBottomLeftRadius: isLast ? 24 : 0,
    borderBottomWidth: isLast ? 2 : 0,
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[themed($container), $borderStyles]}
      onPress={() => router.push(`/(auth)/created-challenge-details/${id}`)}
    >
      <View style={$wrapper}>
        <SmartImage imgKey={imageUrl} width={84} height={84} />
        <View
          style={{
            flex: 1,
            gap: 4,
          }}
        >
          <Text size="sm" weight="semiBold" numberOfLines={1}>
            {title}
          </Text>
          <Text size="xxs" numberOfLines={2}>
            {description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginTop: 4,
            }}
          >
            <View
              style={{
                backgroundColor: color.primary,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 6,
              }}
            >
              <Text size="xxs" weight="medium">
                Day {dayNumber} / {duration}
              </Text>
            </View>
            <View
              style={themed(({ colors }) => ({
                backgroundColor: colors.palette.angry500,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 6,
              }))}
            >
              <Text
                size="xxs"
                weight="medium"
                style={{
                  textTransform: "capitalize",
                  textAlign: "center",
                }}
              >
                {status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MyChallengesListItem

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  borderWidth: 2,
  borderColor: colors.border,
  padding: spacing.sm,
  justifyContent: "center",
})

const $wrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}
