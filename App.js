import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { THEME } from "./src/theme";

async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
}

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const addTodo = (title) => {
    setTodos((prev) => [...prev, { id: Date.now().toString(), title }]);
  };

  const updateTodo = (id, title) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
  };

  const removeTodo = (id) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    Alert.alert(
      "Remove todo",
      `Are you sure that you want to remove ${selectedTodo.title} todo?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setTodoId(null);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  let content = <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoId} />;

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen goBack={() => setTodoId(null)} todo={selectedTodo} removeTodo={removeTodo} onSave={updateTodo} />
    );
  }

  if (!isReady) {
    return (
      <AppLoading startAsync={loadApplication} onError={(err) => console.log(err)} onFinish={() => setIsReady(true)} />
    );
  }

  return (
    <ScrollView>
      <Navbar title="To do app" />
      <View style={styles.container}>{content}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: THEME.PADDING,
  },
});
