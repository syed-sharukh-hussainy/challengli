import { useUser } from "@clerk/clerk-expo"
import { Redirect, useRootNavigationState } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function Home() {
  const { user, isLoaded } = useUser()
  const rootNavigation = useRootNavigationState()

  // Prevent unnecessary redirects while loading user state
  if (!isLoaded || !rootNavigation?.key) {
    return null
  }

  return (
    <>
      <StatusBar style="dark" />
      {user ? <Redirect href={`/(auth)/(tabs)/home`} /> : <Redirect href={`/login`} />}
    </>
  )
}
