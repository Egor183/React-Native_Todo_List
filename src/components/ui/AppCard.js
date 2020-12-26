import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";

export const AppCard = (props) => {
  return <View style={{ ...styles.default, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  default: {
    padding: 20,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 8,
  },
});
