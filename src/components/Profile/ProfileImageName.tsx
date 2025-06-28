import { View, ViewStyle, ImageStyle, TextStyle } from "react-native"
import React from "react"
import { useUser } from "@clerk/clerk-expo"
import Spinner from "../UI/Spinner"
import { AutoImage } from "../AutoImage"
import { format } from "date-fns"
import { Text } from "../Text"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

type Props = {
  imageUrl: string | undefined
  fullName: string | undefined
  username: string | undefined
  createdAt: number
  userId: string | undefined
}
const ProfileImageName = ({ imageUrl, createdAt, fullName, username }: Props) => {
  const { user } = useUser()
  const { themed } = useAppTheme()
  return (
    <View style={$container}>
      <View style={$imageWrapper}>
        {!user ? (
          <Spinner />
        ) : (
          <AutoImage
            source={{
              uri: imageUrl,
            }}
            style={$image}
          />
        )}
      </View>
      <View style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <View
          style={{
            gap: 2,
          }}
        >
          <Text size="sm" weight="bold" style={themed($name)} numberOfLines={1}>
            {fullName}
          </Text>
          <Text size="xxs" weight="semiBold" style={themed($subname)}>
            @{username}
          </Text>
          <Text size="xxs" weight="semiBold" style={themed($subname)}>
            Joined {format(createdAt, "MMMM yyyy")}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ProfileImageName

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
}
const $imageWrapper: ViewStyle = {
  width: 80,
  height: 80,
  borderRadius: 100,
  overflow: "hidden",
}
const $image: ImageStyle = {
  width: 80,
  height: 80,
  borderRadius: 100,
}

const $name: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $subname: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
