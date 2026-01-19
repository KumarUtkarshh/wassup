import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";
import useAuthSocial from "../../../hooks/useSocialAuth";

const { height, width } = Dimensions.get("window");

export const StyledSafeAreaView = withUniwind(SafeAreaView);

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useAuthSocial();
  return (
    <View className="flex-1 bg-surface-dark">
      {/* globs */}
      <View className="absolute inset-0 overflow-hidden"></View>

      <StyledSafeAreaView className="flex-1 pt-10">
        <View className="items-center">
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{
              width: 100,
              height: 100,
              marginVertical: -20,
            }}
            contentFit="contain"
          />
          <Text className="text-4xl font-bold text-primary font-lbcaslon tracking-wider uppercase">
            Wassup
          </Text>
        </View>

        {/* Center section */}
        <View className="flex-1 justify-center items-center">
          <Image
            source={require("../../../assets/images/auth.png")}
            style={{
              width: width - 48,
              height: height * 0.3,
            }}
            contentFit="contain"
          />

          <View className="mt-6 items-center">
            <Text className="text-3xl font-bold text-foreground text-center font-lbcaslon">
              Connect & Chat
            </Text>
            <Text className="text-2xl font-bold text-primary font-mono">
              Seamlessly
            </Text>
          </View>

          {/* Auth buttons */}
          <View className="flex-row gap-4 mt-10 mx-4">
            {/* Google btn */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-3.5  rounded-2xl active:scale-[0.99]"
              onPress={() => handleSocialAuth("oauth_google")}
            >
              {loadingStrategy === "oauth_google" ? (
                <ActivityIndicator size="small" color="#1a1a1a" />
              ) : (
                <>
                  <Image
                    source={require("../../../assets/images/google.png")}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    contentFit="contain"
                  />
                  <Text className="text-gray-900 font-semibold text-sm">
                    Google
                  </Text>
                </>
              )}
            </Pressable>
            {/* apple btn */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-white/10 rounded-2xl py-3.5 border border-white/20 active:scale-[0.97]"
              // disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Continue with Apple"
              onPress={() => handleSocialAuth("oauth_apple")}
            >
              {loadingStrategy === "oauth_apple" ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                  <Text className="text-foreground font-semibold text-sm">
                    Apple
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </StyledSafeAreaView>
    </View>
  );
};

export default AuthScreen;
