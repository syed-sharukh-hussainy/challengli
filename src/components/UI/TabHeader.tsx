import { useAppTheme } from "@/utils/useAppTheme"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../Text"

type Props = {
  tabName: string
  setTabName: (name: string) => void
  tabs: string[]
}

const TabHeader = ({ tabs, tabName, setTabName }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View style={$header}>
      {tabs.map((tab) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={tab}
          onPress={() => setTabName(tab)}
          style={themed(({ colors }) => ({
            flex: 1,
            borderBottomWidth: 2,
            borderColor: tabName === tab ? colors.palette.primary : colors.border,
            padding: 16,
          }))}
        >
          <Text
            size="xs"
            weight="bold"
            style={themed(({ colors }) => ({
              textAlign: "center",
              textTransform: "capitalize",
              color: tab === tabName ? colors.palette.primary : colors.textDim,
            }))}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default TabHeader
const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
