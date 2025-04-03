import { useCallback, useEffect, useState } from "react"
import {
  Slot,
  SplashScreen,
  Stack,
  useFocusEffect,
  usePathname,
  useRouter,
  useSegments,
} from "expo-router"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { useFonts } from "@expo-google-fonts/space-grotesk"
import { customFontsToLoad } from "@/theme"
import { initI18n } from "@/i18n"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { useThemeProvider } from "@/utils/useAppTheme"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import * as NavigationBar from "expo-navigation-bar"
import { ClerkProvider, useAuth, ClerkLoaded } from "@clerk/clerk-expo"
import { tokenCache } from "@/utils/cache"
import { ConvexReactClient, useConvexAuth } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import LoadingLogo from "@/components/UI/LoadingLogo"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  require("src/devtools/ReactotronConfig.ts")
}

export { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
})

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  )
}

const InitialLayout = () => {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  const segments = useSegments()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    if (isLoading) return

    const inAuthGroup = segments[0] === "(auth)"

    if (isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/(tabs)/home")
    } else if (!isAuthenticated && pathname !== "/") {
      router.replace("/login")
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return <LoadingLogo />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="loading" />
    </Stack>
  )
}

export default function Root() {
  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()
  useFocusEffect(
    useCallback(() => {
      if (themeScheme === "dark") {
        NavigationBar.setBackgroundColorAsync("#131f24")
        NavigationBar.setButtonStyleAsync("light")
      } else {
        NavigationBar.setBackgroundColorAsync("white")
        NavigationBar.setButtonStyleAsync("dark")
      }
    }, [themeScheme]),
  )
  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <KeyboardProvider>
              <GestureHandlerRootView
                style={{
                  flex: 1,
                }}
              >
                <InitialLayout />
              </GestureHandlerRootView>
            </KeyboardProvider>
          </ConvexProviderWithClerk>
        </ClerkLoaded>
      </ClerkProvider>
    </ThemeProvider>
  )
}
