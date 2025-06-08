import { Stack } from "expo-router";

export default function TracksLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Tracks" }} />
    </Stack>
  );
}
