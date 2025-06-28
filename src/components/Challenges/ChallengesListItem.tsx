import { TouchableOpacity, View, ViewStyle } from "react-native"
import React from "react"
import { spacing, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import SmartImage from "../UI/SmartImage"
import { router } from "expo-router"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { FontAwesome6 } from "@expo/vector-icons"
import { BlurView } from 'expo-blur';

type Props = {
  title: string
  description: string
  image: string
  challengeId: string
  duration: number
  primaryColor: string
  isFree: boolean;
  isChallengePresent: boolean
}

const ChallengesListItem = ({
  challengeId,
  description,
  duration,
  image,
  title,
  primaryColor,
  isChallengePresent,
  isFree
}: Props) => {
  const { themed, theme } = useAppTheme()
  const userChallenge = useQuery(api.userChallenges.getChallengeByChallengeId, {
    challengeId
  })
  const user = useQuery(api.users.getUser, {});
  const isLocked = !isFree && !user?.isPro;

  const onChallengePressed = () => {
    if (!isLocked) {
      if (isChallengePresent && userChallenge) {
        router.push(`/(auth)/created-challenge-details/${userChallenge._id}`)
      } else {
        router.push(`/(auth)/preset-challenge-details/${challengeId}`)
      }
    } else {
      router.push('/(auth)/premium')
    }
  }
  return (
    <TouchableOpacity
      onPress={onChallengePressed}
      activeOpacity={0.8}
      style={[themed($btnContainer), {
      }]}
    >
      <View style={{ width: "70%", alignItems: "flex-start", gap: 4, paddingHorizontal: 20, opacity: isLocked ? 0.6 : 1 }}>
        <Text
          style={themed(({ colors }) => ({
            color: isChallengePresent ? colors.textDim : colors.text,
            textDecorationLine: isChallengePresent ? "line-through" : "none",
          }))}
          size="sm"
          weight="bold"
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={themed(({ colors }) => ({
            color: colors.textDim,
            textDecorationLine: isChallengePresent ? "line-through" : "none",
          }))}
          size="xs"
          weight="normal"
          numberOfLines={3}
        >
          {description}
        </Text>
      </View>
      <View style={[$smartImage, { opacity: isLocked ? 0.6 : 1 }]}>
        <SmartImage imgKey={image} style={{ width: 116, height: 116 }} />
      </View>
      <View
        style={{
          backgroundColor: primaryColor,
          position: "absolute",
          top: 0,
          right: 0,
          borderBottomLeftRadius: 12,
          opacity: isLocked ? 0.6 : 1
        }}
      >
        <Text
          size="xxs"
          weight="semiBold"
          style={{
            color: "#fff",
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.xxxs,
          }}
        >
          {duration} DAYS
        </Text>
      </View>
      {isLocked && <View style={themed(({ colors }) => ({
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }))}>
        <View style={themed(() => ({
          backgroundColor: primaryColor,
          width: 56,
          height: 56,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center'
        }))}>

          <FontAwesome6 name="lock" size={24} color={"white"} />
        </View>
      </View>}
    </TouchableOpacity>
  )
}

export default ChallengesListItem

const $btnContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginBottom: spacing.md,
  height: 156,
  overflow: "hidden",
  backgroundColor: colors.tintInactive,
  borderRadius: 24,
  justifyContent: "center",
})

const $smartImage: ViewStyle = {
  position: "absolute",
  bottom: -16,
  right: -16,
}
