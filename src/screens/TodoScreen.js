import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppButton } from "../components/ui/AppButton";
import { AppCard } from "../components/ui/AppCard";
import { AppTextBold } from "../components/ui/AppTextBold";
import { THEME } from "../theme";
import { AntDesign } from "@expo/vector-icons";

export const TodoScreen = ({ goBack, todo, removeTodo, onSave }) => {
  const [modal, SetModal] = useState(false);
  const saveHandler = (title) => {
    onSave(todo.id, title);
    SetModal(false);
  };
  return (
    <View>
      <AppButton onPress={goBack} color={THEME.GREY_COLOR} style={{ width: "20%", marginBottom: 20 }}>
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
});
