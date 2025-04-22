import BottomTabBar from "@/components/UI/BottomTabBar"
import { Tabs } from "expo-router"

const TabsLayout = () => {
  return (
    <Tabs tabBar={(props) => <BottomTabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,

        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: "Challenges",
          headerShown: false,

        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          headerShown: false,

        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,

        }}
      />
    </Tabs>
  )
}

export default TabsLayout
