import React, { useCallback, useState } from "react"
import { View, TouchableOpacity, FlatList } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import { NEW_CHALLENGE_IMAGES } from "@/utils/constants"
import SmartImage from "../UI/SmartImage"
import ModalWrapper from "./ModalWrapper"
import FooterButton from "../UI/FooterButton"

type Props = {
  selectedImage: string
  setSelectedImage: (image: string) => void
}

const ImageItem = React.memo(
  ({
    iconKey,
    selected,
    onSelect,
  }: {
    iconKey: string
    selected: boolean
    onSelect: (key: string) => void
  }) => {
    const { themed } = useAppTheme()
    return (
      <TouchableOpacity
        onPress={() => onSelect(iconKey)}
        style={themed(({ colors }) => ({
          borderColor: selected ? colors.palette.primary : colors.background,
          borderWidth: 3,
          borderRadius: 100,
          padding: 2,
          justifyContent: "center",
          alignItems: "center",
        }))}
      >
        <SmartImage imgKey={iconKey} width={50} height={50} />
      </TouchableOpacity>
    )
  }
)

const SectionItem = React.memo(
  ({
    section,
    selectedImage,
    onSelect,
  }: {
    section: { title: string; data: { key: string }[] }
    selectedImage: string
    onSelect: (key: string) => void
  }) => (
    <View style={{ marginBottom: 30 }}>
      <Text style={{ marginBottom: 12 }} size="md" weight="bold">
        {section.title.charAt(0).toUpperCase() + section.title.slice(1)}
      </Text>
      <FlatList
        data={section.data}
        keyExtractor={(item) => item.key}
        numColumns={5}
        columnWrapperStyle={{
          marginBottom: 10,
          gap: 12,
          justifyContent: "space-between",
        }}
        scrollEnabled={false}
        renderItem={({ item: icon }) => (
          <ImageItem
            iconKey={icon.key}
            selected={icon.key === selectedImage}
            onSelect={onSelect}
          />
        )}
      />
    </View>
  )
)

const SelectImage = ({ selectedImage, setSelectedImage }: Props) => {
  const { theme } = useAppTheme()
  const [openImageModal, setOpenImageModal] = useState(false)
  const [image, setImage] = useState(selectedImage)

  const renderSection = useCallback(
    ({ item }: {
      item: {
        title: string;
        data: {
          name: string;
          key: string;
        }[]
      }
    }) => (
      <SectionItem section={item} selectedImage={image} onSelect={setImage} />
    ),
    [image]
  )

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setOpenImageModal(true)}
        style={{
          alignItems: "center",
          overflow: "hidden",
          marginVertical: 24,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            backgroundColor: theme.colors.palette.muted,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selectedImage !== "" ? (
            <SmartImage imgKey={selectedImage} width={100} height={100} />
          ) : (
            <FontAwesome6
              name="plus"
              size={34}
              color={theme.isDark ? theme.colors.palette.gray200 : "#9ca3af"}
            />
          )}
        </View>
      </TouchableOpacity>

      <ModalWrapper
        visible={openImageModal}
        setVisible={() => setOpenImageModal(false)}
        title="Choose Image"
      >
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={NEW_CHALLENGE_IMAGES}
          keyExtractor={(item) => item.title}
          renderItem={renderSection}
          showsVerticalScrollIndicator={false}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={5}
        />

        <FooterButton
          backgroundColor={theme.colors.palette.primary}
          label="Save"
          onPress={() => {
            setSelectedImage(image)
            setOpenImageModal(false)
          }}
        />
      </ModalWrapper>
    </>
  )
}

export default React.memo(SelectImage)
