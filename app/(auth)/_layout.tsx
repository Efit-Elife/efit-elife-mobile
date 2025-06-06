import { Redirect, Stack, usePathname } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function AuthRoutesLayout() {
  useWarmUpBrowser();
  const { user } = useUser();
  const pathName = usePathname();
  const { isSignedIn } = useAuth();

  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed !== true) {
    if (!pathName.startsWith("/setup-profile")) {
      return <Redirect href="/(auth)/setup-profile/step-1" />;
    }
  }

  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed === true) {
    return <Redirect href="/(tabs)/(home)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
      <Stack.Screen
        name="otp-verification"
        options={{ title: "OTP Verification" }}
      />
      <Stack.Screen name="setup-profile" options={{ title: "Setup profile" }} />
    </Stack>
  );
}
