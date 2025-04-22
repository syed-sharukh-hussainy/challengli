import { ONBOARDING_SCREENS } from "@/utils/constants"
import { useEffect, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler"
import { Text } from "../Text"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"
import SmartImage from "./SmartImage"

const OnboardingSteps = () => {
  const [screenIndex, setScreenIndex] = useState(0)
  const { theme, themed } = useAppTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      setScreenIndex((prevIndex) =>
        prevIndex === ONBOARDING_SCREENS.length - 1 ? 0 : prevIndex + 1,
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const { title, description, imageUrl } = ONBOARDING_SCREENS[screenIndex]
  const onContinue = () => {
    const isLastScreen = screenIndex === ONBOARDING_SCREENS.length - 1
    setScreenIndex(isLastScreen ? 0 : screenIndex + 1)
  }

  const onBack = () => {
    const isFirstScreen = screenIndex === 0
    setScreenIndex(isFirstScreen ? ONBOARDING_SCREENS.length - 1 : screenIndex - 1)
  }

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().runOnJS(true).direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().runOnJS(true).direction(Directions.RIGHT).onEnd(onBack),
  )

  return (
    <>
      <GestureDetector gesture={swipes}>
        <View style={$topContainer}>
          <SmartImage
            imgKey={imageUrl}
            style={{
              width: 200,
              height: 200,
            }}
          />
          <View style={{
            width: "90%"
          }}>
            <Text weight="bold" size="lg" style={themed($title)}>
              {title}
            </Text>
          </View>
          <Text size="sm" style={themed($description)}>
            {description}
          </Text>
        </View>
      </GestureDetector>
      <View style={themed($dots)}>
        {ONBOARDING_SCREENS.map((_, index) => (
          <View
            key={index}
            style={[
              $dot,
              {
                backgroundColor:
                  index === screenIndex ? theme.colors.palette.primary : theme.colors.palette.muted,
              },
            ]}
          />
        ))}
      </View>
    </>
  )
}

export default OnboardingSteps

const $topContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $title: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  textAlign: "center",
  color: colors.text,
  marginTop: spacing.lg,
})

const $description: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  textAlign: "center",
  color: colors.textDim,
  marginTop: spacing.md,
})

const $dots: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  gap: 8,
}

const $dot: ViewStyle = {
  height: 14,
  width: 14,
  borderRadius: 100,
}
