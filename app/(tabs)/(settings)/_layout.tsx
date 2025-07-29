import { Stack } from "expo-router";

export default function SettingsLayout() {
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
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen
        name="payment-methods/index"
        options={{ title: "Payment Methods", headerShown: false }}
      />
      <Stack.Screen
        name="account/index"
        options={{ title: "Update Profile", headerShown: false }}
      />
    </Stack>
  );
}
