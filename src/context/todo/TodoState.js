import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { Http } from "../../http";
import { ScreenContext } from "../screen/screenContext";
import { TodoContext } from "./TodoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  HIDE_LOADER,
  REMOVE_TODO,
  UPDATE_TODO,
  FETCH_TODOS,
  CLEAR_ERROR,
  SHOW_LOADER,
  SHOW_ERROR,
} from "./types";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: false,
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { changeScreen, todoId } = useContext(ScreenContext);

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const addTodo = async (title) => {
    clearError();
    showLoader();
    try {
      let data = await Http.post("https://rn-todo-app-c020b-default-rtdb.firebaseio.com/todos.json", { title });
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (e) {
      showError("Something went wrong...");
    } finally {
      hideLoader();
    }
  };
  const removeTodo = async (id) => {
    // const selectedTodo = state.todos.find((todo) => todo.id === id);
    // Alert.alert(
    //   "Remove todo",
    //   `Are you sure that you want to remove ${selectedTodo.title} todo?`,
    //   [
    //     {
    //       text: "Cancel",
    //       style: "cancel",
    //     },
    //     {
    //       text: "Delete",
    //       onPress: () => {
    //         changeScreen(null);
    //         dispatch({ type: REMOVE_TODO, id });
    //       },
    //     },
    //   ],
    //   { cancelable: false }
    // );

    // changeScreen(null);
    // dispatch({ type: REMOVE_TODO, id });

    clearError();
    showLoader();
    try {
      let data = await Http.delete(`https://rn-todo-app-c020b-default-rtdb.firebaseio.com/todos/${id}.json`);
      changeScreen(null);
      dispatch({ type: REMOVE_TODO, id: data.name });
    } catch (e) {
      showError("Something went wrong...");
    } finally {
      hideLoader();
    }
  };
  const updateTodo = async (id, title) => {
    clearError();
    showLoader();
    try {
      let data = await Http.patch(`https://rn-todo-app-c020b-default-rtdb.firebaseio.com/todos/${id}.json`, { title });
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError("Something went wrong...");
    } finally {
      hideLoader();
    }
  };

  const fetchTodos = async () => {
    clearError();
    showLoader();
    try {
      let data = await Http.get("https://rn-todo-app-c020b-default-rtdb.firebaseio.com/todos.json");
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      // showError("Something went wrong...");
    } finally {
      hideLoader();
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
        clearError,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
