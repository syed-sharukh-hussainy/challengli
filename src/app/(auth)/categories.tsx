import { ListView, Screen, Text } from "@/components"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { spacing } from "@/theme"
import CategoryItem from "@/components/Categories/CategoryItem"
import TopBar from "@/components/UI/TopBar"
import { View } from "react-native"
import LoadingAnimation from "@/components/UI/LoadingAnimation"

const CategoriesScreen = () => {
  const categories = useQuery(api.categories.getAllCategories, {})
  return (
    <Screen
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <TopBar title="Categories" />
      {!categories ? (
        <LoadingAnimation />
      ) : (
        <View style={{ flex: 1 }}>
          <ListView
            data={categories}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: spacing.md,
            }}
            estimatedItemSize={156}
            ListHeaderComponent={
              <Text
                size="sm"
                weight="medium"
                style={{
                  marginBottom: spacing.md,
                  textAlign: "center",
                }}
              >
                Select a category from the list below that matches your goals!
              </Text>
            }
            renderItem={({ item }) => (
              <CategoryItem
                id={item._id}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            )}
          />
        </View>
      )}
    </Screen>
  )
}

export default CategoriesScreen
