import { View, Text } from "react-native"
import React from "react"
import PulseDot from "./PulseDot"

const LoadingAnimation = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
        <PulseDot delay={100} />
        <PulseDot delay={150} />
        <PulseDot delay={200} />
      </View>
    </View>
  )
}

export default LoadingAnimation
