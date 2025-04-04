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
      </Stack>
    </Authenticated>
  )
}
export default Layout
