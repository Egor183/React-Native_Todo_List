import React, { useState, useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppButton } from "../components/ui/AppButton";
import { AppCard } from "../components/ui/AppCard";
import { AppTextBold } from "../components/ui/AppTextBold";
import { THEME } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { TodoContext } from "../context/todo/TodoContext";
import { AppText } from "../components/ui/AppText";
import { ScreenContext } from "../context/screen/screenContext";
import AppLoader from "../components/ui/AppLoader";

export const TodoScreen = () => {
  const { todos, removeTodo, updateTodo, error, clearError, loading } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

  const todo = todos.find((t) => t.id === todoId);

  const [modal, SetModal] = useState(false);
  const [notSentTitle, setNotSentTitle] = useState("");

  const saveHandler = async (title) => {
    setNotSentTitle(title);
    await updateTodo(todo.id, title);
    SetModal(false);
  };

  const closeWarning = async () => await clearError();

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton
          style={styles.repeatButton}
          onPress={() => {
            if (notSentTitle !== "") {
              saveHandler(notSentTitle);
            } else {
              removeTodo(todo.id);
            }
          }}
        >
          Repeat
        </AppButton>
        <AppButton style={styles.repeatButton} onPress={closeWarning}>
          Cancel
        </AppButton>
      </View>
    );
  }

  return (
    <View>
      <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR} style={{ width: "20%", marginBottom: 20 }}>
        <AntDesign name="back" size={24} />
      </AppButton>
      <EditModal visible={modal} onCancel={() => SetModal(false)} value={todo.title} onSave={saveHandler} />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.text}>{todo.title}</AppTextBold>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color="green" onPress={() => SetModal(true)}>
            <AntDesign name="edit" size={24} />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.RED_COLOR} onPress={() => removeTodo(todo.id)}>
            <AntDesign name="delete" size={24} />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: { flexDirection: "row", justifyContent: "space-between" },
  button: { width: Dimensions.get("window").width / 6 },
  text: { fontSize: 20 },
  card: { marginBottom: 20, padding: 15 },

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
