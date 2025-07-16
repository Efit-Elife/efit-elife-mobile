import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Spinner } from "@/components/ui/spinner";
import colors from "tailwindcss/colors";

const SetupProfileLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Spinner size="large" color={colors.gray[500]} />;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#000393",
        },
      }}
    >
      <Stack.Screen name="step-1" options={{ title: "Step 1: Basic Info" }} />
      <Stack.Screen
        name="step-2"
        options={{ title: "Step 2: Training Info" }}
      />
      <Stack.Screen
        name="step-3"
        options={{ title: "Step 3: Nutrition Info" }}
      />
      <Stack.Screen name="step-4" options={{ title: "Step 4: Medical Info" }} />
    </Stack>
  );
};

export default SetupProfileLayout;
