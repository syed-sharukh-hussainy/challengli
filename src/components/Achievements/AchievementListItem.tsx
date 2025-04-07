import { TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "convex/_generated/api"
import SmartImage from "../UI/SmartImage"
import { Text } from "../Text"
import ActionModal from "../UI/ActionModal/ActionModal"
import Spinner from "../UI/Spinner"
import { useAppTheme } from "@/utils/useAppTheme"
import ModalButton from "../UI/ActionModal/ModalButton"

type AchievementProps = {
  id: string
  name: string
  label: string
  imageUrl: string
  target: number
  xp: number
  share: string
  earned: string
  locked: string
}
type Props = {
  achievement: AchievementProps
  isClaimed: boolean | undefined
  isMe: boolean
  status: string
}

const AchievementListItem = ({ achievement, isClaimed, isMe, status }: Props) => {
  const { themed } = useAppTheme()
  const [showAchievement, setShowAchievement] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const claimAchievement = useMutation(api.achievements.claimAchievement)

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (isMe) {
            setShowAchievement(true)
          }
        }}
        style={{
          flex: 1,
          alignItems: "center",
          opacity: status === "COMPLETED" ? 1 : 0.4,
        }}
      >
        <SmartImage imgKey={achievement.imageUrl} width={70} height={70} />
        <Text
          size="xs"
          weight="semiBold"
          style={{
            textAlign: "center",
            marginTop: 12,
          }}
        >
          {achievement.name}
        </Text>
      </TouchableOpacity>
      <ActionModal visible={showAchievement}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <SmartImage imgKey={achievement.imageUrl} width={100} height={100} />
          <Text
            size="md"
            weight="bold"
            style={{
              textAlign: "center",
              marginTop: 12,
            }}
          >
            {achievement.name}
          </Text>
          <Text
            size="sm"
            weight="medium"
            style={{
              textAlign: "center",
              marginTop: 8,
            }}
          >
            {status === "COMPLETED" ? achievement.earned : achievement.locked}
          </Text>
          {isLoading ? (
            <View
              style={{
                marginTop: 16,
              }}
            >
              <Spinner size={24} />
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                marginTop: 14,
              }}
            >
              <ModalButton
                label="close"
                onPress={() => setShowAchievement(false)}
                isLoading={isLoading}
                style={themed((theme) => ({
                  backgroundColor: theme.colors.palette.gray,
                }))}
                labelStyle={themed((theme) => ({
                  color: theme.colors.text,
                }))}
              />
              {isMe && !isClaimed && status === "COMPLETED" && (
                <ModalButton
                  label="claim"
                  onPress={async () => {
                    if (!isLoading) {
                      setIsLoading(true)
                      await claimAchievement({
                        id: achievement.id,
                        xp: achievement.xp,
                      })
                      setIsLoading(false)
                      setShowAchievement(false)
                    }
                  }}
                  isLoading={isLoading}
                  style={themed(({ colors }) => ({
                    backgroundColor: colors.palette.primary,
                  }))}
                  labelStyle={{
                    color: "white",
                  }}
                />
              )}
            </View>
          )}
        </View>
      </ActionModal>
    </>
  )
}

export default AchievementListItem
