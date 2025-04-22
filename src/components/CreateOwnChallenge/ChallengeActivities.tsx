import { ScrollView, TouchableOpacity, View, Alert } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text } from "../Text"
import { FontAwesome6 } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import CustomButton from "../UI/CustomButton"
import ModalWrapper from "./ModalWrapper"
import FooterButton from "../UI/FooterButton"
import { TextField } from "../TextField"

type ActivitiesProps = {
  day: number
  pros: string
  task: string
  tips: string[]
  title: string
}

type Props = {
  duration: number
  increaseDuration: () => void
  decreaseDuration: () => void
  activities: ActivitiesProps[]
  setActivities: (val: ActivitiesProps[]) => void
}

const ChallengeActivities = ({
  decreaseDuration,
  duration,
  increaseDuration,
  activities,
  setActivities,
}: Props) => {
  const { themed, theme } = useAppTheme()
  const [openActivitiesModal, setOpenActivitiesModal] = useState(false)
  const [localActivities, setLocalActivities] = useState<ActivitiesProps[]>([])

  useEffect(() => {
    if (openActivitiesModal) {
      const filledActivities = Array.from({ length: duration }, (_, i) => {
        const existing = activities.find((a) => a.day === i + 1)
        return (
          existing ?? {
            day: i + 1,
            title: "",
            task: "",
            pros: "",
            tips: [],
          }
        )
      })
      setLocalActivities(filledActivities)
    }
  }, [openActivitiesModal, duration, activities])

  const handleInputChange = (index: number, key: "title" | "task", value: string) => {
    const updated = [...localActivities]
    updated[index][key] = value
    setLocalActivities(updated)
  }

  const handleSave = () => {
    const hasEmptyFields = localActivities.some(
      (activity) => activity.title.trim() === "" || activity.task.trim() === ""
    )

    if (hasEmptyFields) {
      Alert.alert("Incomplete Activities", "Please fill in both Title and Task for all days.")
      return
    }

    setActivities(localActivities)
    setOpenActivitiesModal(false)
  }

  const copyFirstDayToAll = () => {
    if (localActivities.length === 0) return
    const { title, task } = localActivities[0]
    const copied = localActivities.map((item, idx) =>
      idx === 0 ? item : { ...item, title, task }
    )
    setLocalActivities(copied)
  }

  const allActivitiesFilled =
    activities.length === duration &&
    activities.every((a) => a.title.trim() && a.task.trim())

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setOpenActivitiesModal(true)}
        style={themed(({ colors, spacing }) => ({
          borderColor: colors.border,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: spacing.md,
          borderWidth: 2,
          borderTopWidth: 0,
        }))}
      >
        <View style={{ gap: 3 }}>
          <Text
            size="xs"
            weight="semiBold"
            style={themed(({ colors }) => ({
              color: colors.textDim,
            }))}
          >
            Add Activities
          </Text>
          <Text size="sm" weight="semiBold" numberOfLines={1}>
            You have added {activities.length} of {duration} days
          </Text>
        </View>
        {allActivitiesFilled ? (
          <View
            style={{
              backgroundColor: theme.colors.palette.primary,
              width: 28,
              height: 28,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }}
          >
            <FontAwesome6 name="check" size={18} color="white" />
          </View>
        ) : (
          <FontAwesome6 name="pencil" size={18} color="#9ca3af" />
        )}
      </TouchableOpacity>

      <ModalWrapper
        visible={openActivitiesModal}
        setVisible={() => setOpenActivitiesModal(false)}
        title="Add Activities"
      >
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* Duration Controls */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 40,
              marginBottom: 16,
            }}
          >
            <TouchableOpacity
              onPress={decreaseDuration}
              activeOpacity={0.7}
              style={themed(({ colors }) => ({
                backgroundColor: colors.palette.primary,
                flex: 1,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }))}
            >
              <FontAwesome6 name="minus" size={24} color="white" />
            </TouchableOpacity>

            <View style={{ alignItems: "center" }}>
              <Text
                size="sm"
                weight="semiBold"
                style={themed(({ colors }) => ({
                  color: colors.textDim,
                }))}
              >
                Days
              </Text>
              <Text size="sm" weight="semiBold" numberOfLines={1}>
                {duration}
              </Text>
            </View>

            <TouchableOpacity
              onPress={increaseDuration}
              activeOpacity={0.7}
              style={themed(({ colors }) => ({
                backgroundColor: colors.palette.primary,
                flex: 1,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }))}
            >
              <FontAwesome6 name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Copy Button */}
          {localActivities[0]?.title.trim() && localActivities[0]?.task.trim() ? (
            <CustomButton
              text="Copy Day 1 to All Days"
              onPress={copyFirstDayToAll}
            />
          ) : null}

          {/* Activities Form */}
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
            {localActivities.map((activity, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text size="sm" weight="semiBold">
                  Day {activity.day}
                </Text>
                <View style={{ gap: 10, marginTop: 10 }}>
                  <TextField
                    textAlignVertical="center"
                    placeholder={`Day ${activity.day} Title`}
                    value={activity.title}
                    onChangeText={(text) => handleInputChange(index, "title", text)}
                  />
                  <TextField
                    textAlignVertical="top"
                    placeholder={`Day ${activity.day} Task`}
                    value={activity.task}
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => handleInputChange(index, "task", text)}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <FooterButton
          backgroundColor={theme.colors.palette.primary}
          label="Save"
          onPress={handleSave}
        />
      </ModalWrapper>
    </>
  )
}

export default ChallengeActivities
