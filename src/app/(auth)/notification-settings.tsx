import { View, Platform, Linking, ViewStyle, TouchableOpacity, TextStyle } from "react-native"
import React, { useEffect, useState } from "react"
import * as Notifications from "expo-notifications"
import notifee, { AndroidImportance } from "@notifee/react-native"
import { Screen, Text } from "@/components"
import TopBar from "@/components/UI/TopBar"
import { router } from "expo-router"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { FontAwesome6 } from "@expo/vector-icons"

const NotificationSettings = () => {
  const { themed } = useAppTheme()
  const [reminder, setReminder] = useState(false)

  useEffect(() => {
    checkNotificationPermissions()
  }, [])

  const checkNotificationPermissions = async () => {
    try {
      // Check if notification channel exists on Android
      if (Platform.OS === "android") {
        const channel = await notifee.getChannel("challenge-reminders")
        if (!channel) {
          await notifee.createChannel({
            id: "challenge-reminders",
            name: "Challenge Reminders",
            importance: AndroidImportance.HIGH,
          })
        }
      }

      // Check notification permissions
      const settings = await Notifications.getPermissionsAsync()
      if (
        settings.granted ||
        settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
      ) {
        setReminder(true)
      } else {
        setReminder(false)
      }
    } catch (error) {
      console.error("Error checking notification permissions:", error)
      setReminder(false)
    }
  }

  const handleReminderToggle = async (newValue: boolean) => {
    if (newValue) {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      })

      if (status === "granted") {
        setReminder(true)
      } else {
        setReminder(false)
      }
    } else {
      if (Platform.OS === "ios") {
        Linking.openURL("app-settings:")
      } else {
        await Linking.openSettings()
      }
    }
  }
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar title="Notifications" onBackButtonPressed={() => router.back()} />
      <View style={themed($container)}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={themed($btnContainer)}
          onPress={() => handleReminderToggle(!reminder)}
        >
          <Text size="sm" weight="semiBold" style={themed($reminderLabel)}>
            Reminder
          </Text>
          <View
            style={themed(({ colors }) => ({
              borderWidth: reminder ? 0 : 2,
              borderColor: colors.palette.primary,
              backgroundColor: reminder ? colors.palette.primary : colors.transparent,
              width: 24,
              height: 24,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }))}
          >
            {reminder && <FontAwesome6 name="check" color={"white"} size={14} />}
          </View>
        </TouchableOpacity>
        {!reminder && (
          <Text
            size="xs"
            weight="semiBold"
            style={{
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Notifications are disabled. Please enable them in your device settings.
          </Text>
        )}
      </View>
    </Screen>
  )
}

export default NotificationSettings

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  padding: spacing.md,
})

const $btnContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderWidth: 2,
  borderColor: colors.border,
  borderRadius: 18,
  padding: spacing.md,
  flexDirection: "row",
  justifyContent: "space-between",
})

const $reminderLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})
