import React, { useState } from "react"
import { Screen, Text } from "@/components"
import {
  Alert,
  Button,
  Linking,
  ScrollView,
  Share,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import TopBar from "@/components/UI/TopBar"
import { router } from "expo-router"
import { FontAwesome6 } from "@expo/vector-icons"
import { useAppTheme } from "@/utils/useAppTheme"
import { FooterComponent } from "react-native-screens/lib/typescript/components/ScreenFooter"
import { useAuth } from "@clerk/clerk-expo"
import Spinner from "@/components/UI/Spinner"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"

const Settings = () => {
  const { signOut } = useAuth()
  const { theme, themed } = useAppTheme()
  const [isLoading, setIsLoading] = useState(false)

  const onSignOut = async () => {
    if (!isLoading) {
      try {
        setIsLoading(true)
        await signOut({ redirectUrl: "/login" })
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleRateUs = async () => {
    const storeUrl = "https://play.google.com/store/apps/details?id=com.flamingoo.challengli" // Replace with your app's Play Store package name

    try {
      const supported = await Linking.canOpenURL(storeUrl)
      if (supported) {
        await Linking.openURL(storeUrl)
      } else {
        Alert.alert("Error", "Unable to open the app store.")
      }
    } catch (error) {
      console.error("Error opening app store:", error)
      Alert.alert("Error", "Something went wrong while opening the app store.")
    }
  }

  const handleShare = async () => {
    const message = `Hi! I'm using Challengli to build better habits and stay motivated. Join me on this amazing journey! Download the app here: https://play.google.com/store/apps/details?id=com.flamingo.challengli`

    try {
      const result = await Share.share({
        message,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType)
        } else {
          console.log("Shared successfully")
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed")
      }
    } catch (error) {
      console.error("Error while sharing:", error)
      Alert.alert("Error", "Something went wrong while sharing. Please try again.")
    }
  }

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar title="Settings" onBackButtonPressed={() => router.back()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text size="lg" weight="semiBold" style={{ paddingBottom: 16 }}>
          Account
        </Text>
        <PressableButton
          onPress={() => router.push("/(auth)/profile-settings")}
          label="Profile"
          pressableRoundedStyle={{
            borderWidth: 2,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
          }}
        />
        <PressableButton
          onPress={() => {}}
          label="Notification"
          pressableRoundedStyle={{
            borderWidth: 2,
            borderTopWidth: 0,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
          }}
        />

        <Text size="lg" weight="semiBold" style={{ paddingVertical: 16 }}>
          Support
        </Text>
        <PressableButton
          onPress={handleShare}
          label="Share with friends"
          pressableRoundedStyle={{
            borderWidth: 2,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
          }}
        />
        <PressableButton
          onPress={handleRateUs}
          label="Rate Us"
          pressableRoundedStyle={{
            borderWidth: 2,
            borderTopWidth: 0,
          }}
        />
        <PressableButton
          onPress={() => {}}
          label="Feedback"
          pressableRoundedStyle={{
            borderWidth: 2,
            borderTopWidth: 0,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
          }}
        />

        <Text size="lg" weight="semiBold" style={{ paddingVertical: 16 }}>
          Policy
        </Text>
        <PressableButton
          onPress={() => {
            openLinkInBrowser("https://www.challengli.app/terms-of-use")
          }}
          label="Terms of Use"
          pressableRoundedStyle={{
            borderWidth: 2,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
          }}
        />
        <PressableButton
          onPress={() => openLinkInBrowser("https://www.challengli.app/privacy-policy")}
          label="Privacy Policy"
          pressableRoundedStyle={{
            borderWidth: 2,
            borderTopWidth: 0,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSignOut}
          style={themed(({ colors, spacing }) => ({
            paddingVertical: spacing.sm,
            backgroundColor: colors.palette.angry500,
            marginTop: spacing.md,
            borderRadius: 14,
          }))}
        >
          {isLoading ? (
            <Spinner color={"#fff"} size={24} />
          ) : (
            <Text
              size="sm"
              weight="bold"
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              Sign Out
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  )
}

export default Settings

const PressableButton = ({
  onPress,
  pressableRoundedStyle,
  label,
}: {
  onPress: () => void
  pressableRoundedStyle: ViewStyle
  label: string
}) => {
  const { themed } = useAppTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        themed(({ colors, spacing }) => ({
          borderColor: colors.border,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: spacing.md,
        })),
        pressableRoundedStyle,
      ]}
    >
      <Text size="sm" weight="semiBold">
        {label}
      </Text>
      <FontAwesome6 name="chevron-right" size={18} color="#9ca3af" />
    </TouchableOpacity>
  )
}
