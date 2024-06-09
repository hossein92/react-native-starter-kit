import { normalize } from "../responsive";
import { palette } from "./palette";

export const lightTheme = {
  colors: {
    primary: palette.seaGreen,
    secondary: palette.lightPastelPurple,
    background: palette.white,
    text: palette.black,
    textSecondary: palette.osloGrey,
    inputText: palette.black,
    button: palette.seaGreen,
    inputBackground: palette.whiteSmoke,
  },
  spacing: {
    z: 0,
    ss: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 64,
  },
  radius: {
    z: 0,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 64,
  },
  textVariants: {
    primary: {
      fontSize: 12,
      color: palette.white,
    },
    secondary: {
      fontSize: 12,
      color: palette.white,
    },
    h1: {
      fontSize: normalize(20),
      fontWeight: "bold",
    },
    h2: {
      fontSize: normalize(16),
      fontWeight: "bold",
    },
    h3: {
      fontSize: normalize(12),
      fontWeight: "bold",
    },
    h4: {
      fontSize: normalize(10),
      fontWeight: "bold",
    },
    body1: {
      fontSize: normalize(16),
    },
    body2: {
      fontSize: normalize(14),
    },
    body3: {
      fontSize: normalize(12),
      fontWeight: "400",
    },
    body4: {
      fontSize: normalize(10),
      fontWeight: "400",
    },
  },
  buttonVariants: {
    primary: {
      backgroundColor: palette.seaGreen,
      text: palette.white,
    },
    secondary: {
      backgroundColor: palette.nobel,
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: palette.seaGreen,
      borderWidth: 1,
    },
    ghost: {
      backgroundColor: "transparent",
    },
  },
  statusBar: "light-content",
};
