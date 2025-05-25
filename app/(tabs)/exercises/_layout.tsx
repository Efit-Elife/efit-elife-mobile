import { Stack } from "expo-router";

export default function ExercisesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Exercises" }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Exercise Details",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
