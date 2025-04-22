import React from 'react'
import { Screen, Text } from '@/components'
import TopBar from '@/components/UI/TopBar'
import { router } from 'expo-router'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import { useAppTheme } from '@/utils/useAppTheme'
import { ThemedStyle } from '@/theme'
import { useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import LoadingAnimation from '@/components/UI/LoadingAnimation'
import { FontAwesome6 } from '@expo/vector-icons'

const CreateChallenge = () => {
  const { themed, theme } = useAppTheme();
  const user = useQuery(api.users.getUser, {});
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={{
      flex: 1
    }}>
      <TopBar title='Create Challenge' onBackButtonPressed={() => router.back()} />
      {
        !user ? <LoadingAnimation /> : <View style={{
          padding: 20
        }}>
          <View>
            <Text
              size="sm"
              weight="medium"
              style={themed(({ spacing }) => ({
                marginBottom: spacing.xl,
                textAlign: "center",
              }))}
            >
              Choose from templates to get started quickly, or create and customize your own challenge
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/categories')}
              activeOpacity={0.7}
              style={themed($templateBtn)}
            >
              <Text
                size="sm"
                weight="bold"
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "white"
                }}
              >
                choose from templates
              </Text>
            </TouchableOpacity>

            <Text size='sm' weight='bold' style={themed(({ colors, spacing }) => ({
              textAlign: 'center',
              color: colors.textDim,
              marginVertical: spacing.md
            }))}>OR</Text>
            <TouchableOpacity
              onPress={() => {
                if (user.isPro) {
                  router.push('/(auth)/create-own-challenge')
                } else {
                  router.push('/(auth)/premium')
                }
              }}
              style={themed($newChallengeBtn)}
              activeOpacity={0.7}
            >

              {!user.isPro && <FontAwesome6 name="lock" size={18} color={theme.colors.text} />}
              <Text
                size="sm"
                weight="bold"
                style={{
                  textTransform: "uppercase",
                }}
              >
                Create your own
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </Screen>
  )
}

export default CreateChallenge


const $templateBtn: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primary,
  borderRadius: 12,
  paddingVertical: spacing.sm,
})



const $newChallengeBtn: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.muted,
  borderRadius: 12,
  paddingVertical: spacing.sm,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8
})