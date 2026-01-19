import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

export const StyledSafeAreaView = withUniwind(SafeAreaView);

const ProfileTab = () => {
  const { signOut } = useAuth();
  return (
    <StyledSafeAreaView className="flex-1 bg-surface">
      <ScrollView>
        <Text className="text-white">ProfileTab</Text>
      </ScrollView>
      <Pressable onPress={() => signOut()} className="p-2 bg-white">
        <Text>Signout</Text>
      </Pressable>
    </StyledSafeAreaView>
  );
};

export default ProfileTab;
