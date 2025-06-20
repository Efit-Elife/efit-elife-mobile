import { Stack } from "expo-router";

export default function TracksLayout() {
  return (
    <Stack>
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
