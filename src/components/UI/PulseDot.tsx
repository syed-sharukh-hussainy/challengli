import { Animated, ViewStyle } from "react-native"
import React, { useEffect, useRef } from "react"
import { useAppTheme } from "@/utils/useAppTheme"

const PulseDot = ({ delay }: { delay: number }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const opacityAnim = useRef(new Animated.Value(1)).current
  const { themed } = useAppTheme()
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [delay])

  return (
    <Animated.View
      style={themed(({ colors }) => ({
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: colors.palette.gray,
        marginHorizontal: 4,
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }))}
    />
  )
}

export default PulseDot
