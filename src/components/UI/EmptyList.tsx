import { View } from "react-native"
import React from "react"
import SmartImage from "./SmartImage"
import { Text } from "../Text"

const EmptyList = () => {
  return (
    <View>
      <SmartImage
        imgKey="empty.png"
        style={{
          width: 100,
          height: 100,
        }}
      />
      <Text>Ready to start a challenge?</Text>
      <Text>Tap the "+" below to create a new challenge</Text>
    </View>
  )
}

export default EmptyList
