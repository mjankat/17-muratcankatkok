import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmailScreen from "../screens/auth/EmailScreen";
import PasswordScreen from "../screens/auth/PasswordScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import { useNavigation } from "@react-navigation/native";
import HomeRoutes from "./HomeRoutes";
import { AntDesign } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();
const AuthRoutes = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EmailScreen"
        component={EmailScreen}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: 'white',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: 'white',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;

const styles = StyleSheet.create({});
