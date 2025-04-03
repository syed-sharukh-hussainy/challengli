import { FontAwesome6 } from "@expo/vector-icons"
import React from "react"
import { View, StyleSheet, Animated, Easing } from "react-native"

type Props = {
  color?: string
  size?: number
}

const Spinner = ({ color, size }: Props) => {
  const spinValue = new Animated.Value(0)

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start()

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <FontAwesome6 name="spinner" size={size ? size : 18} color={color || "#4ade80"} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Spinner
