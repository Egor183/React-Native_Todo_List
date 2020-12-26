import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
  let content = (
    <FlatList
      data={todos}
      renderItem={(item) => (
        <Todo todo={item} keyExtractor={(item) => item.id.toString()} removeTodo={removeTodo} onOpen={openTodo} />
      )}
    />
  );

  if (!todos.length) {
    content = (
      <View style={styles.imgWrap}>
        <Image source={require("../../assets/no-items.png")} style={styles.image} />
      </View>
    );
  }
  return (
    <View>
      <AddTodo addTodo={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: { alignItems: "center", justifyContent: "center", padding: 10, height: 300 },
  image: { width: "100%", height: "100%", resizeMode: "contain" },
});
