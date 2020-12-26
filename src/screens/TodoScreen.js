import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppCard } from "../components/ui/AppCard";
import { THEME } from "../theme";

export const TodoScreen = ({ goBack, todo, removeTodo, onSave }) => {
  const [modal, SetModal] = useState(false);
  const saveHandler = (title) => {
    onSave(todo.id, title);
    SetModal(false);
  };
  return (
    <View>
      <Button title="back" onPress={goBack} color={THEME.GREY_COLOR} />
      <EditModal visible={modal} onCancel={() => SetModal(false)} value={todo.title} onSave={saveHandler} />
      <AppCard style={styles.card}>
        <Text style={styles.text}>{todo.title}</Text>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="edit" color="green" onPress={() => SetModal(true)} />
        </View>
        <View style={styles.button}>
          <Button title="remove" color={THEME.RED_COLOR} style={styles.button} onPress={() => removeTodo(todo.id)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: { flexDirection: "row", justifyContent: "space-between" },
  button: { width: "30%" },
  text: { fontSize: 20 },
  card: { marginBottom: 20, padding: 15 },
});
