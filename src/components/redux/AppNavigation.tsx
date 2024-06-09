import React, { useEffect } from "react";
import { Appearance } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { darkTheme, lightTheme } from "@/utils/theme";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppSelector } from "@/utils/hooks/StoreHook";
import { navigationRef } from "@/utils/navigationRef/RootNavigation";

import { AuthStack } from "./AuthStack";

export type RootStackParamList = {
  AuthStack: undefined;
};

export const ThemeContext: any = React.createContext({});
const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigation = () => {
  const { theme } = useAppSelector((state) => state.settings);
  const colorScheme = Appearance.getColorScheme() ?? "light";
  const appTheme = theme === "system" ? colorScheme : theme;

  return (
    <ThemeContext.Provider value={appTheme === "dark" ? darkTheme : lightTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="AuthStack"
              screenOptions={{
                headerShown: false,
                headerTransparent: true,
              }}
            >
              <Stack.Screen name={"AuthStack"} component={AuthStack} />
            </Stack.Navigator>
          </NavigationContainer>
          {/* <Toasts overrideDarkMode={false} /> */}
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
};

export default AppNavigation;
