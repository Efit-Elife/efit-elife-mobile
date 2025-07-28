import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Exercise } from "@/types/common";

type ExerciseListItemProps = {
  item: Exercise;
  onPress: (id: string) => void;
};

const ExerciseItem = ({ item, onPress }: ExerciseListItemProps) => {
  return (
    <TouchableOpacity
      className="p-4 border-b border-gray-200 flex-row gap-3"
      onPress={() => onPress(item.id)}
    >
      <View>
        <Image
          source={{
            uri: item.imageUrl || "https://picsum.photos/80/80",
          }}
          alt={item.name}
          className="rounded-md h-16 w-16 bg-gray-200"
        />
      </View>

      {item.isPremium && (
        <View className="absolute top-2 right-0 bg-[#F3C623] p-2 rounded">
          <Text className="text-[10px] font-bold text-white">Premium</Text>
        </View>
      )}

      <View className="flex-1 justify-center">
        <Text className="text-lg font-bold mb-1">{item.name}</Text>
        <Text className="text-sm mb-2 text-[#979797]">
          Difficulty: {item.difficulty}
        </Text>
        <Text className="text-sm text-[#4E71FF]">View Details</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseItem;
