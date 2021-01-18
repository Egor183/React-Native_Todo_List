import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Navbar } from "../components/Navbar";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/TodoContext";
import { THEME } from "../theme";
import { MainScreen } from "./MainScreen";
import { TodoScreen } from "./TodoScreen";

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View>
      <Navbar title="To do app" />
      <View style={styles.container}>{todoId ? <TodoScreen /> : <MainScreen />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: THEME.PADDING,
  },
});
