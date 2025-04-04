import { View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { router } from "expo-router"
import ActionButton from "./ActionButton"

const TopBarWithActions = () => {
  const { themed } = useAppTheme()
  return (
    <View style={themed($topHeader)}>
      <View style={$headerAction}>
        <ActionButton
          icon="chevron-left"
          onPress={() => {
            router.back()
          }}
        />
        <View style={$rightAction}>
          <ActionButton
            icon="bell"
            onPress={() => {
              console.log("bell")
            }}
          />
          <ActionButton
            icon="trash-alt"
            size={22}
            onPress={() => {
              console.log("trash")
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default TopBarWithActions

const $topHeader: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  height: 70,
  justifyContent: "center",
  backgroundColor: colors.background,
  borderBottomWidth: 2,
  borderBottomColor: colors.border,
})

const $headerAction: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $rightAction: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
