import { Stack } from "expo-router";

export default function TracksLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "#000393",
        },
        headerStyle: {
          backgroundColor: "#000393",
        },
        headerTintColor: "#FFFFFF",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Tracks" }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Saved Routes",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
