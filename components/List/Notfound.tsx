import { Stack, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default function Notfound() {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: "Exercise Not Found" }} />
      <View className="p-4">
        <Text className="text-xl">Exercise not found</Text>
        <Button onPress={() => useRouter().back()} className="mt-4">
          Go Back
        </Button>
      </View>
    </SafeAreaView>
  );
}
