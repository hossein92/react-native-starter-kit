import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "@/screens/splash/View";

export type AuthStackParamList = {
  Splash: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParamList>();
export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name={"Splash"} component={SplashScreen} />
    </Stack.Navigator>
  );
}
