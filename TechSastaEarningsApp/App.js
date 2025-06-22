import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import WithdrawScreen from "./screens/WithdrawScreen";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";

const Stack = createNativeStackNavigator();
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './utils/notifications';

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (u) => {
    setUser(u);
  });

  // 🔔 Register for notifications
  registerForPushNotificationsAsync();

  return unsubscribe;
}, []);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {user ? (
                <>
                  <Stack.Screen name="Dashboard" component={DashboardScreen} />
                  <Stack.Screen name="Withdraw" component={WithdrawScreen} />
                </>
              ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
