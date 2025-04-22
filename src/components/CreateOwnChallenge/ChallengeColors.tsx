import { FlatList, TouchableOpacity, View } from "react-native"
import { Text } from "../Text"
import { useAppTheme } from "@/utils/useAppTheme"
import { COLORS } from "@/utils/constants"

type Props = {
  selectedColor: { primary: string; secondary: string }
  setSelectedColor: (color: { primary: string; secondary: string }) => void
}

const ChallengeColors = ({ selectedColor, setSelectedColor }: Props) => {
  const { themed } = useAppTheme()
  return (
    <View
      style={[
        themed(({ colors, spacing }) => ({
          borderColor: colors.border,
          padding: spacing.md,
          borderWidth: 2,
          borderRadius: 24,
          marginTop: spacing.md,
        })),
      ]}
    >
      <Text
        size="sm"
        weight="semiBold"
        style={themed(({ colors }) => ({
          color: colors.text,
        }))}
      >
        Choose Color
      </Text>
      <View
        style={{
          marginTop: 12,
        }}
      >
        <FlatList
          scrollEnabled={false}
          keyExtractor={(item, index) => item.primary + index}
          data={COLORS}
          contentContainerStyle={{
            gap: 8,
          }}
          columnWrapperStyle={{
            gap: 8,
          }}
          numColumns={8}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              //@ts-ignore:next-line:no-unknow
              onPress={() => setSelectedColor(item)}
              style={{
                flex: 1,
                height: 34,
                backgroundColor: item.primary,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item === selectedColor ? (
                <View
                  style={{ width: 10, height: 10, borderRadius: 100, backgroundColor: "white" }}
                ></View>
              ) : null}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

export default ChallengeColors
