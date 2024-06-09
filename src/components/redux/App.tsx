import AppNavigation from "@/navigation/AppNavigation";
import { store } from "@/store";
import React, { FC } from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "react-native-reanimated";
import "react-native-gesture-handler";

const persistedStore = persistStore(store);

const ErrorFallback = (props: {
  error: {
    toString: () =>
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
  };
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Something happened!</Text>
    <Text style={styles.text}>{props.error.toString()}</Text>
  </View>
);

const App: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;

const statusBarHeight =
  Platform.OS === "android" ? StatusBar.currentHeight : 64;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: statusBarHeight,
    backgroundColor: "#2b3139",
    padding: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  text: {
    marginVertical: 16,
    color: "#FFF",
  },
});
