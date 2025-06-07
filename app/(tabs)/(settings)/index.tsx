import { Text } from "@/components/ui/text";
import * as Linking from "expo-linking";
import { useClerk } from "@clerk/clerk-expo";
import { TouchableOpacity } from "react-native";

const SettingsScreen = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/sign-in"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text>Sign out</Text>
    </TouchableOpacity>
  );
};

export default SettingsScreen;
