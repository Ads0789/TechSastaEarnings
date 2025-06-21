import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function DashboardScreen({ navigation }) {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  const fetchBalance = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setBalance(docSnap.data().balance);
      }
    } catch (e) {
      Alert.alert("Error", "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  const handleEarn = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      const currentBalance = docSnap.data().balance || 0;
      const newBalance = currentBalance + 5; // 🔁 add ₹5 per click
      await updateDoc(userRef, { balance: newBalance });
      setBalance(newBalance);
      Alert.alert("Congrats!", "₹5 earned successfully.");
    } catch (e) {
      Alert.alert("Error", "Earning failed");
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.email}</Text>
      <Text style={styles.balance}>Current Balance: ₹{balance}</Text>

      <View style={styles.button}>
        <Button title="💸 Earn ₹5" onPress={handleEarn} color="#28a745" />
      </View>

      <View style={styles.button}>
        <Button
          title="Withdraw"
          onPress={() => navigation.navigate("Withdraw")}
          color="#ffc107"
        />
      </View>

      <View style={styles.button}>
        <Button title="Logout" onPress={handleLogout} color="#dc3545" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 20, textAlign: "center", marginBottom: 20 },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    marginVertical: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
