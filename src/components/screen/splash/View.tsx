import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/AuthStack";
import useSplashViewModel from "./view.model";

type Props = NativeStackScreenProps<AuthStackParamList>;
const SplashScreen = (props: Props) => {
  const {} = props;
  const {} = useSplashViewModel();
  return <View />;
};

export default SplashScreen;
