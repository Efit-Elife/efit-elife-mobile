import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import RouteList from "@/features/tracks/components/RouteList";
import { useQuery } from "@tanstack/react-query";
import { getRoutesByUserIdQuery } from "@/features/tracks/queries";
import { useLocalSearchParams, useRouter } from "expo-router";
export default function Route() {
  const { id } = useLocalSearchParams();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery(getRoutesByUserIdQuery(id as string));

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  return (
    <View>
      <RouteList displayedRoute={data} isLoading={isLoading} />
    </View>
  );
}
