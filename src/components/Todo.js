import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "./ui/AppText";

export const Todo = ({ todo, removeTodo, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(todo.item.id)}
      onLongPress={() => removeTodo(todo.item.id)}
    >
      <View style={styles.todo}>
        <AppText>{todo.item.title}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
});
