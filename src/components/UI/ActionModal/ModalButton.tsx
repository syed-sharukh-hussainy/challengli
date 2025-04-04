import { View, TouchableOpacity } from "react-native"
import React from "react"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/utils/useAppTheme"

type Props = {
  setShowModal: (val: boolean) => void
  label: string
}

const ModalButton = ({ label, setShowModal }: Props) => {
  const { themed } = useAppTheme()
  return (
    <TouchableOpacity
      onPress={() => setShowModal(false)}
      style={themed(({ spacing, colors }) => ({
        backgroundColor: colors.palette.muted,
        marginTop: spacing.md,
        padding: spacing.xs,
        borderRadius: 12,
        alignItems: "center",
        borderWidth: 2,
        flex: 1,
        borderColor: colors.border,
      }))}
    >
      <Text size="sm" weight="semiBold">
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default ModalButton
