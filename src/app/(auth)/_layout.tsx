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
      </Stack>
    </Authenticated>
  )
}
export default Layout
