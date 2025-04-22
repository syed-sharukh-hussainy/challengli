import React, { useCallback, useState } from "react"
import ActionModal from "./ActionModal/ActionModal"
import ModalText from "./ActionModal/ModalText"
import WheelPicker from "@quidone/react-native-wheel-picker"
import ModalButton from "./ActionModal/ModalButton"
import { TextStyle, View, ViewStyle } from "react-native"
import { HOURS, MINUTES, PERIOD } from "@/utils/constants"
import { useAppTheme } from "@/utils/useAppTheme"
import { Entypo } from "@expo/vector-icons"
import { ThemedStyle } from "@/theme"

type Props = {
  showTimePicker: boolean
  onCloseButtonPressed: () => void
  onSaveButtonPressed: (hour: number, minutes: number, period: number) => void
  isLoading: boolean
  initialHour?: number
  initialMinutes?: number
  initialPeriod?: number
  color: string
}

const TimePickerModal = ({
  onCloseButtonPressed,
  showTimePicker,
  isLoading,
  onSaveButtonPressed,
  initialHour = 8,
  initialMinutes = 30,
  initialPeriod = 1,
  color,
}: Props) => {
  const { theme, themed } = useAppTheme()
  const [hour, setHour] = useState(initialHour)
  const [minutes, setMinutes] = useState(initialMinutes)
  const [period, setPeriod] = useState(initialPeriod)

  type Props = {
    item: {
      value: number
    }
  }

  const handleHourChange = useCallback(
    ({ item: { value } }: Props) => !isLoading && setHour(value),
    [isLoading]
  )

  const handleMinuteChange = useCallback(
    ({ item: { value } }: Props) => !isLoading && setMinutes(value),
    [isLoading]
  )

  const handlePeriodChange = useCallback(
    ({ item: { value } }: Props) => !isLoading && setPeriod(value),
    [isLoading]
  )

  return (
    <ActionModal visible={showTimePicker}>
      <ModalText title="Reminder Time" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WheelPicker
          data={HOURS}
          value={hour}
          contentContainerStyle={{
            padding: 12,
          }}
          overlayItemStyle={themed($overlay)}
          itemTextStyle={themed($time)}
          onValueChanged={handleHourChange}
        />
        <Entypo name="dots-two-vertical" size={22} color={theme.colors.palette.gray200} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <WheelPicker
            data={MINUTES}
            value={minutes}
            contentContainerStyle={{
              padding: 12,
            }}
            overlayItemStyle={themed($overlay)}
            itemTextStyle={themed($time)}
            onValueChanged={handleMinuteChange}
          />
          <WheelPicker
            data={PERIOD}
            value={period}
            contentContainerStyle={{
              padding: 12,
            }}
            overlayItemStyle={themed($overlay)}
            itemTextStyle={themed($time)}
            onValueChanged={handlePeriodChange}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <ModalButton
            label="close"
            onPress={() => {
              onCloseButtonPressed()
              setHour(initialHour)
              setMinutes(initialMinutes)
              setPeriod(initialPeriod)
            }}
            isLoading={isLoading}
            style={themed((theme) => ({
              backgroundColor: theme.colors.palette.gray,
            }))}
            labelStyle={themed((theme) => ({
              color: theme.colors.text,
            }))}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <ModalButton
            label="save"
            onPress={() => {
              onSaveButtonPressed(hour, minutes, period)
            }}
            isLoading={isLoading}
            style={themed(({ colors }) => ({
              backgroundColor: color,
            }))}
            labelStyle={{
              color: "white",
            }}
          />
        </View>
      </View>
    </ActionModal>
  )
}

export default React.memo(TimePickerModal)

const $time: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.fonts.spaceGrotesk.semiBold,
  fontSize: 24,
  color: colors.text,
})

const $overlay: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  backgroundColor: isDark ? "white" : "black",
})
