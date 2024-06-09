export const generateViewTemplate = (
  screenName,
  paramListName,
  paramListPath
) => `
import React from "react";
import { View } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ${paramListName} } from "${paramListPath}";
import use${screenName}ViewModel from "./view.model";

type Props = NativeStackScreenProps<${paramListName}>;
const ${screenName}Screen = (props: Props) => {
  const {} = props;
  const {  } = use${screenName}ViewModel();
  return (
    <View/>
  );
};

export default ${screenName}Screen;
`;
