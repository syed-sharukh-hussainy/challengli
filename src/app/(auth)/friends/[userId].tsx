import React, { useCallback, useMemo, useState } from "react"
import { router, useLocalSearchParams } from "expo-router"
import { useUser } from "@clerk/clerk-expo"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { AutoImage, ListView, Screen, Text } from "@/components"
import TopBar from "@/components/UI/TopBar"
import TabHeader from "@/components/UI/TabHeader"
import Spinner from "@/components/UI/Spinner"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const Friends = () => {
  const { userId, query } = useLocalSearchParams<{
    userId: string
    query: string
  }>()
  const [tabName, setTabName] = useState(query)
  const { theme, themed } = useAppTheme()
  const { user } = useUser()
  const otherUser = useQuery(api.users.getUserById, { userId })

  const isMe = useMemo(() => user?.id === userId, [user?.id, userId])

  const usersFriendsIds = useMemo(() => {
    return tabName === "following" ? otherUser?.following : otherUser?.followers
  }, [tabName, otherUser])

  const friends = useQuery(api.users.getUserFriendsById, {
    friendsIds: usersFriendsIds,
  })
  const handlePress = useCallback(
    (userId: string) => {
      if (userId === user?.id) {
        router.push(`/(auth)/(tabs)/profile`)
      } else {
        router.push(`/other-users-profile/${userId}`)
      }
    },
    [user?.id],
  )
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar
        title={isMe ? "Friends" : `${otherUser?.firstName}'s Friends`}
        onBackButtonPressed={() => router.back()}
      />
      <TabHeader tabName={tabName} tabs={["following", "followers"]} setTabName={setTabName} />
      {!friends ? (
        <View
          style={{
            marginTop: 40,
          }}
        >
          <Spinner />
        </View>
      ) : friends.length == 0 ? (
        <View>
          <Text
            size="md"
            weight="semiBold"
            style={{
              textAlign: "center",
              marginTop: 24,
            }}
          >
            {isMe
              ? tabName === "following"
                ? "You are not following anyone yet!"
                : "You have no followers yet!"
              : tabName === "following"
                ? `${otherUser?.firstName} is not following anyone yet!`
                : `${otherUser?.firstName} has no followers yet`}
          </Text>
        </View>
      ) : (
        <ListView
          data={friends}
          contentContainerStyle={{
            padding: 16,
          }}
          estimatedItemSize={80}
          keyExtractor={(item) => item?._id!}
          renderItem={({ item, index }) => {
            const isFirst = index === 0
            const isLast = index === friends.length - 1

            const $borderStyles: ViewStyle = {
              borderTopLeftRadius: isFirst ? 24 : 0,
              borderTopRightRadius: isFirst ? 24 : 0,
              borderBottomRightRadius: isLast ? 24 : 0,
              borderBottomLeftRadius: isLast ? 24 : 0,
              borderBottomWidth: isLast ? 2 : 0,
            }
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[themed($container), $borderStyles]}
                onPress={() => handlePress(item?.userId!)}
              >
                <View
                  style={{
                    borderRadius: 100,
                    overflow: "hidden",
                    width: 40,
                    height: 40,
                  }}
                >
                  <AutoImage
                    source={{
                      uri: item?.imageUrl,
                    }}
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 100,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 12,
                  }}
                >
                  <Text
                    size="xs"
                    weight="semiBold"
                    numberOfLines={1}
                    style={{
                      overflow: "hidden",
                      color:
                        user?.id === item?.userId
                          ? theme.colors.palette.primary
                          : theme.colors.text,
                    }}
                  >
                    {item?.firstName} {item?.lastName} {user?.id === item?.userId ? " (You)" : ""}
                  </Text>
                  <Text
                    size="xxs"
                    weight="semiBold"
                    style={{
                      color:
                        user?.id === item?.userId
                          ? theme.colors.palette.primary
                          : theme.colors.text,
                    }}
                  >
                    {item?.xp} XP
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      )}
    </Screen>
  )
}

export default Friends
const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 80,
  borderWidth: 2,
  borderColor: colors.border,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: spacing.md,
})
