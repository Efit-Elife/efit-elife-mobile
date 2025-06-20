import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { RouteItem as RouteItemType } from "@/types/common";
import { formatDateFromSeconds } from "@/utils/date";
import { useState } from "react";
import MapModal from "./MapModal";
type RouteItemProps = {
  item: RouteItemType;
};

export default function RouteItem({ item }: RouteItemProps) {
  const date = formatDateFromSeconds(item.createdAt?.seconds);
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false);
  const handlePress = () => {
    setIsOpenMap(true);
  };
  return (
    <TouchableOpacity
      className="p-4 border-b border-gray-200 flex-row gap-3"
      onPress={handlePress}
    >
      {isOpenMap && (
        <MapModal
          showModal={isOpenMap}
          handleClose={() => setIsOpenMap(false)}
          item={item}
        />
      )}

      <View className="flex-1 justify-center">
        <Text className="text-lg font-bold mb-1 text-[#000000]">
          {item.routeName}
        </Text>
        <Text className="text-sm mb-2 text-[#222222]">Date: {date}</Text>
      </View>
    </TouchableOpacity>
  );
}
