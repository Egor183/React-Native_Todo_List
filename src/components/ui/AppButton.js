import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";
import { AppTextBold } from "./AppTextBold";
import { THEME } from "../../theme";

export const AppButton = ({ children, onPress, color = THEME.MAIN_COLOR, style }) => {
  const Wrapper = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper activeOpacity={0.7} onPress={onPress}>
      <View style={{ ...styles.button, backgroundColor: color, ...style }}>
        <AppTextBold style={styles.text}>{children}</AppTextBold>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
