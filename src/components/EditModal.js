import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Modal, TextInput, Alert } from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);
  const saveHandler = () => {
    if (title.trim().length === 0) {
      Alert.alert("error,the field cannot be empty");
    } else {
      onSave(title);
    }
  };

  const cancelHandler = () => {
    setTitle(value);
    onCancel();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="write changed todo..."
          autoCapitalize={"none"}
          autoCorrect={false}
          maxLength={50}
        />
        <View style={styles.wrap}>
          <AppButton onPress={cancelHandler} color={THEME.RED_COLOR}>
            <Text>Cancel</Text>
          </AppButton>
          <AppButton onPress={saveHandler}>
            <Text>Save</Text>
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  wrap: { flexDirection: "row", justifyContent: "space-between" },
  input: { padding: 10, borderBottomColor: THEME.MAIN_COLOR, borderBottomWidth: 2, marginBottom: 20 },
});
