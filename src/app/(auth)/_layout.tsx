import { Authenticated } from "convex/react"
import { Stack } from "expo-router"

const Layout = () => {
  return (
    <Authenticated>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="categories" />
        <Stack.Screen name="challenges-list/[categoryId]" />
        <Stack.Screen name="preset-challenge-details/[challengeId]" />
        <Stack.Screen name="created-challenge-details/[challengeId]" />
        <Stack.Screen name="challenge-preferences/[challengeId]" />
        <Stack.Screen name="search-users" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="other-users-profile/[userId]" />
        <Stack.Screen name="achievements/[userId]" />
        <Stack.Screen name="friends/[userId]" />
        <Stack.Screen name="profile-settings" />
        <Stack.Screen name="calendar-streak" />
        <Stack.Screen name="feedback" />
        <Stack.Screen name="notification-settings" />
      </Stack>
    </Authenticated>
  )
}
export default Layout
