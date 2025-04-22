import React, { useMemo, useState } from "react"
import { Screen, Text, } from "@/components"
import { ScrollView, View } from "react-native"
import { useMutation } from "convex/react"
import { api } from "convex/_generated/api"
import { useAppTheme } from "@/utils/useAppTheme"
import ActionButton from "@/components/UI/ActionModal/ActionButton"
import { router, useNavigationContainerRef } from "expo-router"
import SelectImage from "@/components/CreateOwnChallenge/SelectImage"
import ChallengeTitle from "@/components/CreateOwnChallenge/ChallengeTitle"
import ChallengeDescription from "@/components/CreateOwnChallenge/ChallengeDescription"
import ChallengeColors from "@/components/CreateOwnChallenge/ChallengeColors"
import ChallengeActivities from "@/components/CreateOwnChallenge/ChallengeActivities"
import FooterButton from "@/components/UI/FooterButton"
import ChallengeNotification from "@/components/CreateOwnChallenge/ChallengeNotification"
import { format } from "date-fns"
import { createNotification } from "@/utils/notificationHelper"
import { StackActions } from "@react-navigation/native"
type ActivitiesProps = {
  day: number,
  pros: string,
  task: string,
  tips: string[],
  title: string,
}

const CreateOwnChallenge = () => {
  const createChallenge = useMutation(api.userChallenges.createChallenge)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedTitle, setSelectedTitle] = useState("")
  const [selectedDescription, setSelectedDescription] = useState("")
  const [selectedColor, setSelectedColor] = useState<{ primary: string; secondary: string }>({
    primary: "",
    secondary: "",
  })
  const [reminderTime, setReminderTime] = useState<{ hour: number, minutes: number, period: number }>({
    hour: 8,
    minutes: 30,
    period: 1,
  })
  const [duration, setDuration] = useState(14)
  const [activities, setActivites] = useState<ActivitiesProps[]>([]);
  const rootNavigation = useNavigationContainerRef()
  const { theme, themed } = useAppTheme()
  const todaysDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), [])
  const handleCreateChallenge = async () => {
    try {
      setIsLoading(true)
      const challengeActivities = activities.map((activity, index) => ({
        day: index + 1,
        pros: activity.pros,
        task: activity.task,
        tips: activity.tips,
        title: activity.title,
      }));
      const _id = await createChallenge({
        challengeActivities,
        color: selectedColor,
        description: selectedDescription,
        duration,
        image: selectedImage,
        reminderTime,
        startDate: todaysDate,
        title: selectedTitle,
      })

      await createNotification(selectedTitle, duration, _id, reminderTime.hour, reminderTime.period, reminderTime.minutes)
      rootNavigation.dispatch(StackActions.popToTop())
      router.replace(`/(auth)/created-challenge-details/${_id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      >
        <ActionButton icon="x" onPress={() => router.back()} />

        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            size="lg"
            weight="bold"
            style={themed(({ colors }) => ({
              textAlign: "center",
              color: colors.text,
            }))}
          >
            Create your own challenge
          </Text>
          <SelectImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
          <ChallengeTitle selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} />
          <ChallengeDescription
            selectedDescription={selectedDescription}
            setSelectedDescription={setSelectedDescription}
          />
          <ChallengeActivities activities={activities} setActivities={setActivites} duration={duration} increaseDuration={() => {
            if (duration < 100) {
              setDuration(duration + 1)
            }
          }} decreaseDuration={() => {
            if (duration > 7) {
              setDuration(duration - 1)
            }
          }} />
          <ChallengeNotification reminderTime={reminderTime} setReminderTime={setReminderTime} />
          <ChallengeColors selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </View>
      </ScrollView>
      {(selectedImage !== "" && selectedTitle !== "" && selectedDescription !== "" && activities.length === duration && JSON.stringify(selectedColor) !== JSON.stringify({
        primary: "",
        secondary: "",
      })) && <FooterButton
          backgroundColor={theme.colors.palette.primary}
          label="Create"
          onPress={handleCreateChallenge}
          isLoading={isLoading}
        />}
    </Screen>
  )
}

export default CreateOwnChallenge

