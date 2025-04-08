import { useEffect } from "react"
import notifee, { AndroidImportance } from "@notifee/react-native"

export const useNotifications = (channelId: string = "challenge-reminders") => {
  useEffect(() => {
    async function setupNotifications() {
      // Request permissions
      await notifee.requestPermission()

      // Create a channel (required for Android)
      await notifee.createChannel({
        id: channelId,
        name: "Challenge Reminders",
        importance: AndroidImportance.HIGH,
        sound: "default",
      })
    }

    async function checkIfChannelExists() {
      const isExists = await notifee.isChannelCreated(channelId)
      if (!isExists) {
        await setupNotifications()
        console.log("Channel Created")
      } else {
        console.log("Channel Exists")
      }
    }

    checkIfChannelExists()
  }, [channelId])
}
