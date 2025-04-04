import { Screen } from "@/components"
import LoadingLogo from "@/components/UI/LoadingLogo"

const Loading = () => {
  return (
    <Screen
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingLogo />
    </Screen>
  )
}

export default Loading
