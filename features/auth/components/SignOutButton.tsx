import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Button, ButtonText } from "@/components/ui/button";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <Button variant="outline" onPress={handleSignOut} className="w-full">
      <ButtonText className="text-red-500">Sign out</ButtonText>
    </Button>
  );
};
