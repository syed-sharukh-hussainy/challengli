import { FlatList, Pressable, TextStyle, View } from "react-native"
import { ListView, Screen, Text, TextField } from "@/components"
import { router } from "expo-router"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import TopBar from "@/components/UI/TopBar"
import { useCallback, useEffect, useState } from "react"
import { useMutation, usePaginatedQuery, useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { Doc } from "convex/_generated/dataModel"
import UserProfile from "@/components/SearchUsers/UserProfile"
import Spinner from "@/components/UI/Spinner"

const SearchUsers = () => {
  const { themed, theme } = useAppTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<Doc<"users">[]>([])

  const {
    results: users = [],
    status,
    loadMore,
    isLoading,
  } = usePaginatedQuery(api.users.getAllusers, {}, { initialNumItems: 10 })

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase()
    if (trimmedSearchTerm === "") {
      setFilteredUsers(users)
    } else {
      setFilteredUsers(
        users?.filter(
          (user) =>
            user.firstName.toLowerCase().includes(trimmedSearchTerm) ||
            user.lastName.toLowerCase().includes(trimmedSearchTerm) ||
            user.userName.toLowerCase().includes(trimmedSearchTerm),
        ),
      )
    }
  }, [searchTerm, users])

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar title="Search Users" onBackButtonPressed={() => router.back()} />
      <View
        style={{
          padding: 20,
          flex: 1,
        }}
      >
        <TextField
          cursorColor={theme.colors.palette.primary}
          style={themed($textField)}
          onChangeText={setSearchTerm}
          placeholder="Search By Name or Username"
        />

        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            paddingTop: 32,
          }}
          ListEmptyComponent={() =>
            searchTerm && filteredUsers.length === 0 ? (
              <Text
                size="sm"
                weight="semiBold"
                style={{
                  textAlign: "center",
                }}
              >
                No users found with that name.
              </Text>
            ) : null
          }
          renderItem={({ item, index }) => (
            <UserProfile index={index} user={item} length={filteredUsers.length} />
          )}
          ListFooterComponent={
            isLoading ? (
              <View className="mt-2">
                <Spinner size={24} />
              </View>
            ) : status === "CanLoadMore" ? (
              <Pressable onPress={() => loadMore(10)} className="mt-4 items-center">
                <Text className="font-urbanist-bold text-lg uppercase text-green-400">
                  Load More
                </Text>
              </Pressable>
            ) : null
          }
        />
      </View>
    </Screen>
  )
}

export default SearchUsers

const $textField: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlignVertical: "center",
  color: colors.text,
  fontSize: 14,
})
