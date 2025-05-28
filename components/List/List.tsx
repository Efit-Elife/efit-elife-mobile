import React from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Text } from "@/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BaseItem {
  id: string;
}

type ListProps<T extends BaseItem> = {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  title?: string;
  emptyText?: string;
};

function List<T extends BaseItem>({
  data,
  renderItem,
  title = "Items",
  emptyText = "No items found",
}: ListProps<T>) {
  const insets = useSafeAreaInsets();

  const tabBarHeight = Platform.OS === "ios" ? 49 + insets.bottom : 49;
  const additionalPadding = 50;

  return (
    <View className="p-4">
      {title && <Text className="text-2xl font-bold mb-4">{title}</Text>}
      {data.length === 0 ? (
        <Text className="text-center text-gray-500 my-8">{emptyText}</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: tabBarHeight + additionalPadding,
          }}
        />
      )}
    </View>
  );
}

export default List;
