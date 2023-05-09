import * as React from "react";
import { Button, SafeAreaView } from "react-native";
import { FadeIn, BounceOut } from "react-native-reanimated";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

function Box() {
  const offset = useSharedValue(0);
  const [showButton, setShowButton] = React.useState(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });

  return (
    <>
      <Animated.View
        style={[
          { width: 100, height: 100, backgroundColor: "green" },
          animatedStyles,
        ]}
      />
      <Button
        title="Start animations"
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          offset.value = withSpring(Math.random());
          setShowButton(!showButton);
        }}
      />
      {showButton ? (
        <Animated.View
          style={[
            {
              marginTop: 10,
              width: 100,
              height: 100,
              backgroundColor: "green",
              alignSelf: "center",
            },
          ]}
          entering={FadeIn.duration(300)}
          exiting={BounceOut.duration(450)}
        />
      ) : null}
    </>
  );
}

export default function App() {
  return (
    <SafeAreaView>
      <Box />
    </SafeAreaView>
  );
}
