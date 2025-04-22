import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAppTheme } from '@/utils/useAppTheme'
import { Text } from '../Text'
import { FontAwesome6 } from '@expo/vector-icons'
import TimePickerModal from '../UI/TimePickerModal'
import { getLabelByValue } from '@/utils/helper'
import { HOURS, MINUTES, PERIOD } from '@/utils/constants'

type Props = {
    reminderTime: {
        hour: number,
        minutes: number,
        period: number,
    },
    setReminderTime: (reminderTime: {
        hour: number,
        minutes: number,
        period: number,
    }) => void,
}

const ChallengeNotification = ({ reminderTime, setReminderTime }: Props) => {
    const [hour, setHour] = useState(reminderTime.hour)
    const [minutes, setMinutes] = useState(reminderTime.minutes)
    const [period, setPeriod] = useState(reminderTime.period)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const { themed, theme } = useAppTheme()
    return (
        <>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowTimePicker(true)}
                style={[
                    themed(({ colors, spacing }) => ({
                        borderColor: colors.border,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: spacing.md,
                        borderWidth: 2,
                        borderTopWidth: 0,
                        borderBottomLeftRadius: 24,
                        borderBottomRightRadius: 24,
                    })),
                ]}
            >
                <View
                    style={{
                        gap: 3,
                    }}
                >
                    <Text
                        size="xs"
                        weight="semiBold"
                        style={themed(({ colors }) => ({
                            color: colors.textDim,
                        }))}
                    >
                        Reminder
                    </Text>
                    <Text size="sm" weight="semiBold" numberOfLines={1}>
                        {getLabelByValue(HOURS, hour)}:{getLabelByValue(MINUTES, minutes)}{" "}
                        {getLabelByValue(PERIOD, period)}
                    </Text>
                </View>
                <FontAwesome6 name={"pencil"} size={18} color="#9ca3af" />
            </TouchableOpacity>

            <TimePickerModal
                showTimePicker={showTimePicker}
                onCloseButtonPressed={() => {
                    setShowTimePicker(false)
                    setHour(reminderTime.hour)
                    setMinutes(reminderTime.minutes)
                    setPeriod(reminderTime.period)
                }}
                onSaveButtonPressed={(hour, minutes, period) => {
                    setHour(hour)
                    setMinutes(minutes)
                    setPeriod(period)
                    setReminderTime({
                        hour,
                        minutes,
                        period,
                    })
                    setShowTimePicker(false)
                }}
                isLoading={false}
                initialHour={hour}
                initialMinutes={minutes}
                initialPeriod={period}
                color={theme.colors.palette.primary}
            />
        </>
    )
}

export default ChallengeNotification