// Function to generate stack template
export const generateStackTemplate = (stackName) => `
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type ${stackName}ParamList = {
  // Enter Screen Param List
};

const Stack = createNativeStackNavigator<${stackName}ParamList>();

export function ${stackName}() {
  return (
    <Stack.Navigator
      initialRouteName="EnterDefaultScreenName"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
    >
      {/* 
Enter your screens components
      */}
    </Stack.Navigator>
  );
}
`;
