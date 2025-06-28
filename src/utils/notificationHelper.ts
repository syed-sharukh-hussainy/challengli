import notifee, { AlarmType, TimestampTrigger, TriggerType } from "@notifee/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// export const createNotification = async (
//   challengeTitle: string,
//   duration: number,
//   challengeId: string,
//   hour: number,
//   period: number,
//   minutes: number,
// ) => {
//   try {
//     let hour24 = hour
//     if (period === 2 && hour !== 12) {
//       hour24 = hour + 12
//     } else if (period === 1 && hour === 12) {
//       hour24 = 0
//     }

//     const notifications = []

//     for (let day = 0; day < duration; day++) {
//       const date = new Date()
//       date.setHours(hour24, minutes, 0, 0)

//       if (day === 0 && date.getTime() <= Date.now()) {
//         date.setDate(date.getDate() + 1)
//       }

//       date.setDate(date.getDate() + day)

//       const trigger: TimestampTrigger = {
//         type: TriggerType.TIMESTAMP,
//         timestamp: date.getTime(),
//       }
//       const notificationId = await notifee.createTriggerNotification(
//         {
//           title: `<b>${challengeTitle}</b> Time! 🌟`,
//           body: `Your daily momentum check-in! Let's keep that streak going! 🚀`,
//           android: {
//             channelId: "challenge-reminders",
//             pressAction: {
//               id: "default",
//             },
//             showTimestamp: true,
//           },
//         },
//         trigger,
//       )
//       notifications.push({
//         day: day + 1,
//         notificationId,
//       })
//     }
//     console.log(notifications)
//     // Store notification data in MMKV with the correct ID
//     const storageKey = `challenge_${challengeId}_notifications`
//     await AsyncStorage.setItem(
//       storageKey,
//       JSON.stringify({
//         notifications,
//         reminderTime: {
//           hour,
//           minutes,
//           period,
//         },
//         challengeId,
//       }),
//     )
//   } catch (error) {
//     console.error("Error scheduling notification:", error)
//   }
// }

export const createNotification = async (
  challengeTitle: string,
  duration: number,
  challengeId: string,
  hour: number,
  period: number,
  minutes: number,
) => {
  try {
    // Convert to 24-hour format
    let hour24 = hour
    if (period === 2 && hour !== 12) {
      hour24 = hour + 12
    } else if (period === 1 && hour === 12) {
      hour24 = 0
    }

    const notifications = []
    const today = new Date()

    for (let day = 0; day < duration; day++) {
      // Create a new date object for each iteration to avoid reference issues
      const notificationDate = new Date()
      notificationDate.setDate(today.getDate() + day)
      notificationDate.setHours(hour24, minutes, 0, 0)

      // If today's notification time has already passed, push it to tomorrow
      if (day === 0 && notificationDate.getTime() <= Date.now()) {
        notificationDate.setDate(notificationDate.getDate() + 1)
      }

      // Create a unique ID for each notification
      const uniqueNotificationId = `${challengeId}_day_${day + 1}`

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: notificationDate.getTime(),
        alarmManager: { type: AlarmType.SET_ALARM_CLOCK },
      }

      const notificationId = await notifee.createTriggerNotification(
        {
          id: uniqueNotificationId,
          title: `<b>${challengeTitle}</b> Time! 🌟`,
          body: `Your daily momentum check-in! Let's keep that streak going! 🚀`,
          android: {
            channelId: "challenge-reminders",
            pressAction: {
              id: "default",
            },
            showTimestamp: true,
          },
        },
        trigger,
      )

      notifications.push({
        day: day + 1,
        notificationId,
        scheduledTime: notificationDate.toISOString(), // Store for debugging
      })
    }

    console.log("Scheduled notifications:", notifications)

    // Store notification data in AsyncStorage
    const storageKey = `challenge_${challengeId}_notifications`
    await AsyncStorage.setItem(
      storageKey,
      JSON.stringify({
        notifications,
        reminderTime: {
          hour,
          minutes,
          period,
        },
        challengeId,
      }),
    )
  } catch (error) {
    console.error("Error scheduling notification:", error)
  }
}

export const deleteAndCancelNotifications = async (challengeId: string) => {
  const storageKey = `challenge_${challengeId}_notifications`

  const storedNotifications = await AsyncStorage.getItem(storageKey)
  const data = storedNotifications ? JSON.parse(storedNotifications) : []
  if (data.notifications && Array.isArray(data.notifications)) {
    for (const notification of data.notifications) {
      await notifee.cancelTriggerNotification(notification.notificationId)
    }
  }

  await AsyncStorage.removeItem(storageKey)
}

// export const updateNotifications = async (
//   challengeTitle: string,
//   duration: number,
//   challengeId: string,
//   hour: number,
//   period: number,
//   minutes: number,
//   challengeStartDate: string,
//   activities: { day: number; status?: string }[], // Add activities parameter
// ) => {
//   try {
//     const storageKey = `challenge_${challengeId}_notifications`
//     const storedData = await AsyncStorage.getItem(storageKey)
//     const updatedNotifications = []

//     // Cancel existing notifications if they exist
//     if (storedData) {
//       const data = JSON.parse(storedData)
//       console.log(storedData)
//       if (data.notifications && Array.isArray(data.notifications)) {
//         for (const notification of data.notifications) {
//           await notifee.cancelTriggerNotification(notification.notificationId)
//         }
//       }
//     }
//     let hour24 = hour
//     if (period === 2 && hour !== 12) {
//       hour24 = hour + 12
//     } else if (period === 1 && hour === 12) {
//       hour24 = 0
//     }

