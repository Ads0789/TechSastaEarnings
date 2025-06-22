import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function WithdrawScreen({ navigation }) {
  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState("");

  const handleWithdraw = async () => {
    const uid = auth.currentUser?.uid;
    if (!upi || !amount) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "withdrawals"), {
        uid,
        upi,
        amount: parseFloat(amount),
        createdAt: serverTimestamp(),
        status: "pending", // optional
      });
      Alert.alert("Request Sent", "Your withdrawal request has been submitted.");
      setUpi("");
      setAmount("");
      navigation.goBack(); // back to dashboard
    } catch (error) {
      Alert.alert("Error", "Failed to submit request");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Withdraw Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter UPI ID"
        value={upi}
        onChangeText={setUpi}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Amount (₹)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Submit Request" onPress={handleWithdraw} color="#28a745" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
