import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Text } from "@/components/ui/text";

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
  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        {title && <Text className="text-2xl font-bold mb-4">{title}</Text>}
        {data.length === 0 ? (
          <Text className="text-center text-gray-500 my-8">{emptyText}</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default List;