//     const startDate = new Date(challengeStartDate)
//     const currentDay = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))
//     const remainingDays = duration - currentDay

//     if (remainingDays <= 0) {
//       throw new Error("Challenge has already ended")
//     }

//     // Create new notifications
//     for (let day = 0; day < remainingDays; day++) {
//       // Skip if activity is already completed
//       const activityDay = currentDay + day + 1
//       const isCompleted = activities.find(
//         (activity) => activity.day === activityDay && activity.status === "COMPLETED",
//       )

//       if (isCompleted) {
//         continue // Skip notification for completed activities
//       }

//       const notificationDate = new Date()
//       notificationDate.setHours(hour24, minutes, 0, 0)
//       notificationDate.setDate(notificationDate.getDate() + day)

//       // Ensure notification time is in the future
//       if (notificationDate.getTime() <= Date.now()) {
//         notificationDate.setDate(notificationDate.getDate() + 1)
//       }

//       const notificationId = await notifee.createTriggerNotification(
//         {
//           title: `<b>${challengeTitle}</b> Time! 🌟`,
//           body: `Your daily momentum check-in! Let's keep that streak going! 🚀`,
//           android: {
//             channelId: "challenge-reminders",
//             pressAction: { id: "default" },
//             showTimestamp: true,
//           },
//           id: challengeId
//         },
//         { type: TriggerType.TIMESTAMP, timestamp: notificationDate.getTime() },
//       )

//       updatedNotifications.push({
//         notificationId,
//         day: day + 1,
//       })
//     }

//     // Update storage with new notification IDs
//     await AsyncStorage.setItem(
//       storageKey,
//       JSON.stringify({
//         notifications: updatedNotifications,
//         reminderTime: { hour, minutes, period },
//         challengeId: challengeId,
//       }),
//     )
//   } catch (error) {
//     console.error("Error updating notifications:", error)
//   }
// }

export const updateNotifications = async (
  challengeTitle: string,
  duration: number,
  challengeId: string,
  hour: number,
  period: number,
  minutes: number,
  challengeStartDate: string,
  activities: { day: number; status?: string }[],
) => {
  try {
    const storageKey = `challenge_${challengeId}_notifications`
    const storedData = await AsyncStorage.getItem(storageKey)
    const updatedNotifications = []

    // Cancel existing notifications if they exist
    if (storedData) {
      const data = JSON.parse(storedData)
      console.log("Existing notifications:", storedData)
      if (data.notifications && Array.isArray(data.notifications)) {
        for (const notification of data.notifications) {
          await notifee.cancelTriggerNotification(notification.notificationId)
        }
      }
    }

    // Convert to 24-hour format
    let hour24 = hour
    if (period === 2 && hour !== 12) {
      hour24 = hour + 12
    } else if (period === 1 && hour === 12) {
      hour24 = 0
    }

    const startDate = new Date(challengeStartDate)
    const currentDay = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const remainingDays = duration - currentDay

    if (remainingDays <= 0) {
      throw new Error("Challenge has already ended")
    }

    const today = new Date()

    // Create new notifications
    for (let day = 0; day < remainingDays; day++) {
      // Skip if activity is already completed
      const activityDay = currentDay + day + 1
      const isCompleted = activities.find(
        (activity) => activity.day === activityDay && activity.status === "COMPLETED",
      )

      if (isCompleted) {
        continue // Skip notification for completed activities
      }

      // Create a new date object for each iteration
      const notificationDate = new Date()
      notificationDate.setDate(today.getDate() + day)
      notificationDate.setHours(hour24, minutes, 0, 0)

      // Ensure notification time is in the future
      if (notificationDate.getTime() <= Date.now()) {
        notificationDate.setDate(notificationDate.getDate() + 1)
      }

      // Create a unique ID for each notification
      const uniqueNotificationId = `${challengeId}_day_${activityDay}`

      const notificationId = await notifee.createTriggerNotification(
        {
          id: uniqueNotificationId,
          title: `<b>${challengeTitle}</b> Time! 🌟`,
          body: `Your daily momentum check-in! Let's keep that streak going! 🚀`,
          android: {
            channelId: "challenge-reminders",
            pressAction: { id: "default" },
            showTimestamp: true,
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp: notificationDate.getTime(),
          alarmManager: { type: AlarmType.SET_ALARM_CLOCK },
        },
      )

      updatedNotifications.push({
        notificationId,
        day: activityDay,
        scheduledTime: notificationDate.toISOString(), // Store for debugging
      })
    }

    // Update storage with new notification IDs
    await AsyncStorage.setItem(
      storageKey,
      JSON.stringify({
        notifications: updatedNotifications,
        reminderTime: { hour, minutes, period },
        challengeId: challengeId,
      }),
    )
  } catch (error) {
    console.error("Error updating notifications:", error)
  }
}

export const clearAllNotifications = async () => {
  try {
    // Clear all scheduled notifications
    await notifee.cancelTriggerNotifications()

    // Clear all stored notification data
    const keys = await AsyncStorage.getAllKeys()
    const notificationKeys = keys.filter((key) => key.startsWith("challenge_"))
    await AsyncStorage.multiRemove(notificationKeys)
  } catch (error) {
    console.error("Error clearing notifications:", error)
  }
}
