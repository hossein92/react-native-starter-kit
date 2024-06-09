module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module-resolver",
      {
        root: ["./src"],
        extentions: [".js", ".json", ".ts", ".tsx", ".android.js", ".ios.js"],
        alias: {
          "@": "./src",
        },
      },
    ],
  ],
};
