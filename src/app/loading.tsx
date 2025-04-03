import { Screen } from "@/components"
import LoadingLogo from "@/components/UI/LoadingLogo"

const Loading = () => {
  return (
    <Screen safeAreaEdges={["top"]}>
      <LoadingLogo />
    </Screen>
  )
}

export default Loading
