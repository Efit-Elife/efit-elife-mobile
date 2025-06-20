import { SafeAreaView } from "@/components/ui/safe-area-view";
import List from "@/components/List/List";
import RouteItem from "./RouteItem";
import { RouteItem as RouteItemType } from "@/types/common";

type RouteListProps = {
  displayedRoute: RouteItemType[];
  isLoading?: boolean;
};

export default function RouteList({
  displayedRoute,
  isLoading,
}: RouteListProps) {
  const renderItem = ({ item }: { item: RouteItemType }) => (
    <RouteItem item={item} />
  );

  return (
    <SafeAreaView>
      <List
        data={displayedRoute}
        renderItem={renderItem}
        emptyText="No Route Recorded"
        title="Routes"
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}
