import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type EmptyUIProps = {
  title: string;
  subtitle?: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
  iconSize?: number;
  buttonLabel?: string;
  onPressButton?: () => void;
};

function EmptyUI({
  title,
  subtitle,
  iconName = "chatbubbles-outline",
  iconColor = "#6B6B70",
  iconSize = 64,
  buttonLabel,
  onPressButton,
}: EmptyUIProps) {
  return (
    <View className="flex-1 mt-20 items-center">
      {iconName && (
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      )}
      <Text className="text-white text-lg mt-4">{title}</Text>
      {subtitle ? (
        <Text className="text-white text-sm mt-1">{subtitle}</Text>
      ) : null}
      {buttonLabel && onPressButton ? (
        <Pressable onPress={onPressButton}>
          <View className="mt-6 bg-primary px-6 py-3 rounded-full">
            <Text className="text-surface-dark">{buttonLabel}</Text>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

export default EmptyUI;
