import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

export const StyledSafeAreaView = withUniwind(SafeAreaView);

const ChatsTab = () => {
  return (
    <StyledSafeAreaView className="flex-1 bg-surface">
      <ScrollView>
        <Text className="text-white">ChatsTab</Text>
      </ScrollView>
    </StyledSafeAreaView>
  );
};

export default ChatsTab;
