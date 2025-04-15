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
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import * as NavigationBar from "expo-navigation-bar"
import { ClerkProvider, useAuth, ClerkLoaded } from "@clerk/clerk-expo"
import { tokenCache } from "@/utils/cache"
import { ConvexReactClient, useConvexAuth } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import LoadingLogo from "@/components/UI/LoadingLogo"
import { useExitConfirmation } from "@/hooks/useExitConfirmation"
import NetInfo from "@react-native-community/netinfo"
import ActionModal from "@/components/UI/ActionModal/ActionModal"
import ModalText from "@/components/UI/ActionModal/ModalText"
import { Platform, View } from "react-native"
import ModalButton from "@/components/UI/ActionModal/ModalButton"
import useRevenueCat from "@/hooks/useRevenueCat"

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

const apiKey = Platform.select({
  android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY!
})

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
    } else if (!isAuthenticated && pathname !== "/login") {
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
  const { themed } = useAppTheme()
  const { showExitPopup, setShowExitPopup, handleExitPress } = useExitConfirmation()
  const [isConnected, setIsConnected] = useState(true)
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true)
    })

    return () => unsubscribe()
  }, [])


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
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <ClerkLoaded>
            <KeyboardProvider>
              <GestureHandlerRootView
                style={{
                  flex: 1,
                }}
              >
                <InitialLayout />
              </GestureHandlerRootView>
            </KeyboardProvider>
          </ClerkLoaded>
        </ConvexProviderWithClerk>
      </ClerkProvider>

      <ActionModal visible={showExitPopup}>
        <ModalText title="Are you sure you want to exit?" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            marginTop: 14,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <ModalButton
              label="close"
              onPress={() => setShowExitPopup(false)}
              style={themed(({ colors }) => ({
                backgroundColor: colors.palette.gray,
              }))}
              labelStyle={themed(({ colors }) => ({
                color: colors.text,
              }))}
            />
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <ModalButton
              label="exit"
              onPress={() => handleExitPress()}
              style={themed(({ colors }) => ({
                backgroundColor: colors.palette.angry500,
              }))}
              labelStyle={{
                color: "white",
              }}
            />
          </View>
        </View>
      </ActionModal>
      <ActionModal visible={!isConnected}>
        <ModalText title="Please check your internet and try again" />
      </ActionModal>
    </ThemeProvider>
  )
}
