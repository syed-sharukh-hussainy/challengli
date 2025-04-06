import { useAppTheme } from "@/utils/useAppTheme"
import { View } from "react-native"
import SmartImage from "../UI/SmartImage"
import { Text } from "../Text"
import Spinner from "../UI/Spinner"

type Props = {
  image: string
  value: number | string
  label: string
  isLoading: boolean
}
const StatItem = ({ image, isLoading, label, value }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View
      style={themed(({ colors, spacing }) => ({
        borderWidth: 2,
        borderColor: colors.border,
        padding: spacing.sm,
        borderRadius: 16,
        flex: 1,
        flexDirection: "row",
        gap: 12,
      }))}
    >
      <SmartImage
        imgKey={image}
        width={24}
        height={24}
        style={{
          marginTop: 4,
        }}
      />
      {isLoading ? (
        <Spinner color={"white"} />
      ) : (
        <View style={{ flex: 1 }}>
          <Text size="md" weight="bold" numberOfLines={1}>
            {value}
          </Text>
          <Text
            size="xxs"
            weight="medium"
            numberOfLines={1}
            style={themed(({ colors }) => ({ color: colors.textDim }))}
          >
            {label}
          </Text>
        </View>
      )}
    </View>
  )
}

export default StatItem
