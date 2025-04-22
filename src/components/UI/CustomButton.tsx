import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppTheme } from '@/utils/useAppTheme'
import { Text } from '../Text'

type Props = {
    text: string,
    onPress: () => void
}

const CustomButton = ({ onPress, text }: Props) => {
    const { themed } = useAppTheme();
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={themed(({ colors }) => ({
                backgroundColor: colors.palette.primary,
                borderRadius: 12,
                paddingVertical: 12,
                marginBottom: 20,
            }))}
        >
            <Text
                size="sm"
                weight="bold"
                style={{
                    color: "white",
                    textAlign: "center",
                    textTransform: "uppercase",
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton