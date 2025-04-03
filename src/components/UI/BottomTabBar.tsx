import React from "react"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { View, Pressable, ViewStyle } from "react-native"
import { AutoImage } from "../AutoImage"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const imageSources: Record<string, any> = {
  Home: require("../../../assets/images/home.png"),
  Challenges: require("../../../assets/images/challenge.png"),
  Profile: require("../../../assets/images/profile.png"),
  Leaderboard: require("../../../assets/images/leaderboard.png"),
}

function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { themed } = useAppTheme()
  const getLabel = (route: any, options: any) => {
    return typeof options.tabBarLabel === "string"
      ? options.tabBarLabel
      : typeof options.title === "string"
        ? options.title
        : route.name
  }

  return (
    <View style={themed($bottomTabBar)}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = getLabel(route, options)
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        return (
          <Pressable
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={$bottomTabBarItem}
          >
            <AutoImage
              source={imageSources[label]}
              style={{
                width: 24,
                height: 24,
                marginBottom: 8,
              }}
            />
            {isFocused && <View style={themed($dot)} />}
          </Pressable>
        )
      })}
    </View>
  )
}

export default React.memo(BottomTabBar)

const $bottomTabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 86,
  flexDirection: "row",
  borderTopWidth: 2,
  borderColor: colors.border,
  backgroundColor: colors.background,
})

const $bottomTabBarItem: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const $dot: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 8,
  width: 8,
  borderRadius: 100,
  backgroundColor: colors.palette.primary,
})
