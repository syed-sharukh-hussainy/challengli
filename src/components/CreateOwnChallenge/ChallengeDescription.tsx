import { View, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import { FontAwesome6 } from "@expo/vector-icons"
import ActionModal from "../UI/ActionModal/ActionModal"
import ModalText from "../UI/ActionModal/ModalText"
import ModalButton from "../UI/ActionModal/ModalButton"
import { TextField } from "../TextField"
import ModalWrapper from "./ModalWrapper"
import CustomButton from "../UI/CustomButton"

type Props = {
  selectedDescription: string
  setSelectedDescription: (val: string) => void
}

const ChallengeDescription = ({ selectedDescription, setSelectedDescription }: Props) => {
  const { theme, themed } = useAppTheme()
  const [editDescription, setEditDescription] = useState(false)
  const [description, setDescription] = useState(selectedDescription)
  return (
    <>
      <TouchableOpacity
        onPress={() => setEditDescription(true)}
        activeOpacity={0.7}
        style={[
          themed(({ colors, spacing }) => ({
            borderColor: colors.border,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: spacing.md,
            borderWidth: 2,

          })),
        ]}
      >
        <View
          style={{
            gap: 3,
            flex: 1,
          }}
        >
          <Text
            size="xs"
            weight="semiBold"
            style={themed(({ colors }) => ({
              color: colors.textDim,
            }))}
          >
            Description
          </Text>
          <Text size="sm" weight="semiBold" numberOfLines={1}>
            {selectedDescription === "" ? "Challenge Description" : selectedDescription}
          </Text>
        </View>
        {selectedDescription === "" ? (
          <FontAwesome6 name={"pencil"} size={18} color="#9ca3af" />
        ) : (
          <View
            style={{
              backgroundColor: theme.colors.palette.primary,
              width: 28,
              height: 28,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }}
          >
            <FontAwesome6 name={"check"} size={18} color="white" />
          </View>
        )}
      </TouchableOpacity>

      <ModalWrapper title="Add Description" visible={editDescription} setVisible={() => { setEditDescription(false); setDescription(selectedDescription) }}>
        <View style={{
          marginTop: 32,
          gap: 24,
          paddingHorizontal: 20
        }}>
          <TextField
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
            placeholder="Challenge Description"
            multiline={true}
            numberOfLines={5}
          />
          <CustomButton onPress={() => {
            setSelectedDescription(description)
            setEditDescription(false)
          }} text="Save" />
        </View>
      </ModalWrapper>

    </>
  )
}

export default ChallengeDescription
