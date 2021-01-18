import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../screen/screenContext";
import { TodoContext } from "./TodoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "./types";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [{ id: "1", title: "Пойти на тренировку" }],
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { changeScreen, todoId } = useContext(ScreenContext);

  const addTodo = (title) => dispatch({ type: ADD_TODO, title });
  const removeTodo = (id) => {
    const selectedTodo = state.todos.find((todo) => todo.id === id);
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
            changeScreen(null);
            dispatch({ type: REMOVE_TODO, id });
          },
        },
      ],
      { cancelable: false }
    );
  };
  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });
  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
