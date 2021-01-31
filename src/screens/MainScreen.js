import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { AppButton } from "../components/ui/AppButton";
import AppLoader from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/TodoContext";

import { THEME } from "../theme";

export const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width - THEME.PADDING * 2);

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);
  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width - THEME.PADDING * 2;
      setDeviceWidth(width);
    };
    Dimensions.addEventListener("change", update);

    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });

  const width = Dimensions.get("window").width - THEME.PADDING * 2;

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        data={todos}
        renderItem={(item) => (
          <Todo todo={item} keyExtractor={(item) => item.id.toString()} removeTodo={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  );

  if (!todos.length) {
    content = (
      <View style={styles.imgWrap}>
        <Image source={require("../../assets/no-items.png")} style={styles.image} />
      </View>
    );
  }

  if (loading) {
    return <AppLoader />;
  }
  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton style={styles.repeatButton} onPress={loadTodos}>
          Repeat
        </AppButton>
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
  imgWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
  },
  image: { width: "100%", height: "100%", resizeMode: "contain" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 24,
    color: THEME.RED_COLOR,
  },
  repeatButton: {
    marginTop: 30,
  },
});
