import { TouchableOpacity, View } from "react-native"
import { Screen, Text, TextField } from "@/components"
import { router } from "expo-router"
import TopBar from "@/components/UI/TopBar"
import { useAppTheme } from "@/utils/useAppTheme"
import { useEffect, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "convex/_generated/api"
import Spinner from "@/components/UI/Spinner"

const Feedback = () => {
  const { theme } = useAppTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  const submit = useMutation(api.feedback.submitFeedback)

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      await submit({
        feedback,
      })
      setIsLoading(false)
      setShowMessage(true)
      setFeedback("")
    } catch (error) {
      console.log(error)
    } finally {
      setShowMessage(true)
      setIsLoading(false)
      setFeedback("")
    }
  }

  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar title="Feedback" onBackButtonPressed={() => router.back()} />
      <View
        style={{
          padding: 20,
        }}
      >
        <TextField
          multiline={true}
          value={feedback}
          onChangeText={setFeedback}
          numberOfLines={5}
          cursorColor={theme.colors.palette.primary}
          placeholder="Feedback or Suggestions"
        />
        {showMessage && (
          <Text
            size="md"
            weight="semiBold"
            style={{
              color: theme.colors.palette.primary,
              textAlign: "center",
              paddingVertical: 12,
            }}
          >
            Submitted successfully
          </Text>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSubmit}
          style={{
            backgroundColor: theme.colors.palette.primary,
            borderRadius: 12,
            paddingVertical: 12,
            marginTop: 24,
          }}
        >
          {isLoading ? (
            <Spinner size={24} color="white" />
          ) : (
            <Text
              size="sm"
              weight="bold"
              style={{
                color: "white",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              send
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

export default Feedback
