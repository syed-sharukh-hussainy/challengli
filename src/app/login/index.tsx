import { TextStyle, Platform, View, ViewStyle } from "react-native"
import { Screen, Text } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useAuth, useSSO } from "@clerk/clerk-expo"
import { Link, Redirect } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import * as Linking from "expo-linking"
import * as WebBrowser from "expo-web-browser"
import AuthButton from "@/components/UI/AuthButton"
import ModalSpinner from "@/components/UI/ModalSpinner"
import OnboardingSteps from "@/components/UI/OnboardingSteps"
import ActionModal from "@/components/UI/ActionModal/ActionModal"
import ModalText from "@/components/UI/ActionModal/ModalText"
import ModalButton from "@/components/UI/ActionModal/ModalButton"
import SmartImage from "@/components/UI/SmartImage"
import { useNotifications } from "@/hooks/useNotification"

WebBrowser.maybeCompleteAuthSession()

export default function WelcomeScreen() {
  useNotifications()
  const { themed } = useAppTheme()
  const { isSignedIn } = useAuth()
  const [showErrorModal, setShowErrorModal] = useState(false)

  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const { startSSOFlow } = useSSO()

  useEffect(() => {
    if (Platform.OS !== "android") return
    void WebBrowser.warmUpAsync()
    return () => {
      if (Platform.OS !== "android") return
      void WebBrowser.coolDownAsync()
    }
  }, [])

  const onPress = useCallback(async (strategy: "oauth_google" | "oauth_facebook") => {
    console.log(strategy)
    try {
      setIsAuthLoading(true)
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL("loading", { scheme: "challengli" }),
      })
      if (createdSessionId) {
        await setActive!({ session: createdSessionId })
      } else {
        setShowErrorModal(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsAuthLoading(false)
    }
  }, [])

  if (isSignedIn) {
    return <Redirect href={"/(auth)/(tabs)/home"} />
  }

  return (
    <>
      <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
        <OnboardingSteps />
        <View style={themed($authButtons)}>
          <AuthButton isAuthLoading={isAuthLoading} strategy="oauth_google" onPress={onPress} />
          <AuthButton isAuthLoading={isAuthLoading} strategy="oauth_facebook" onPress={onPress} />
        </View>
        <Text size="xxs" style={themed($footerText)}>
          By signing in to Challengli, you agree to our{" "}
          <Link href="https://www.challengli.app/terms-of-use" style={themed($link)}>
            Terms
          </Link>{" "}
          and{" "}
          <Link href="https://www.challengli.app/privacy-policy" style={themed($link)}>
            Privacy Policy
          </Link>
        </Text>
      </Screen>
      <ModalSpinner isLoading={isAuthLoading} />
      <ActionModal visible={showErrorModal}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <SmartImage
            imgKey="error.png"
            width={60}
            height={60}
            style={{
              marginBottom: 24,
            }}
          />
          <ModalText title="An error occurred while signing in with your account!" />
          <View
            style={{
              marginTop: 24,
              width: "100%",
            }}
          >
            <ModalButton
              label="close"
              onPress={() => setShowErrorModal(false)}
              isLoading={isAuthLoading}
              style={themed((theme) => ({
                backgroundColor: theme.colors.palette.gray,
              }))}
              labelStyle={themed((theme) => ({
                color: theme.colors.text,
              }))}
            />
          </View>
        </View>
      </ActionModal>
    </>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  backgroundColor: colors.background,
  padding: spacing.md,
})

const $authButtons: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: 12,
  marginTop: spacing.xl,
})

const $footerText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  alignItems: "center",
  textAlign: "center",
  marginTop: spacing.md,
})
const $link: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.text,
  fontFamily: typography.fonts.spaceGrotesk.bold,
})
