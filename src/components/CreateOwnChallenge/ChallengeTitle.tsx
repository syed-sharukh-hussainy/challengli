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
  selectedTitle: string
  setSelectedTitle: (val: string) => void
}

const ChallengeTitle = ({ selectedTitle, setSelectedTitle }: Props) => {
  const { themed, theme } = useAppTheme()
  const [editTitle, setEditTitle] = useState(false)
  const [title, setTitle] = useState(selectedTitle)
  return (
    <>
      <TouchableOpacity
        onPress={() => setEditTitle(true)}
        activeOpacity={0.7}
        style={[
          themed(({ colors, spacing }) => ({
            borderColor: colors.border,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: spacing.md,
            borderWidth: 2,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderBottomWidth: 0,
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
            Title
          </Text>
          <Text size="sm" weight="semiBold" numberOfLines={1}>
            {selectedTitle === "" ? "Challenge Title" : selectedTitle}
          </Text>
        </View>
        {selectedTitle === "" ? (
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

      <ModalWrapper title="Add Title" visible={editTitle} setVisible={() => { setEditTitle(false); setTitle(selectedTitle) }}>
        <View style={{
          marginTop: 32,
          gap: 24,
          paddingHorizontal: 20,
        }}>
          <TextField
            textAlignVertical="center"
            value={title}
            autoFocus={true}
            onChangeText={setTitle}
            placeholder="Challenge Title"
          />
          <CustomButton onPress={() => {
            setSelectedTitle(title)
            setEditTitle(false)
          }} text="Save" />
        </View>
      </ModalWrapper>
    </>
  )
}

export default ChallengeTitle
