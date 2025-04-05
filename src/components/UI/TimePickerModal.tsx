import React, { useState } from "react"
import ActionModal from "./ActionModal/ActionModal"
import { TextStyle, View, ViewStyle } from "react-native"
import ModalText from "./ActionModal/ModalText"
import WheelPicker from "@quidone/react-native-wheel-picker"
import { HOURS, MINUTES, PERIOD } from "@/utils/constants"
import { useAppTheme } from "@/utils/useAppTheme"
import { Entypo } from "@expo/vector-icons"
import { ThemedStyle } from "@/theme"
import ModalButton from "./ActionModal/ModalButton"

type Props = {
  showTimePicker: boolean
  onCloseButtonPressed: () => void
  onSaveButtonPressed: (hour: number, minutes: number, period: number) => void
  isLoading: boolean
  initialHour?: number
  initialMinutes?: number
  initialPeriod?: number
}

const TimePickerModal = ({
  onCloseButtonPressed,
  showTimePicker,
  isLoading,
  onSaveButtonPressed,
  initialHour = 8,
  initialMinutes = 30,
  initialPeriod = 1,
}: Props) => {
  const { themed } = useAppTheme()
  const [hour, setHour] = useState(initialHour)
  const [minutes, setMinutes] = useState(initialMinutes)
  const [period, setPeriod] = useState(initialPeriod)
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
          onValueChanged={({ item: { value } }) => setHour(value)}
        />
        <Entypo name="dots-two-vertical" size={22} color="black" />
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
            onValueChanged={({ item: { value } }) => setMinutes(value)}
          />
          <WheelPicker
            data={PERIOD}
            value={period}
            contentContainerStyle={{
              padding: 12,
            }}
            overlayItemStyle={themed($overlay)}
            itemTextStyle={themed($time)}
            onValueChanged={({ item: { value } }) => setPeriod(value)}
          />
        </View>
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}
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
        <ModalButton
          label="save"
          onPress={() => {
            onSaveButtonPressed(hour, minutes, period)
          }}
          isLoading={isLoading}
          style={themed(({ colors }) => ({
            backgroundColor: colors.palette.primary,
          }))}
          labelStyle={{
            color: "white",
          }}
        />
      </View>
    </ActionModal>
  )
}

export default TimePickerModal

const $time: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.fonts.spaceGrotesk.semiBold,
  fontSize: 24,
  color: colors.text,
})

const $overlay: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  backgroundColor: isDark ? "white" : "black",
})
